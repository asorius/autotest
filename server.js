const express = require('express');
const bodyParser = require('body-parser');
const getData = require('./dataGetter');
const getMot = require('./motGetter');
const getPost = require('./postGetter');
const cors = require('cors');
//-----
const graphqlHTTP = require('express-graphql');
const graphQLschema = require('./graphql/schema');
const graphQLresolver = require('./graphql/resolver');
//----
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// sends back data
app.post('/api', async function(req, res) {
  try {
    const { url } = req.body;
    const dataFromAutotrader = await getData(url);
    const mainData = {
      title: dataFromAutotrader.advert.title,
      sellerDescription: dataFromAutotrader.advert.description,
      images: dataFromAutotrader.advert.imageUrls,
      price: dataFromAutotrader.advert.price,
      partEx: dataFromAutotrader.advert.isPartExAvailable,
      averageMpg: dataFromAutotrader.pageData.tracking['average_mpg'],
      acceleration: dataFromAutotrader.pageData.tracking.acceleration,
      sellerInfo: {
        name: dataFromAutotrader.seller.name,
        trader: dataFromAutotrader.seller.isTradeSeller,
        phone1: dataFromAutotrader.seller.primaryContactNumber,
        phone2: dataFromAutotrader.seller.secondaryContactNumber,
        gmapLink: dataFromAutotrader.seller.locationMapLink
      },
      technical: { ...dataFromAutotrader.techSpecs }
    };
    const { vrm } = dataFromAutotrader.vehicle;
    const motData = await getMot(vrm);
    res.send({
      _id: Math.random(),
      mainData,
      ...dataFromAutotrader.vehicle,
      ...motData
    });
  } catch (e) {
    res.status(404).send({ error: e });
  }
});
app.post('/api/postcode', async (req, res) => {
  const { postcode } = req.body;
  if (postcode.length < 5 || postcode.length > 7) {
    return res.status(400).send({ error: 'invalid post code' });
  }
  try {
    const postcodeResult = await getPost(postcode);
    res.send({ data: postcodeResult });
  } catch (e) {
    res.send({ error: e });
  }
});
//---------------------------------------------------

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQLschema,
    rootValue: graphQLresolver,
    graphiql: true
  })
);

//----------------------------------------------
app.listen(5000, () => {
  console.log('server is up on 5000');
});

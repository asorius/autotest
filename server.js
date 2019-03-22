const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const getData = require('./dataGetter');
const getMot = require('./motGetter');
const getPost = require('./postGetter');
const app = express();

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
      sellerInfo: {
        name: dataFromAutotrader.seller.name,
        trader: dataFromAutotrader.seller.isTradeSeller,
        phone1: dataFromAutotrader.seller.primaryContactNumber,
        phone2: dataFromAutotrader.seller.secondaryContactNumber,
        gmapLink: dataFromAutotrader.seller.locationMapLink
      }
    };
    const { vrm } = dataFromAutotrader.vehicle;
    const motData = await getMot(vrm);

    //map stuff temporary place
    // const map = await axios.get(
    //   `https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyDL2iDSF4s4uk1qPVCCF3ESBTZ4KnlBzdo`
    // );
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

app.listen(5000, () => {
  console.log('server is up on 5000');
});

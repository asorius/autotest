const express = require('express');
const bodyParser = require('body-parser');
const getData = require('./dataGetter');
const getMot = require('./motGetter');
const getPost = require('./postGetter');
const cors = require('cors');
const { mongoURI } = require('./keys/dist');
const mongoose = require('mongoose');
const path = require('path');

//-----
const { graphqlHTTP } = require('express-graphql');
const graphQLschema = require('./graphql/schema');
const graphQLresolver = require('./graphql/resolver');
//----
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    graphiql: true,
  })
);

//----------------------------------------------
//launches server just after successfull connection to mongodb
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    //server static assets if in production
    if (process.env.NODE_ENV === 'production') {
      //set static folder
      app.use(express.static('front/build'));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
      });
    }
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log('server is up on ' + port);
    });
  })
  .catch((e) => console.log(e));

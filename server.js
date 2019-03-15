const express = require('express');
const bodyParser = require('body-parser');
const getData = require('./dataGetter');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// sends back data
app.post('/api', async function(req, res) {
  const { url } = req.body;
  const data = await getData(url);
  res.send(data);
});

app.listen(5000, () => {
  console.log('server is up on 5000');
});

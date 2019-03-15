const express = require('express');
const bodyParser = require('body-parser');
const getData = require('./dataGetter');
const getMot = require('./motGetter');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// sends back data
app.post('/api', async function(req, res) {
  try{
  const { url } = req.body;
  const dataFromAutotrader =await getData(url);
  const mainData={
    title:dataFromAutotrader.advert.title,
    sellerDescription:dataFromAutotrader.advert.description,
    images:dataFromAutotrader.advert.imageUrls,
    price:dataFromAutotrader.advert.price,
    sellerInfo:{
      name:dataFromAutotrader.seller.name,
      trader:dataFromAutotrader.seller.isTradeSeller,
      phone1:dataFromAutotrader.seller.primaryContactNumber,
      phone2:dataFromAutotrader.seller.secondaryContactNumber,
      gmapLink:dataFromAutotrader.seller.locationMapLink
    }
  }
  const {vrm}=dataFromAutotrader.vehicle
  const motData=await getMot(vrm)
  res.send({_id:Math.random(),mainData,...dataFromAutotrader.vehicle,...motData});}catch(e){
    res.send({error:e})
  }
});

app.listen(5000, () => {
  console.log('server is up on 5000');
});

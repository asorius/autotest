const axios = require('axios');
const cheerio = require('cheerio');

const getData = async link => {
  //get the main link without user search/page info which is added by autotrader if copying from their search page
  //actualink includes car id @ guid
  const toGetGuid = link.substring(0, 62);
  const res = await axios.get(toGetGuid);
  // return res.data;
  const guid = res.data.split('window.AT.correlationId =')[1].substring(0, 39);
  const actualLink = `${link.substring(0, 62)}?guid=${guid}`;
  // const { data } = await axios.get(actualLink);
  const dd = await axios(actualLink, {
    credentials: 'include',
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9,lt;q=0.8',
      device_used: 'desktop'
    },
    referrerPolicy: 'origin',
    body: null,
    method: 'GET',
    mode: 'cors'
  });
  console.log(dd);
};
getData(
  'https://www.autotrader.co.uk/classified/advert/201903125825071?price-from=1000&advertising-location=at_cars&price-to=1500&sort=year-desc&onesearchad=Used&onesearchad=Nearly%20New&onesearchad=New&postcode=st34le&radius=40&page=50'
);
// module.exports = getData;
// "acf48655-da28-4739-bad1-3c5a6f616ade"
// 'https://www.autotrader.co.uk/json/fpa/initial/201903125825071?guid=c4219b6b-5559-4377-ae9e-fa15a70f0074'
// fetch("https://www.autotrader.co.uk/json/fpa/initial/201903125825071?guid=c4219b6b-5559-4377-ae9e-fa15a70f0074", {"credentials":"include","headers":{"accept":"*/*","accept-language":"en-US,en;q=0.9,lt;q=0.8","device_used":"desktop"},"referrerPolicy":"origin","body":null,"method":"GET","mode":"cors"});

const getPost = require('../postGetter');
const getGraphData = require('../graphData');
const getMot = require('../motGetter');

module.exports = {
  getPostCoords: async args => {
    try {
      const res = await getPost(args.postcode);
      const pc = res.summary.query.toUpperCase();
      const { lat, lon: lng } = res.results[0].position;
      return { postcode: pc, lat, lng };
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  getAutodata: async args => {
    const url = args.url;
    try {
      const data = await getGraphData(url);
      const title = data.advert.title,
        _id = Math.random(),
        price = data.advert.price,
        year = data.vehicle.keyFacts['manufactured-year'],
        engine = data.vehicle.keyFacts['engine-size'],
        mileage = data.vehicle.keyFacts.mileage,
        fuel = data.vehicle.keyFacts['fuel-type'],
        transmission = data.vehicle.keyFacts.transmission,
        tax = data.vehicle.tax,
        images = data.advert.imageUrls,
        exchange = data.advert.isPartExAvailable,
        co2 = data.vehicle.co2Emissions,
        urban = data.techSpecs.techSpecs[0].specs[0].value,
        extra = data.techSpecs.techSpecs[0].specs[1].value,
        combined = data.techSpecs.techSpecs[0].specs[2].value,
        acceleration = data.techSpecs.techSpecs[0].specs[3].value,
        topspeed = data.techSpecs.techSpecs[0].specs[4].value,
        cylinders = data.techSpecs.techSpecs[0].specs[5].value,
        enginepower = data.techSpecs.techSpecs[0].specs[7].value,
        torque = data.techSpecs.techSpecs[0].specs[8].value,
        electrics = data.techSpecs.techSpecs[1].specs,
        safety = data.techSpecs.techSpecs[2].specs,
        tank = data.techSpecs.techSpecs[5].specs[4].value,
        weight = data.techSpecs.techSpecs[5].specs[5].value,
        map = {
          lat: data.seller.locationMapLink.split('&q=')[1].split('%2C')[0],
          lng: data.seller.locationMapLink.split('&q=')[1].split('%2C')[1]
        };
      return {
        _id,
        title,
        price,
        year,
        engine,
        mileage,
        fuel,
        transmission,
        tax,
        images,
        exchange,
        co2,
        urban,
        extra,
        combined,
        acceleration,
        topspeed,
        cylinders,
        enginepower,
        torque,
        electrics,
        safety,
        tank,
        weight,
        map
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};

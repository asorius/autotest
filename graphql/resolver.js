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
      const { vrm } = data.vehicle;
      const motdata = await getMot(vrm);
      const reducedevents = motdata.events.map(el => {
        return {
          date: el.eventDate,
          status: el.status.substring(11),
          data: {
            notices: [...el.data['advisory_notice_reasons']],
            expiredate: el.data['expiry_date'],
            mileage: el.data.mileageData.value,
            refusal: [...el.data['reason_for_refusal_to_issue_certificate']]
          }
        };
      });

      const spec = (parentName, neededItemName) => {
        const parent = data.techSpecs.techSpecs.filter(
          el => el.specName === parentName
        );
        let value;
        if (neededItemName === 'all') {
          value = parent[0].specs;
        } else {
          value = parent[0].specs.filter(el => el.name === neededItemName)[0];
          value ? value.value : null;
        }
        if (parent && value) {
          return value;
        } else {
          return null;
        }
      };

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
        urban = spec('Economy & performance', 'Fuel consumption (urban)'),
        extra = spec('Economy & performance', 'Fuel consumption (extra urban)'),
        combined = spec('Economy & performance', 'Fuel consumption (combined)'),
        acceleration = spec('Economy & performance', '0 - 60 mph'),
        topspeed = spec('Economy & performance', 'Top speed'),
        cylinders = spec('Economy & performance', 'Cylinders'),
        enginepower = spec('Economy & performance', 'Engine power');
      (torque = spec('Economy & performance', 'Engine torque')),
        (electrics = spec('Driver Convenience', 'all')),
        (safety = spec('Safety', 'all')),
        (tank = spec('Dimensions', 'Fuel tank capacity')),
        (weight = spec('Dimensions', 'Minimum kerb weight')),
        (map = {
          lat: data.seller.locationMapLink
            ? data.seller.locationMapLink.split('&q=')[1].split('%2C')[0]
            : null,
          lng: data.seller.locationMapLink
            ? data.seller.locationMapLink.split('&q=')[1].split('%2C')[1]
            : null
        }),
        (seller = {
          name: data.seller.name || 'Private Seller',
          phone1: data.seller.primaryContactNumber,
          phone2: data.seller.secondaryContactNumber || null
        }),
        (events = reducedevents.slice(0, 6));
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
        map,
        seller,
        events
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};

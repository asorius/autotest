const getPost = require('../postGetter');
const getGraphData = require('../graphData');
const getMot = require('../motGetter');
const List = require('../mongodb/list');
module.exports = {
  getPostCoords: async args => {
    try {
      const res = await getPost(args.postcode);
      const pc = res.summary.query.toUpperCase();
      const { lat, lon: lng } = res.results[0].position;
      return { postcode: pc, lat, lng };
    } catch (e) {
      console.log({ errorfrompc: e });
      return { errorfrompc: e };
    }
  },
  getAutodata: async args => {
    const url = args.url;
    try {
      const data = await getGraphData(url);
      const { vrm } = data.vehicle;
      const actualLink = data.pageData.canonical;
      const addedDate = data.pageData.ods.advertId.substring(0, 8);
      const dealerLink = data.seller.dealerWebsite || null;
      const motdata = await getMot(vrm);
      let mileageDataForDisplay;
      let mileageYears;
      let reducedevents;
      if (motdata) {
        reducedevents = motdata.events
          .filter(el => el.status !== 'pending')
          .map(el => {
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
        mileageDataForDisplay = motdata.events
          .map(ev => {
            let data;
            if (ev.data && ev.data.expiry_date !== '') {
              data = {
                miles: ev.data.mileageData.mileage.toString(),
                year: (ev.data.expiry_date.split(' ')[2] - 1).toString()
              };
            }
            return data;
          })
          .filter(el => el !== undefined);
      } else {
        reducedevents = [];
      }
      const spec = (parentName, neededItemName) => {
        const parent = data.techSpecs.techSpecs.filter(
          el => el.specName === parentName
        );
        let value;
        if (neededItemName === 'all') {
          value = parent[0].specs.join();
        } else {
          let valueobj = parent[0].specs.filter(
            el => el.name === neededItemName
          )[0];
          value = valueobj ? valueobj.value : null;
        }
        if (parent && value) {
          return value;
        } else {
          return null;
        }
      };
      const converter = (string, type) => {
        switch (type) {
          case 'power':
            return `${string} (${Math.round(parseInt(string) / 1.341)} kW)`;
          case 'fuel':
            return `${string} (${parseFloat(
              235.215 / parseFloat(string)
            ).toFixed(2)} l/100km)`;
          case 'torque':
            return string
              ? `${string} (${Math.round(parseFloat(string) / 0.73756)} Nm)`
              : 'Unavailable';
          default:
            'default ';
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
        tax = data.vehicle.tax ? `${data.vehicle.tax} £` : 'Unavailable',
        images = data.advert.imageUrls,
        exchange = data.advert.isPartExAvailable ? 'Available' : 'Unavailable',
        co2 = data.vehicle.co2Emissions,
        urban = converter(
          spec('Economy & performance', 'Fuel consumption (urban)'),
          'fuel'
        ),
        extra = converter(
          spec('Economy & performance', 'Fuel consumption (extra urban)'),
          'fuel'
        ),
        combined = converter(
          spec('Economy & performance', 'Fuel consumption (combined)'),
          'fuel'
        ),
        acceleration = spec('Economy & performance', '0 - 60 mph'),
        topspeed = spec('Economy & performance', 'Top speed'),
        cylinders = spec('Economy & performance', 'Cylinders'),
        enginepower = converter(
          spec('Economy & performance', 'Engine power'),
          'power'
        );
      (torque = converter(
        spec('Economy & performance', 'Engine torque'),
        'torque'
      )),
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
        events,
        actualLink,
        addedDate,
        dealerLink,
        mileageDataForDisplay
      };
    } catch (e) {
      console.log({ errorInfoResolver: e.response.data.text });
      return { error: 'unable to retrieve data' };
    }
  },
  saveList: async args => {
    const carUrlsArray = args.list;
    const searchKey = args.key !== null ? args.key : false;
    if (searchKey) {
      //if serchkey is not null ,that means user is on shared page, share the list button is now update shared list, and when user clicks it, get list by id and update it

      const list = await List.findByIdAndUpdate(searchKey, {
        list: carUrlsArray
      });
      return searchKey;
    } else {
      //create new list
      let newKey;
      try {
        const list = new List({ key: newKey, list: carUrlsArray });
        const createdList = await list.save();
        newKey = createdList._id;
        return newKey;
      } catch (e) {
        console.log(e);
      }
    }
  },
  getList: async args => {
    const searchKey = args.key;
    try {
      const res = await List.findById(searchKey);
      return res.list;
    } catch (e) {
      console.log(e);
    }
  },
  deleteList: async args => {
    const searchKey = args.key;
    console.log({ searchKey });
    try {
      const res = await List.findByIdAndDelete(searchKey);
      console.log({ res });
      return 'success';
    } catch (e) {
      console.log(e);
    }
  }
};

const axios = require('axios');
const getMotData = async vrm => {
  //get MOT data by vehicle registration number
  try {
    const url = `https://my.hpi.co.uk/vehicles/motHistoryByVRM/${vrm.toUpperCase()}`;
    const res = await axios.get(url);
    return res.data;
  } catch (e) {
    console.log({ errorInfoMot: e });
    return null;
  }
};

module.exports = getMotData;

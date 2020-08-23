const axios = require('axios');

const getData = async (link) => {
  //get the main link without user search/page info which is added by autotrader if copying from their search page
  //actualink includes advertisement id @ guid
  const advertID = link.substring(47, 62);
  const forGuid = await axios.get(link);
  const guID = forGuid.data
    .split('window.AT.correlationId =')[1]
    .substring(2, 38);
  const actualLink = `https://www.autotrader.co.uk/json/fpa/initial/${advertID}?guid=${guID}`;
  const { data } = await axios.get(actualLink);
  const { derivativeId } = data.vehicle;
  const { data: techs } = await axios.get(
    `https://www.autotrader.co.uk/json/taxonomy/technical-specification?derivative=${derivativeId}`
  );
  return { ...data, techSpecs: { ...techs } };
};

module.exports = getData;

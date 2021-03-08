const axios = require('axios');
const { postAPI } = require('./keys/dist');
const getPost = async postcode => {
  try {
    const link = `https://api.tomtom.com/search/2/geocode/${postcode}.json?key=${postAPI}`;
    const { data } = await axios.get(link);
    if (data.summary.totalResults === 0) {
      throw new Error
    } else {
      return data;
    }
  } catch (e) {
    console.log({ error: 'post code not found',from:'postgetterapi' });
    return { error: 'post code not found' };
  }
};

module.exports = getPost;

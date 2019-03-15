const axios= require('axios')
const getMotData=async (vrm)=>{
    //get MOT data by vehicle registration number
    const url=`https://my.hpi.co.uk/vehicles/motHistoryByVRM/${vrm.toUpperCase()}`
    const res= await axios.get(url)
    return res.data
}

module.exports=getMotData;
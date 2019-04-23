const { buildSchema } = require('graphql');

const schema = buildSchema(`
type coords {
  postcode:String
  lat:Float
  lng:Float
  error:String
}
input PostCoordsInput {
  postcode:String!
}
type sellermapdata {
  lat:Float
  lng:Float
}
type eventdata{
  notices:[String]
  expiredate:String
  mileage:String
  refusal: [String]

}
type event{
  date:String
  status: String
  data: eventdata
}
type sellerdata{
  name:String
  phone1:String
  phone2:String
}
type autodata{
  _id:Float!
  title:String!
  price:String!
  year:String
  engine:String
  mileage:String
  fuel:String
  transmission:String
  tax:String
  images:[String]
  exchange:String
  co2:String
  urban:String
  extra:String
  combined:String
  acceleration:String
  topspeed:String
  cylinders:String
  enginepower:String
  torque:String
  electrics:String
  safety:String
  tank:String
  weight:String
  map:sellermapdata
  seller:sellerdata
  events:[event]
}
type RootQuery {
  getPostCoords(postcode:String!):coords
  getAutodata(url:String!):autodata
  saveList(key:String,list:[String]!):String
}
schema {
  query: RootQuery
}
`);
module.exports = schema;

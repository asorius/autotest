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
  exchange:Boolean
  co2:String
  urban:String
  extra:String
  combined:String
  acceleration:String
  topspeed:String
  cylinders:String
  enginepower:String
  torque:String
  electrics:[String]
  safety:[String]
  tank:String
  weight:String
  map:sellermapdata
}
type RootQuery {
  getPostCoords(postcode:String!):coords
  getAutodata(url:String!):autodata
}
schema {
  query: RootQuery
}
`);
module.exports = schema;

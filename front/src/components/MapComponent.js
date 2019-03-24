import React from 'react';
const { compose, withProps, lifecycle } = require('recompose');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker
} = require('react-google-maps');

const MapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDL2iDSF4s4uk1qPVCCF3ESBTZ4KnlBzdo&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      console.log(this, { from: 'life' });
      if (this.props.usercoords === null) {
        return;
      }
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(
            this.props.usercoords.lat,
            this.props.usercoords.lng
          ),
          destination: new window.google.maps.LatLng(
            parseFloat(this.props.sellercoords.lat),
            parseFloat(this.props.sellercoords.lng)
          ),
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  })
)(props => {
  console.log({ props, from: 'gmap' });
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={
        new window.google.maps.LatLng(
          parseFloat(props.sellercoords.lat),
          parseFloat(props.sellercoords.lng)
        )
      }
    >
      {props.directions
        ? `${props.directions.routes[0].legs[0].distance.text} , ${
            props.directions.routes[0].legs[0].duration.text
          }`
        : null}
      {props.usercoords !== null ? (
        <DirectionsRenderer directions={props.directions} />
      ) : (
        <Marker
          position={{
            lat: parseFloat(props.sellercoords.lat),
            lng: parseFloat(props.sellercoords.lng)
          }}
        />
      )}
    </GoogleMap>
  );
});
export default MapComponent;

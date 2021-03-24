import React from 'react';
const { compose, withProps, lifecycle } = require('recompose');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} = require('react-google-maps');
const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox');
const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyDL2iDSF4s4uk1qPVCCF3ESBTZ4KnlBzdo&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `350px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      if (this.props.usercoords && this.props.usercoords.lat) {
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
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      } else {
        return;
      }
    },
    componentDidUpdate(prevprops, prevstate) {
      if (this.props.usercoords && prevprops.usercoords === null) {
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
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      }
    },
  })
)((props) => {
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
      {/* Custom box container displaying travel distance and time if usercoords are provided */}
      {props.usercoords && props.directions ? (
        <>
          <InfoBox
            defaultPosition={
              new window.google.maps.LatLng(
                props.sellercoords.lat,
                props.sellercoords.lng
              )
            }
            options={{
              closeBoxURL: ``,
            }}
          >
            <div className="travel">
              <div className="km">
                {props.directions.routes[0].legs[0].distance.text}
              </div>
              <div className="time">
                {props.directions.routes[0].legs[0].duration.text}
              </div>
              <div className="address">
                {props.directions.routes[0].legs[0].end_address}
              </div>
            </div>
          </InfoBox>
          <DirectionsRenderer directions={props.directions} />
        </>
      ) : (
        <React.Fragment>
          <Marker
            position={{
              lat: parseFloat(props.sellercoords.lat),
              lng: parseFloat(props.sellercoords.lng),
            }}
          />
        </React.Fragment>
      )}
    </GoogleMap>
  );
});
export default Map;

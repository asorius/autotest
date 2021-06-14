import React from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoBox,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

const containerStyle = {
  height: '30vh',
  width: '100%',
};

function MyComponent(props) {
  const [directions, setDirections] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const seller = {
    lat: parseFloat(props.sellercoords.lat),
    lng: parseFloat(props.sellercoords.lng),
  };
  React.useEffect(() => {
    if (props.usercoords) {
      setUser({
        lat: parseFloat(props.usercoords.lat),
        lng: parseFloat(props.usercoords.lng),
      });
    } else {
      setUser(false);
      setDirections(false);
    }
  }, [props.usercoords]);
  const directionsCallback = (response) => {
    if (response !== null && directions === false) {
      if (response.status === 'OK') {
        setDirections(response);
      } else {
        console.log('response: ', response);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDL2iDSF4s4uk1qPVCCF3ESBTZ4KnlBzdo">
      <GoogleMap mapContainerStyle={containerStyle} center={seller} zoom={10}>
        {!user && (
          <Marker position={seller}>
            <InfoBox
              options={{ closeBoxURL: '', enableEventPropagation: false }}
              position={seller}
            >
              <div
                style={{
                  backgroundColor: 'rgb(57,57,57)',
                  borderRadius: ' 50% 20% / 10% 40%',
                  color: 'white',
                  padding: '.5rem',
                  textAlign: 'center',
                }}
              >
                {props.sellerName}
              </div>
            </InfoBox>
          </Marker>
        )}
        {seller && user !== false && (
          <DirectionsService
            options={{
              destination: seller,
              origin: user,
              travelMode: 'DRIVING',
            }}
            callback={directionsCallback}
          />
        )}
        {directions && (
          <>
            <DirectionsRenderer options={{ directions }} />

            <InfoBox
              options={{ closeBoxURL: '', enableEventPropagation: false }}
              position={seller}
            >
              <div
                style={{
                  backgroundColor: 'rgb(57,57,57)',
                  borderRadius: ' 50% 20% / 10% 40%',
                  color: 'white',
                  padding: '.5rem',
                  textAlign: 'center',
                }}
              >
                <div>
                  <div className="km">
                    {directions.routes[0].legs[0].distance.text}
                  </div>

                  <div className="time">
                    {directions.routes[0].legs[0].duration.text}
                  </div>
                  <div className="address">
                    {directions.routes[0].legs[0].end_address.slice(-11, -4)}
                  </div>
                </div>
              </div>
            </InfoBox>
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);

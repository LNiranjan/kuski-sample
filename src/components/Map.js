import { compose, withProps, lifecycle } from "recompose"
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';
class Map extends Component {
   render() {
    const MapWithADirectionsRenderer = compose(
        withProps({
          googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB4G-Gp1Ghho4vE1s5XYXuHrciA49R8bbI&v=3.exp&libraries=geometry,drawing,places",
          loadingElement: <div style={{ height: `100%` }} />,
          containerElement: <div style={{ height: `600px` }} />,
          mapElement: <div style={{ height: `100%` }} />,
        }),
        withScriptjs,
        withGoogleMap,
        lifecycle({
          componentDidMount() {
            const DirectionsService = new window.google.maps.DirectionsService();
      
            DirectionsService.route({
              origin: new window.google.maps.LatLng(17.4361160, 78.4440140),
              destination: new window.google.maps.LatLng(28.7041, 77.1025),
              travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: result,
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            });
          }
        })
      )(props =>
        <GoogleMap
          defaultZoom={10}
          defaultCenter={new window.google.maps.LatLng(17.3850, 78.4867)}
        >
          {props.directions && <DirectionsRenderer directions={props.directions} />}
        </GoogleMap>
      );
      
   
   return(
      <div>
        <MapWithADirectionsRenderer
          containerElement={ <div style={{ height: `800px`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
          
        />
        
      </div>
   );
   }
};
export default Map;
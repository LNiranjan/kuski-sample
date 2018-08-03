import { compose, withProps, lifecycle } from "recompose"
import React, { Component } from 'react';
import {Button} from 'reactstrap';
import _ from 'lodash';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { db,auth } from '../firebase';

class Map extends Component {
 
  book_driver = (event) => {
    db.locationTracking(auth.currentUser().uid, this.props.lat, this.props.lng)
    .then(
      console.log("current location stored.....")
    )
  }
   render() {
    const MapWithADirectionsRenderer = compose(
        withProps({
          googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMCLvyC-CInjCWMcz6suKSjSKwop-h-mg&v=3.exp&libraries=geometry,drawing,places",
          loadingElement: <div style={{ height: `100%` }} />,
          containerElement: <div style={{ height: `600px` }} />,
          mapElement: <div style={{ height: `100%` }} />,
        }),
        withScriptjs,
        withGoogleMap
      )(props =>
        <GoogleMap
          defaultZoom={15}
          defaultCenter={new window.google.maps.LatLng(this.props.lat, this.props.lng)}
        >
         <Marker position={{lat: this.props.lat, lng: this.props.lng }} /> 
        </GoogleMap>
      );
   return(
      <div>
        <MapWithADirectionsRenderer
          containerElement={ <div style={{ height: `800px`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />        
        <Button color="primary" size="lg" onClick={this.book_driver}>Book Driver</Button>
      </div>
   );
   }
};
export default Map;

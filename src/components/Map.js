import { compose, withProps, lifecycle } from "recompose"
import React, { Component } from 'react';
import {Button} from 'reactstrap';
import _ from 'lodash';
// import GoogleMaps from './googlemap';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");


class Map extends Component {
  state={
    bounds: null,
    center: {
        lat: 17.385, lng: 78.4867
    },
    markers: []
  }
   render() {
    const MapWithADirectionsRenderer = compose(
        withProps({
          googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMCLvyC-CInjCWMcz6suKSjSKwop-h-mg&v=3.exp&libraries=geometry,drawing,places",
          loadingElement: <div style={{ height: `100%` }} />,
          containerElement: <div style={{ height: `600px` }} />,
          mapElement: <div style={{ height: `100%` }} />,
        }),
        lifecycle({
          componentWillMount() {
            const refs = {}
      
            this.setState({
              bounds: null,
              center: {
                lat: 41.9, lng: -87.624
              },
              markers: [],
              onMapMounted: ref => {
                refs.map = ref;
              },
              onBoundsChanged: () => {
                this.setState({
                  bounds: refs.map.getBounds(),
                  center: refs.map.getCenter(),
                })
              },
              onSearchBoxMounted: ref => {
                refs.searchBox = ref;
              },
              onPlacesChanged: () => {
                const places = refs.searchBox.getPlaces();
                const bounds = new window.google.maps.LatLngBounds();
      
                places.forEach(place => {
                  if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport)
                  } else {
                    bounds.extend(place.geometry.location)
                  }
                });
                const nextMarkers = places.map(place => ({
                  position: place.geometry.location,
                }));
                this.setState({
                  center: {
                    lat: nextMarkers[0].position.lat(),
                    lng: nextMarkers[0].position.lng()
                  }
                })
                console.log(this.state.center)
                const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
                console.log(nextCenter)
                this.setState({
                  center: nextCenter,
                  markers: nextMarkers,
                });
                console.log(this.state.center.lat);
                // <GoogleMaps lat={this.state.center.lat()} lng={this.state.center.lng()} />
              },
            })
          },
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
        <Button color="primary" size="lg">Book Driver</Button>
      </div>
   );
   }
};
export default Map;

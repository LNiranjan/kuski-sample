import { compose, withProps, lifecycle } from "recompose"
import React, { Component } from 'react';
import _ from 'lodash';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");


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
                // refs.map.fitBounds(bounds);
                console.log(this.state.center)
                console.log(refs);
                {new window.google.maps.LatLng(this.state.center.lat(), this.state.center.lng())}
              },
            })
          },
        }),
        withScriptjs,
        withGoogleMap
      )(props =>
        <GoogleMap
          defaultZoom={10}
          defaultCenter={new window.google.maps.LatLng(this.state.center.lat, this.state.center.lng)}
        >
         
          <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Enter Your Location"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                marginTop: `27px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
              }}
            />
          </SearchBox>
          {props.markers.map((marker, index) =>
          <Marker key={index} position={marker.position} /> 
         )}
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

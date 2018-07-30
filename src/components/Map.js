import { compose, withProps, lifecycle } from "recompose"
import React, { Component } from 'react';
import _ from 'lodash';
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from 'react-google-maps';
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

class Map extends Component {
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
                const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
      
                this.setState({
                  center: nextCenter,
                  markers: nextMarkers,
                });
                // refs.map.fitBounds(bounds);
              },
            })
          },
        }),
        withScriptjs,
        withGoogleMap
      )(props =>
        <GoogleMap
          defaultZoom={10}
          defaultCenter={new window.google.maps.LatLng(17.3850, 78.4867)}
        >
          {props.directions && <DirectionsRenderer directions={props.directions} />}
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

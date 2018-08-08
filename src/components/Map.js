import { compose, withProps,lifecycle } from "recompose"
import _ from "lodash"; 
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
// import _ from 'lodash';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { db,auth } from '../firebase';
import { FormGroup,Form,Button,Input,Label} from 'reactstrap';
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");




const INITIAL_STATE = {
  book_date: '',
  book_time: '',
  book_hours:'',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
 
  book_driver = (event) => {
    const {
      book_date,
      book_time,
      book_hours,
    } = this.state;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) {
      dd = '0'+dd
    } 
    if(mm<10) {
      mm = '0'+mm
    } 
    today = yyyy+'-'+mm+'-'+dd;
    if( book_date >= today) {
      db.locationTracking(auth.currentUser().uid, this.props.lat, this.props.lng, book_date, book_time, book_hours)
      .then(
        console.log("current location stored.....")
      )
    }
    else{
      alert("enter valid date");
    }
   
   
  }
   render() {
    const {
      book_date,
      book_time,
      book_hours,
      error,
    } = this.state;

    const isInvalid =
      book_time === '' ||
      book_date === ''||
      book_hours === '';

      const lat1=this.props.lat;
      const lng1=this.props.lng;
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
                lat: lat1, lng: lng1
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
        ref={props.onMapMounted}
        defaultZoom={18}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
      >
         <Marker position={props.center}/> 
         <SearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
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
        </GoogleMap>
      );
   return(
      <div>
        <div>
          <MapWithADirectionsRenderer
            containerElement={ <div style={{ height: `800px`, width: '100%' }} /> }
            mapElement={ <div style={{ height: `100%` }} /> }
          />        
        </div>
        {/* <Button color="primary" size="lg" onClick={this.book_driver}>Book Driver</Button> */}
        <Popup trigger={<Button color="primary" block>Book Driver</Button>} position="top center" > 
        <div> <Form onSubmit={this.book_driver} >
          <FormGroup>
            <Label>Enter the Date</Label>
            <Input value={book_date} onChange={event => this.setState(byPropKey('book_date', event.target.value))} type="date"  />
          </FormGroup>
          <FormGroup>
            <Label>Enter the Time</Label>
            <Input value={book_time} onChange={event => this.setState(byPropKey('book_time', event.target.value))} type="time" placeholder="hh:mm"/>
          </FormGroup>
          <FormGroup>
            <Label>Enter of Number of Hours</Label>
            <Input value={book_hours} onChange={event => this.setState(byPropKey('book_hours', event.target.value))} type="number" min="1" placeholder=""/>
          </FormGroup>
          <FormGroup>
            <Button disabled={isInvalid} color="primary" block>Book</Button>
          </FormGroup>
          { error && <p>{error.message}</p> }
        </Form></div>
    </Popup>
      </div>
   );
   }
};
export default Map;

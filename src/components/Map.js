import { compose, withProps } from "recompose"
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
// import _ from 'lodash';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { db,auth } from '../firebase';
import { FormGroup,Form,Button,Input,Label} from 'reactstrap';



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
    if( book_date>=new Date()){
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

import React from 'react';

export default class GoogleMaps extends React.Component{
constructor(){
    super();
    this.state = {
        zoom: 13,
        maptype: 'roadmap',
        lat: -33.8688,
        lng: 141.2195
    }
}

componentDidMount(){
    new window.google.maps.Map(document.getElementById('map'), {
        center: {
            lat: this.props.lat, 
            lng: this.props.lng},
        zoom: 13,
        mapTypeId: 'roadmap',
    })
    
    console.log('loaded')

}

render(){
    return(
        <div>
            <div id='map' />
        </div>
    )
}
}
import React from 'react';

import { Row, Col } from 'reactstrap';
import './Landing.css';

const LandingPage = () =>
<Row className="page">
  <Col md="6" className="landing">
    &nbsp;
  </Col>
  <Col md="6">
    <div align="center" >
      <p className="paragraph">KUSKI<br/>
        <span className="span">Our drivers at your service</span>
      </p>
      <p className="paragraph1"><b>NEED A DRIVER? <br/>
        WELCOME TO KUSKI, YOUR ONE STOP SHOP FOR ALL YOUR DRIVER RELATED NEEDS. 
        WHETHER YOU WANT A DRIVER, ON HOURLY, PART TIME OR FULL TIME, WE'LL GET YOU THE MOST TRUSTED DRIVER. </b>
        </p>        
    </div>
  </Col>
  <marquee behavior="alternate"> <i className="comingsoon">Coming Soon</i></marquee>
</Row>


export default LandingPage;
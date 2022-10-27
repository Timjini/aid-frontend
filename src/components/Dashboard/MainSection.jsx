import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Help1 from '../../assets/images/help1.jpg';
import Help2 from '../../assets/images/help2.jpg';
//import banner from '../../assets/images/art-banner.jpg';
import {Link} from 'react-router-dom';
import '../styles/Home.css';


export default function MainSection() {
  return (
    <>
    <div className ="header-wraper" style ={ { backgroundImage: `url(https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)` } }>
        < div className="main-info col-md-6 p-5 mx-auto">
            <h1> Aid Platfrom</h1>
            <p>Help Or Get Help Today !</p>
           <br/>

        </div>

    </div>
    <section className='section-1'>

    <Container>
        <Row>
            <Col xs={12} md={6} className='help1 p-5'>
                <Image src={Help1} className='img-fluid' />
            </Col>
            <Col xs={12} md={6} className='p-5'>
                <h2>Help people in need today</h2>
                <p className='lead'>Today you can help people in your area and get help when needed.</p>
                <Button variant="warning mt-2 p-3" className='action-button' href="/requests"> Get Help Now</Button>
                
            </Col>
        </Row>
    </Container>
</section>
<section className='section-2'>
        <Container>
            <Row>
                <Col xs={12} md={6} className='p-5'>
                    <h2 className='text-white'>Help people in need today</h2>
                    <p className='lead text-white'>Today you can help people in your area and get help when needed.</p>
                    <Button variant="warning mt-2 p-3" className='action-button' href="/requests"> Have You helped some one ?</Button>
                </Col>
                <Col xs={12} md={6} className='help2 p-5'>
                    <Image src={Help2} className='img-fluid' />
                </Col>
            </Row>
        </Container>
    </section>
    </>
  );
}

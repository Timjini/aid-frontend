import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Help1 from '../../assets/images/help1.jpg';
import Help2 from '../../assets/images/help2.jpg';
import banner from '../../assets/images/art-banner.jpg';
import '../styles/Home.css'


export default function MainSection() {
  return (
    <>
    <div className ="header-wraper" style ={ { backgroundImage: `url(${banner})` } }>
        < div className="main-info col-md-6 p-5">
            <h1> Aid Platfrom</h1>
           <br/>
           <Row>
               <Col>
           <Button variant="warning" size="lg"> Start Today</Button>
               </Col>
               <Col>
           <Button variant="outline-warning" size="lg"> Start Today</Button>
               </Col>
           </Row>

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
                <Button variant="warning mt-2 p-3" className='action-button'> Start Today</Button>
                
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
                    <Button variant="warning mt-2 p-3" className='action-button'> Start Today</Button>
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

import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import firstslide from '../../images/firstslide.jpg';
import './Home.css'
import { useNavigate } from 'react-router-dom';


function Home() {
  let navigate=useNavigate()
  const goToProducts=()=>{
    navigate("/products")
  }
  return (
    <div>
      <div className='slides'>
    <Carousel className='w-75 mx-auto mt-2' >
      <Carousel.Item interval={3000}>
        {/* <Image1 text="First slide" /> */}
        <img className="w-100" src={firstslide} alt='Cannot load'></img>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <img className="w-100" src={firstslide} alt='Cannot load'></img>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <img className="w-100" src={firstslide} alt='Cannot load'></img>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    <div className=' justify-content-between mx-auto w-50 d-flex justify-content-around mt-3'>
    <button className='home_btn btn btn-dark mt-3 w-25 fw-bold' onClick={goToProducts}>Buy Products</button>
    <button className='home_btn btn btn-dark mt-3 w-25 fw-bold'>Book appointment</button>
    </div>
    <div className=' justify-content-between mx-auto w-50 mt-3 d-flex justify-content-around'>
    <button className='home_btn btn btn-dark mt-3 w-25 fw-bold'>Book Petclub</button>
    <button className='home_btn btn btn-dark mt-3 w-25 fw-bold'>Book Grooming</button>
    </div>
    
    <p className='w-50 mx-auto mb-5 mt-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
  )
}

export default Home;
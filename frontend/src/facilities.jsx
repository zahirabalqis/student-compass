import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

// Import ATM images
import atmmaybank from "./assets/atmmaybank.png";
import bg3 from "./assets/bg3.jpg";
import atmislam from "./assets/atmislam.png";
import rhb from "./assets/rhb.jpg";

// import sport images
import field from "./assets/field.png";
import futsal from "./assets/futsal.jpg";
import gym from "./assets/gym.jpg";
import tenis from "./assets/tenis.jpg";
import keranjang from "./assets/keranjang.jpg";
import tampar from "./assets/tampar.jpg";

// import social
import cibo from "./assets/cibo.jpg";
import stall from "./assets/stall.jpg";
import ftvcafe from "./assets/ftvcafe.jpg";
import cafefsmp from "./assets/cafefsmp.jpg";
import lounge1 from "./assets/lounge1.jpg";
import lounge2 from "./assets/lounge2.jpg";
import surau from "./assets/surau.jpg";

//import healtcare
import pku from "./assets/pku.jpg";

//import infra
import library from "./assets/library.jpg";
import bustop from "./assets/bustop.png";


function Facilities() {
  const [selectedFacility, setSelectedFacility] = useState(null);

  const infraImages = [
    { src: library, description: "Tunku Bainun Library provide verity of books for students also have 24 hours room for students study" },
    { src: bustop, description: "Bus Stop UPSI near Pintu Timur provided for students to go to class or return to residential college " }
  ]; // infra images with descriptions array

  const healthImages = [
    { src: pku, description: "Pusat Kesihatan Universiti(PKU) provide Medical Check Up, Dental, Dispensary, Consultation, Lab & Treatment Room. PKU located next to the FSMP building" }
  ]; // health images with descriptions array

  const atmImages = [
    { src: atmmaybank, description: "Maybank ATM located near guard house (Pintu Timur)" },
    { src: rhb, description: "RHB ATM located inside Bitarasiswa near main door" },
    { src: atmislam, description: "Bank Islam ATM located near guard house (Pintu Barat)" }
  ]; // ATM images with descriptions array

  const sportsImages = [
    { src: field, description: "Football field located in front of Censelori building" },
    { src: futsal, description: "Futsal Court located near Star Wellness Hub" },
    { src: gym, description: "Star Wellness Hub is One Stop Center for physical fitness activities, sports rehabilitation & sports clinics in Muallim District" },
    { src: tenis, description: "At KSAJS have two tennis court which is near the field and near the basketball court" },
    { src: keranjang, description: "Basketball Court located in front of Bitarasiswa" },
    { src: tampar, description: "Volleyball Court located near to Malim Sarjana and in front of Block C" }
  ];

  const socialsImages = [
    { src: cibo, description: "CIBO Night Market every wednesday located at car park near Dewan Kuliah" },
    { src: stall, description: "Food Stall that have verity of food with student price located in front of Blok A" },
    { src: ftvcafe, description: "Cafe Food Republic by FTVInc sell various interesting menus are available located in front Dewan Rahman Talib" },
    { src: cafefsmp, description: "Cafe FSMP located behind FSMP block" },
    { src: lounge1, description: "Student lounge located inside Bitarasiswa open for 24 hours" },
    { src: lounge2, description: "Student lounge located inside Bitarasiswa open for 24 hours" },
    { src: surau, description: "Surau An-Nur located at in front of tennis court" }
  ];

  return (
    <div>
      <h2><b>Facilities</b></h2>
      <br></br>
      <div className="facility-menu">
        
        <button onClick={() => setSelectedFacility('socials')}>Social Facilities</button>
        <button onClick={() => setSelectedFacility('sports')}>Sports and Recreation</button>
        <button onClick={() => setSelectedFacility('health')}>Healthcare</button>
        <button onClick={() => setSelectedFacility('infra')}>Infrastructure</button>
        <button onClick={() => setSelectedFacility('atm')}>ATM Services</button>
        
      </div>

      {selectedFacility === 'infra' && (
  <div>
    <br></br>
    <h3>Infrastructure</h3>
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={1}
      style={{ width: '80%', margin: '0 auto' }} // Center slideshow
    >
      {infraImages.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.src} alt={`Infra Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
          <p style={{ textAlign: 'center', marginTop: '10px' }}>{image.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)}

      {selectedFacility === 'health' && (
  <div>
    <br></br>
    <h3>Healthcare</h3>
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={1}
      style={{ width: '80%', margin: '0 auto' }} // Center slideshow
    >
      {healthImages.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.src} alt={`Health Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
          <p style={{ textAlign: 'center', marginTop: '10px' }}>{image.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)}


      {selectedFacility === 'socials' && (
  <div>
    <br></br>
    <h3>Social Facilities</h3>
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={1}
      style={{ width: '60%', margin: '0 auto' }} // Center slideshow
    >
      {socialsImages.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.src} alt={`Socials Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
          <p style={{ textAlign: 'center', marginTop: '10px' }}>{image.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
)}

      {selectedFacility === 'sports' && (
  <div>
    <br></br>
    <h3>Sport and Recreation</h3>
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={1}
      style={{ width: '70%', margin: '0 auto' }} // Center slideshow
    >
      {sportsImages.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.src} alt={`Sports Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
          <p style={{ textAlign: 'center', marginTop: '10px' }}>{image.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
    <br></br>
    <p>Explore social facilities on campus. Relax, connect, and unwind with peers.</p>
  </div>
)}
      {selectedFacility === 'atm' && (
        <div>
        <br></br>
          <h3>ATM Services</h3>
          <Swiper 
            modules={[Navigation, Pagination]} 
            navigation 
            pagination={{ clickable: true }} 
            spaceBetween={30} 
            slidesPerView={1}
            style={{ width: '70%', margin: '0 auto' }} // Center slideshow
          >
            {atmImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image.src} alt={`ATM Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                <p style={{ textAlign: 'center', marginTop: '10px' }}>{image.description}</p>
              </SwiperSlide>
            ))}
          </Swiper>
          <br></br>
          <p>Campus ATMs and banking facilities. Conveniently located ATMs for ease of transaction</p>
        </div>
      )}
    </div>
  );
}

export default Facilities;


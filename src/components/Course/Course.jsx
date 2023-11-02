import React, { useState } from 'react';
import './Course.css';
import courses from '../../assets/CourseCatalogue';
import { useParams,useNavigate } from 'react-router-dom';

const CourseFeature = () => {

  const { cid } = useParams();
  const navigate = useNavigate();
  // console.log(cid);
  const {
    title,
    description,
    features,
    image
  } = courses[cid - 1];


  const [currentSlide, setCurrentSlide] = useState(0);
  console.log(currentSlide);

  const nextSlide = () => {
    const next = (currentSlide + 1) % features.length;
    const card = document.getElementById('inner-car');
    card.style.transform = `translateX(-${next*100}%)`;
    setCurrentSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + features.length) % features.length;
    setCurrentSlide(prev);
    const card = document.getElementById('inner-car');
    card.style.transform = `translateX(-${next*100}%)`;
  };

  return (
    <div className="course-feature">
      <img src={image} alt={title} />
      <div className="course-details">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="features">
          <h3>Course Features:</h3>

          <div id='carousel'>
            <div id='inner-car'>
              {features.map((feature, index) => (
                <div className='carousel-card glass-card'>
                  <h3>{feature.split(":")[0]}:</h3>
                  <span> {feature.split(":")[1]} </span>
                </div>
              ))}
            </div>
          </div>

          <div id='car-btn'>
            <button onClick={prevSlide}>Prev</button>
            <button onClick={nextSlide}>Next</button>
          </div>

          
          <button onClick={()=>navigate('/contact')} id='purchase'>Purchase <br /> Course</button>

        </div>
      </div>
    </div>
  );
};

export default CourseFeature;

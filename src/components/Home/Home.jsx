import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import courses from '../../assets/CourseCatalogue';

const Course= () => {

  const navigate = useNavigate();

  return (
    <div className="course-catalog">
      <header>
        <h1>Welcome to Our Course Catalog</h1>
        <p>Discover and enroll in the courses that interest you.</p>
      </header>
      <main>
        {courses.map((course) => (
          <section key={course.id} className="course">
            <img src={course.image} alt={course.title} />
            <h2>{course.title}</h2>
            <p>{course.tagLine}</p>
            <button onClick={ ()=>navigate('/course/'+course.id) }>Enroll</button>
          </section>
        ))}
      </main>
      {/* <footer>
        <p>&copy; {new Date().getFullYear()} Your Company</p>
      </footer> */}
    </div>
  );
};

export default Course;

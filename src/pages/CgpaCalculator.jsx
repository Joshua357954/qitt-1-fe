import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

const gradeOptions = ['A', 'B', 'C', 'D', 'E', 'F'];
const courseOptions = ['Math', 'Physics', 'History', 'Computer Science', 'English']; // Add your own courses

function CGPACalculator() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [creditUnits, setCreditUnits] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [score, setScore] = useState('');
  const [result, setResult] = useState(null);

  const addCourse = () => {
    if (selectedCourse && creditUnits && selectedGrade && score) {
      const newCourse = {
        course: selectedCourse,
        creditUnits: parseFloat(creditUnits),
        grade: selectedGrade,
        score: parseFloat(score),
      };

      setCourses([...courses, newCourse]);
      setSelectedCourse('');
      setCreditUnits('');
      setSelectedGrade('');
      setScore('');
    }
  };

  const calculateCGPA = () => {
    const totalCreditUnits = courses.reduce((acc, course) => acc + course.creditUnits, 0);
    const totalGradePoints = courses.reduce((acc, course) => {
      const gradePoint = gradeOptions.indexOf(course.grade) + 1; // Assuming A=5, B=4, etc.
      return acc + (gradePoint * course.creditUnits);
    }, 0);

    const cgpa = totalGradePoints / totalCreditUnits;
    setResult(cgpa.toFixed(2));
  };

  const resetCalculator = () => {
    setCourses([]);
    setSelectedCourse('');
    setCreditUnits('');
    setSelectedGrade('');
    setScore('');
    setResult(null);
  };

  return (
    <MainLayout route={"Cgpa Calculator"}>
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label>
          Course:
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 border rounded-md mt-1"
          >
            <option value="" disabled>Select Course</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </label>

        <label>
          Credit Units:
          <input
            type="number"
            value={creditUnits}
            onChange={(e) => setCreditUnits(e.target.value)}
            className="w-full p-2 border rounded-md mt-1"
          />
        </label>

        <label>
          Grade:
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="w-full p-2 border rounded-md mt-1"
          >
            <option value="" disabled>Select Grade</option>
            {gradeOptions.map((grade) => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </label>

        <label>
          Score:
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full p-2 border rounded-md mt-1"
          />
        </label>
      </div>

      <button
        onClick={addCourse}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-700"
      >
        Add Course
      </button>

      <button
        onClick={calculateCGPA}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700"
      >
        Calculate CGPA
      </button>

      <button
        onClick={resetCalculator}
        className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2 mt-4 hover:bg-gray-700"
      >
        Reset
      </button>

      {result !== null && (
        <p className="mt-4">Your CGPA: {result}</p>
      )}

      <div className="mt-4">
        <p className="font-bold mb-2">Courses:</p>
        {courses.map((course, index) => (
          <p key={index}><strong>{course.course}: </strong>{` ${course.creditUnits} Credit Units, Grade ${course.grade}, Score ${course.score}`}</p>
        ))}
      </div>
    </div>
    </MainLayout>
  );
}

export default CGPACalculator;

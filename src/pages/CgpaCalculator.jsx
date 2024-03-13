import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';

const gradeOptions = ['A', 'B', 'C', 'D', 'E', 'F'];

function CGPACalculator() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [creditUnits, setCreditUnits] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [result, setResult] = useState(null);

  const addCourse = () => {
    if (selectedCourse && creditUnits && selectedGrade) {
      const newCourse = {
        course: selectedCourse,
        creditUnits: parseFloat(creditUnits),
        grade: selectedGrade,
      };

      setCourses([...courses, newCourse]);
      setSelectedCourse('');
      setCreditUnits('');
      setSelectedGrade('');
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
    setResult(null);
  };

  return (
    <MainLayout route={"CGPA Calculator"}>
      <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <label>
            Course:
            <input
              type="text"
              placeholder="Enter course name"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-2 border rounded-md mt-1"
            />
          </label>

          <label>
            Credit Units:
            <input
              type="number"
              placeholder="Enter credit units"
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
        </div>

        <button
          onClick={addCourse}
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-700 focus:outline-none"
        >
          Add Course
        </button>

        <button
          onClick={calculateCGPA}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-700 focus:outline-none"
        >
          Calculate CGPA
        </button>

        <button
          onClick={resetCalculator}
          className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2 mt-2 hover:bg-gray-700 focus:outline-none"
        >
          Reset
        </button>

        {result !== null && (
          <p className="mt-4">Your CGPA: {result}</p>
        )}

        <div className="mt-4">
          <p className="font-bold mb-2">Courses:</p>
          {courses.map((course, index) => (
            <p key={index}><strong>{course.course}: </strong>{` ${course.creditUnits} Credit Units, Grade ${course.grade}`}</p>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default CGPACalculator;

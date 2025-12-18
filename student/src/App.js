import React, { useState } from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [showList, setShowList] = useState(false);

  return (
    <div>
      <h1>Student Registration</h1>
      <StudentForm addStudent={(s) => setStudents([...students, s])} />

      <button onClick={() => setShowList(!showList)}>
        {showList ? "Hide" : "Show"} Student List
      </button>

      {showList && <StudentList students={students} />}
    </div>
  );
}

export default App;

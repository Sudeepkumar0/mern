import React, { useState, useEffect } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem("employees")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // Create or Update
  const handleSubmit = () => {
    if (!name.trim()) return;

    if (editId) {
      // Update existing employee
      setEmployees(
        employees.map((e) =>
          e.id === editId ? { ...e, name, position, salary } : e
        )
      );
      setEditId(null);
    } else {
      // Create new employee
      setEmployees([...employees, { id: Date.now(), name, position, salary }]);
    }

    setName("");
    setPosition("");
    setSalary("");
  };

  // Delete
  const handleDelete = (id) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  // Edit (populate form)
  const handleEdit = (employee) => {
    setName(employee.name);
    setPosition(employee.position);
    setSalary(employee.salary);
    setEditId(employee.id);
  };

  // Cancel edit
  const handleCancel = () => {
    setName("");
    setPosition("");
    setSalary("");
    setEditId(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Employee Management (CRUD)</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          placeholder="Salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", width: "100px" }}
        />
        <button onClick={handleSubmit} style={{ padding: "5px 15px" }}>
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button
            onClick={handleCancel}
            style={{ padding: "5px 15px", marginLeft: "5px" }}
          >
            Cancel
          </button>
        )}
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {employees.map((e) => (
          <li
            key={e.id}
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{e.name}</strong>
              {e.position && <span> - {e.position}</span>}
              {e.salary && <span> - ₹{e.salary}</span>}
            </div>
            <div>
              <button
                onClick={() => handleEdit(e)}
                style={{ marginRight: "5px", padding: "3px 10px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(e.id)}
                style={{
                  padding: "3px 10px",
                  backgroundColor: "#ff4444",
                  color: "white",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;

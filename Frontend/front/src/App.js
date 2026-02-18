import React, { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [leaveCount, setLeaveCount] = useState("");
  const [payslip, setPayslip] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    emp_id: "",
    designation: "",
    joining_date: "",
    basic_salary: "",
    hra_percent: "",
    da_percent: "",
    other_allowance_percent: "",
    esi_percent: "",
    pf_percent: ""
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch("http://127.0.0.1:8000/api/employees/")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  };

  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const addEmployee = () => {
    fetch("http://127.0.0.1:8000/api/add-employee/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Employee Added Successfully!");
        setNewEmployee({
          name: "",
          emp_id: "",
          designation: "",
          joining_date: "",
          basic_salary: "",
          hra_percent: "",
          da_percent: "",
          other_allowance_percent: "",
          esi_percent: "",
          pf_percent: ""
        });
        fetchEmployees();
      });
  };

  const deleteEmployee = (id) => {
    fetch(`http://127.0.0.1:8000/api/delete-employee/${id}/`, {
      method: "DELETE",
    }).then(() => {
      alert("Employee Deleted");
      fetchEmployees();
    });
  };

  const generatePayslip = () => {
    if (!selectedEmployee || !leaveCount) {
      alert("Please select employee and enter leave count");
      return;
    }

    fetch("http://127.0.0.1:8000/api/generate-payslip/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_id: selectedEmployee,
        leave: leaveCount,
      }),
    })
      .then((res) => res.json())
      .then((data) => setPayslip(data));
  };

  return (
    <div className="container mt-5">

      {/* ADD EMPLOYEE */}
      <div className="card shadow p-4 mb-5">
        <h2 className="mb-4">Add Employee</h2>

        <input className="form-control mb-2" name="name" placeholder="Name" value={newEmployee.name} onChange={handleChange}/>
        <input className="form-control mb-2" name="emp_id" placeholder="Employee ID" value={newEmployee.emp_id} onChange={handleChange}/>
        <input className="form-control mb-2" name="designation" placeholder="Designation" value={newEmployee.designation} onChange={handleChange}/>
        <input className="form-control mb-2" type="date" name="joining_date" value={newEmployee.joining_date} onChange={handleChange}/>
        <input className="form-control mb-2" type="number" name="basic_salary" placeholder="Basic Salary" value={newEmployee.basic_salary} onChange={handleChange}/>
        <input className="form-control mb-2" type="number" name="hra_percent" placeholder="HRA %" value={newEmployee.hra_percent} onChange={handleChange}/>
        <input className="form-control mb-2" type="number" name="da_percent" placeholder="DA %" value={newEmployee.da_percent} onChange={handleChange}/>
        <input className="form-control mb-2" type="number" name="other_allowance_percent" placeholder="Other Allowance %" value={newEmployee.other_allowance_percent} onChange={handleChange}/>
        <input className="form-control mb-2" type="number" name="esi_percent" placeholder="ESI %" value={newEmployee.esi_percent} onChange={handleChange}/>
        <input className="form-control mb-3" type="number" name="pf_percent" placeholder="PF %" value={newEmployee.pf_percent} onChange={handleChange}/>

        <button className="btn btn-success w-100" onClick={addEmployee}>
          Add Employee
        </button>
      </div>

      {/* EMPLOYEE LIST */}
      <div className="card shadow p-4 mb-5">
        <h2 className="mb-4">Employee List</h2>

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Basic Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.designation}</td>
                <td>₹{emp.basic_salary}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GENERATE PAYSLIP */}
      <div className="card shadow p-4">
        <h2 className="mb-4">Generate Payslip</h2>

        <select
          className="form-select mb-3"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Leave Count"
          value={leaveCount}
          onChange={(e) => setLeaveCount(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={generatePayslip}>
          Generate Payslip
        </button>

        {payslip && (
          <div className="mt-4 p-3 border rounded bg-light">
            <h4>Payslip</h4>
            <p><strong>Name:</strong> {payslip.name}</p>
            <p><strong>Employee ID:</strong> {payslip.emp_id}</p>
            <p><strong>Designation:</strong> {payslip.designation}</p>
            <p><strong>Gross Salary:</strong> ₹{payslip.gross_salary}</p>
            <p><strong>Net Salary:</strong> ₹{payslip.net_salary}</p>
            <p><strong>Leave Count:</strong> {payslip.leave_count}</p>
            <p><strong>Final Salary:</strong> ₹{payslip.final_salary}</p>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={() => window.print()}
            >
              Print Payslip
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;

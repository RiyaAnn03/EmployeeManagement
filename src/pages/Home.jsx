import React, { useEffect, useState } from 'react';
import { Button, Modal, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteEmpDetailsAPI, getAllEmpDetailsAPI, updateEmpDetailsAPI } from '../services/allAPI';

const Home = ({ addResponseFromLanding }) => {
  const [deleteResponse, setDeleteResponse] = useState('');
  const [allDetails, setAllDetails] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({
    empID: '',
    empName: '',
    empEmail: '',
    empStatus: ''
  });

  useEffect(() => {
    getAllEmpDetails(); 
  }, [addResponseFromLanding, deleteResponse]);

  const getAllEmpDetails = async () => {
    try {
      const result = await getAllEmpDetailsAPI();
      if (result.status >= 200 && result.status < 300) {
        setAllDetails(result.data); 
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEmpDetails = async (id) => {
    try {
      const result = await deleteEmpDetailsAPI(id); // Delete employee by ID
      setDeleteResponse(result); 
    } catch (err) {
      console.log(err);
    }
  };

  const updateEmpDetails = async () => {
    try {
      console.log("Sending updated details to API:", employeeDetails);
  
      const result = await updateEmpDetailsAPI(employeeDetails);
      
      if (result.status >= 200 && result.status < 300) {
        console.log("Successfully updated employee details:", result.data);
  
        getAllEmpDetails();
  
        setEmployeeDetails({ empID: '', empName: '', empEmail: '', empStatus: '' });
        handleClose();
      } else {
        console.error("Failed to update employee details:", result);
      }
    } catch (err) {
      console.error("Error in updateEmpDetails:", err);
    }
  };
  
  

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (details) => {
    setEmployeeDetails(details); 
    setShow(true);
  };

  return (
    <>
      <h1 className="d-flex justify-content-center align-items-center mt-5">Employee List</h1>
      <div style={{ margin: '70px' }} className="border rounded p-3">
        <div className="d-flex">
          <Link to={'/'}>
            <Button variant="success" className="ms-1 p-2 mt-2" as="input" type="submit" value="Add+" />
          </Link>
        </div>
        <table className="my-5 table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Employee Status</th>
              <th>...</th>
            </tr>
          </thead>
          {allDetails?.length > 0 ? (
            allDetails?.map((details) => (
              <tbody key={details?.id}>
                <tr>
                  <td>{details?.empID}</td>
                  <td>{details?.empName}</td>
                  <td>{details?.empEmail}</td>
                  <td>{details?.empStatus}</td>
                  <td>
                    <div>
                      <Button onClick={() => handleShow(details)} variant="primary">Edit</Button>
                      <button className="btn" onClick={() => deleteEmpDetails(details?.id)}>
                        <i className="fa-solid fa-trash text-danger"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <div className="fw-bolder text-danger fs-5">No details are uploaded yet!!</div>
          )}
        </table>
      </div>

      {/* Modal for updating employee details */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
  <Modal.Header closeButton>
    <Modal.Title>Update Employee</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className='border rounded p-3'>
      <FloatingLabel className='p-2' controlId="floatingID" label="Employee ID">
        <Form.Control
          value={employeeDetails.empID}
          onChange={(e) => setEmployeeDetails({ ...employeeDetails, empID: e.target.value })}
          type="text"
          placeholder="Employee ID"
          disabled
        />
      </FloatingLabel>
      <FloatingLabel className='p-2' controlId="floatingName" label="Employee Name">
        <Form.Control
          value={employeeDetails.empName}
          onChange={(e) => setEmployeeDetails({ ...employeeDetails, empName: e.target.value })}
          type="text"
          placeholder="Employee Name"
        />
      </FloatingLabel>
      <FloatingLabel className='p-2' controlId="floatingEmail" label="Employee Email">
        <Form.Control
          value={employeeDetails.empEmail}
          onChange={(e) => setEmployeeDetails({ ...employeeDetails, empEmail: e.target.value })}
          type="email"
          placeholder="Employee Email"
        />
      </FloatingLabel>
      <select
        value={employeeDetails.empStatus}
        onChange={(e) => setEmployeeDetails({ ...employeeDetails, empStatus: e.target.value })}
        className='ms-2 p-2'
      >
        <option value="">Employee Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>Close</Button>
    <Button variant="primary" onClick={updateEmpDetails}>Update</Button>
  </Modal.Footer>
</Modal>


    </>
  );
};

export default Home;

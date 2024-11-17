import React, { useState } from 'react'
import { Form,FloatingLabel,Button,} from 'react-bootstrap'
import { saveEmpDetailsAPI } from '../services/allAPI';
import { Link } from 'react-router-dom';
const Landing = ({setAddResponseFromLanding}) => {
  const [employeeDetails,setEmployeeDetails]=useState(
    {
      empID:"",empName:"",empEmail:"",empStatus:""
    }
  )
  

  console.log(employeeDetails);
  const handleSubmitDetails=async ()=>{
    // object destruct: const{key1,key2..}=object-name
    const {empID,empName,empEmail,empStatus}= employeeDetails
    if(empID && empName && empEmail &&empStatus){
      // store the details permanently
// alert('store the details permanently')
       try{
       const result= await saveEmpDetailsAPI(employeeDetails)
       console.log(result);
       if(result.status>=200 && result.status<300){
        // alert("Employee Details saved successfully")
        handleClose()
        setAddResponseFromLanding(result)
       }else{
        console.log(result);
        
       }
       

    }catch(err){
      console.log(err);
  
      }

    }else{
      alert("please fill the form")
    }
  }
  
  return (
    <>
    <div  style={{margin:'200px'}} className=' border rounded p-3  '>
        Add Employee Details
    <FloatingLabel className='p-2' controlId="floatingID" label="Employee ID">
        <Form.Control onChange={e=>setEmployeeDetails({...employeeDetails,empID:e.target.value})} type="password" placeholder="Employee ID" />
      </FloatingLabel>
      <FloatingLabel className='p-2' controlId="floatingName" label="Employee Name">
        <Form.Control onChange={e=>setEmployeeDetails({...employeeDetails,empName:e.target.value})}  type="text" placeholder="Employee Name" />
      </FloatingLabel>
      <FloatingLabel className='p-2' controlId="floatingEmail" label=" Employee Email">
        <Form.Control onChange={e=>setEmployeeDetails({...employeeDetails,empEmail:e.target.value})}  type="email" placeholder="Employee Email" />
      </FloatingLabel>

   <div className='d-flex justify-content-center '>
   <select value={employeeDetails.empStatus} onChange={(e) => setEmployeeDetails({ ...employeeDetails, empStatus: e.target.value })}
        className="form-select mt-3" >
        <option  value=""disabled  >Employee Status</option>
        <option  value="Active">Active</option>
        <option value="Inactive">Inactive </option>
      </select>
     <Link to={'/home'}><Button onClick={handleSubmitDetails} variant='success'  className='ms-1 p-2 mt-2 'as="input" type="submit" value="Submit" /></Link>

   </div>

    </div>
   
    
    
    </>
      
      
  )
}

export default Landing

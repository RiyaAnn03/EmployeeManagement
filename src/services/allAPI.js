import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

//saveEmpDetailsAPI -post  http request called Landing component when user  click on submit button
export const saveEmpDetailsAPI=async(employeeDetails)=>{
  return await commonAPI("POST",`${SERVERURL}/empAddDetails`,employeeDetails)

}

export const  getAllEmpDetailsAPI=async()=>{
  return await commonAPI("GET",`${SERVERURL}/empAddDetails`,"")

}
// deleteEmpDetails-delete http request called home component when user click on edit button

export const deleteEmpDetailsAPI =async(id)=>{
  return await commonAPI("DELETE",`${SERVERURL}/empAddDetails/${id}`,{})

}
export const updateEmpDetailsAPI = async (employeeDetails) => {
  return await commonAPI("PUT",`${SERVERURL}/empAddDetails/${employeeDetails.id}`,employeeDetails )};

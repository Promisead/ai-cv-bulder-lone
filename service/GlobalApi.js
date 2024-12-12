import axios from "axios";
//process.env.REACT_APP_

//import.meta.env.VITE_STRAPI_API_KEY;
//meta.env.VITE_API_BASE_URL
const API_KEY='481f1b10a81db97cad352f8e8bdd20186adcca5cc8f053cb9d11dedf4163cf637074cdf588b51cc41fdaf2d953e9525dad57724608964d9daec7dc7bdf453a87c1d49fd0ff1bda119dafb8f675b4dbfc4db347233a4';
const axiosClient=axios.create({
    baseURL:'http//:localhost:8080',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }
})

const CreateNewResume=(data)=>axiosClient.post('/user-resumes',data);

const GetUserResumes=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);

const UpdateResumeDetail=(id,data)=>axiosClient.put('/user-resumes/'+id,data)

const GetResumeById=(id)=>axiosClient.get('/user-resumes/'+id+"?populate=*")

const DeleteResumeById=(id)=>axiosClient.delete('/user-resumes/'+id)

 export default{
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
}
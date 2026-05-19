import axios from "axios";

// creating a function to get backend url
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // also need to tell the frontend that our API are in json
  headers: { "Content-Type": "application/json" },
});

//function to get allstudents API
export const getAllStudents = async() => (await api.get('/api/students/allstudents')).data.data
//function to get student by ID API
export const getStudentById = async(id) => (await api.get(`/api/students/getstudent/${id}`)).data
//function to add student API
export const addStudent = async(data) => (await api.post('/api/students/add',data)).data
//function to update student API
export const updateStudent = async(id,data) => (await api.put(`/api/students/update/${id}`,data)).data
//function to delete student API
export const deleteStudent = async(id) => (await api.delete(`/api/students/delete/${id}`)).data
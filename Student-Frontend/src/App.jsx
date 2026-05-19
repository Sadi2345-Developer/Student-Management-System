import HomePage from "./Pages/HomePage";
import AppNavbar from "./Components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudentPage from "./Pages/AddStudentPage.jsx";
import EditStudentPage from "./Pages/EditStudentPage.jsx";


function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      {/* Routes as a link kam krta ha  */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add' element={<AddStudentPage />}/>
        <Route path='/edit/:id' element={<EditStudentPage/>}/>
        </Routes>
    </BrowserRouter>

  );
}

export default App;

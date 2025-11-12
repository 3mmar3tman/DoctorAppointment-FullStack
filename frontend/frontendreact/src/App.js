import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import AddAppointment from "./pages/AddAppointment";
import AddDoctor from "./pages/AddDoctor";
import AllDoctors from "./pages/AllDoctors";
import DoctorDetails from "./pages/DoctorDetails";
import MyAppointments from "./pages/MyAppointments";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-appointment" element={<AddAppointment />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/allDoctors" element={<AllDoctors />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
      </Routes>
    </>
  );
}

export default App;

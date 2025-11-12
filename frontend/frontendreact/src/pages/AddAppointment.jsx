import React from 'react'
import { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function AddAppointment() {
    const [doctors, setDoctors] = useState([]);
    const {user}=useContext(AuthContext);
    const [form, setForm] = useState({
        doctor: '',
        date: '',
        reason: ''
    });
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:5000/doctor/allDoctors');
                const data = await response.json();
                 console.log("Doctors data:", data);
                setDoctors(data);
            }
            catch (error) {
                console.error('Error fetching doctors:', error);
            }
        }
        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }   
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data being sent:", form);
        
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        try {
            const response = await fetch('http://localhost:5000/appointment/bookAppointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',"Authorization": `Bearer ${token}`  },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Appointment added successfully!');
                setForm({
                    doctor: '',
                    date: '',
                    reason: ''
                });
            } else {
                alert('Error adding appointment: ' + data.message);
                   }
            } catch (error) {
            console.error('Error submitting appointment:', error);
            alert('Error submitting appointment');
        }

        if(!user){
            return (
                <div className='flex justify-center items-center h-screen bg-gray-100'>
                    <p className='text-red-500'>Please login to add an appointment.</p>
                </div>
            )           
        }
    }

        
    
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Add Appointment
            </h2>

            <label className="block mb-2 text-sm font-semibold">Doctor</label>
            <select 
                name='doctor'
                value={form.doctor}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded"    
            >
                <option value="">Select doctor</option>
                {doctors?.map((doc)=>(
                    <option key={doc._id} value={doc._id}>
                        {doc?.name} - {doc?.specialty}
                    </option>
                ))}
            </select>

            <label className="block mb-2 text-sm font-semibold">Date</label>      
            <input 
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded"
            />

            <label className="block mb-2 text-sm font-semibold">Reason</label>      
            <textarea 
                name="reason"
                value={form.reason}
                onChange={handleChange}
                required
                className="w-full mb-4 p-2 border rounded h-24 resize-none"
                placeholder="Describe your reason for the appointment..."
            />

            {/* FIXED: Added proper button styling */}
            <button 
                type='submit' 
                className='w-full py-2 rounded  text-white font-semibold transition duration-200'
            >
                Submit
            </button>     
        </form>
    </div>
  )
}

export default AddAppointment
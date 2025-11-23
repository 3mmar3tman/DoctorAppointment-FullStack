import React from "react"
import AboutUs from "../img/about.jpg"

function About() {
  return (
    <section className="bg-gray-50 text-black py-16">
        <div className='max-w-4xl mx-auto text-center px-4'>
            <h3 className='text-3xl font-bold mb-4 text-[#008e9b]'> About Our Medical Services</h3>
            <p className='text-gray-600 mt-2 mb-2'>We are dedicated to providing comprehensive medical care with a focus on patient well-being. Our experienced team of healthcare professionals offers a wide range of services, from preventive care to specialized treatments, ensuring that you receive the best possible care tailored to your needs.</p>
        </div>
        <div className='max-w-6xl  mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-8 px-4 mt-8 '>
            <div className='relative'>
                <img src={AboutUs}  className="rounded-lg shadow-md" alt="About us"/>
                <a href='https://www.youtube.com/watch?v=Y7f98aduVJ8' className="absolute inset-0 flex items-center justify-center">

                <div className='bg-white rounded-full p-4 shadow-lg hover:scale-110 transition'>
                    Play
                </div>

                </a>
            </div>
            <div>
                <h3 className='text-xl font-semibold mb-4'>We are committed to providing trusted healthcare services with skilled professionals, advanced technology, and compassionate care to ensure your well-being.</h3>
                <p className='text-[#008e9b]'>"We strive to deliver exceptional healthcare with a patient-first approach, combining expert medical knowledge, modern facilities, and compassionate care to improve lives and build healthier communities."</p>

                <ul className='space-y-2 mb-4 mt-5'>

                    <li>✔ Quick and easy online appointment booking.</li>
                    <li>✔ Comprehensive healthcare services for your entire family.</li>
                    <li>✔ Compassionate care focused on your well-being.</li>
                </ul>


            </div>
        </div>
    </section>
  )
}

export default About
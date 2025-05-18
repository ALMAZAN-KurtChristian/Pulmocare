import React from 'react';
import Navbar_user from './Navbar_user';
import Footer from './Footer';
import './Doctor_details.scss';
import PROFILE from './IMAGES/NAVBAR/PROFILE.png';


const Doctor_details = ()  =>{
    return (
        <div className='Details'>
            <Navbar_user />
            <div className='Doctor_container'>
                <img src={PROFILE} alt='Doctor_Image' className='Doctor_Image' />
                <div className='Doctor_overlay'>
                    <h1> Doctor Cifra </h1>
                    <br />
                    <h2>A registered Physician of the Our Lady of Fatima University </h2>
                    <br />
                    <span>Availability: Monday to Saturday
                    <br />
                    Time: 8:00 am to 5:00 pm 
                    <br />
                    Email:cifra@gmail.com</span>
                </div>
            </div>
            <div className='Nurse_container'>
                <img src={PROFILE} alt='Nurse_Image' className='Nurse_Image' />
                <div className='Nurse_overlay'>
                    <h1> Nurse Janice </h1>
                    <br/>
                    <h2>A registered Nurse of the Our Lady of Fatima University </h2>
                    <br/>
                    <span>Availability: Monday to Saturday
                    <br />
                    Time: 8:00 am to 5:00 pm 
                    <br />
                    Email:Janice@gmail.com</span>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Doctor_details;
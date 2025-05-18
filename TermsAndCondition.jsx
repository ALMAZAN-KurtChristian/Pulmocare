import React from 'react';
import Navbar from './Navbar';
import './TermsAndCondition.scss';
import Footer from './Footer'

const TermsAndCondition = () => {

  return (
    <div className="container-terms">
      <Navbar />
      <div className="TermsAndCondition-container">
          <h1>
           Terms And Conditions
          </h1>
          <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; These Terms and Conditions ("Terms") govern your use of the PulmoCare Al Doctor Assistant, website By using the website, you agree to abide by these Terms. If you do not agree with any part of these Terms, please refrain from using the website </p>
          <p> 1. Not a Substitute for Professional Medical Adice: The AI Doctor Assistant is intended for informational purposes only and should not be considered a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for your health concerns. </p>
          <p> 2. Privacy and Data Security: Your data privacy and security are of utmost importance. The App collects and stores user interactions and data in compliance with applicable data protection laws. For more information, please refer to our Privacy Policy. </p>
          <p> 3. Accuracy and Liability: While the Al strives to provide accurate information, it may not always be error-free or up-to-date. We are not liable for any actions taken based on the information provided by the AI. </p>
          <p> 4. User Responsibilities: You are responsible for the accuracy and truthfulness of the information provide to the AI. Misuse or abuse of the App may result in suspension of access. </p>
          <p> 5. Age Restrictions: The website is not intended for users under the age of 18. If you are under 18, please do not use the wesbite. </p>
          <p> 6. Intellectual Property: All content and materials within the App are the property of [Your Company Name] and are protected by intellectual property laws. You may not use, copy, or distribute the materials without permission. </p>
          <p> 7. Updates and Changes: We may update or modify these Terms at any time. Continued use of the App after such changes constitutes your acceptance of the modified Terms. </p>
          <p> 8. Termination: We reserve the right to terminate access to the App at our discretion and without notice. </p>
          <p> 9. Governing Law: These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. </p>
          <p> Please read these Terms carefully. Your use of the App implies your understanding and acceptance these Terms and any future modifications. If you have any questions or concerns, please contact jmacapugay8417val@student.fatima.edu.ph. </p>
          <p id='last'> Last updated: October 27, 2023</p>
      </div>
    <Footer />
    </div>
  );
};

export default TermsAndCondition;

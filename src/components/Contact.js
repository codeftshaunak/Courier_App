import React from 'react'
import LayoutComponent from '../layout/LayoutComponent';
import ContactForm from './ContactForm';

const Contact = () => {
    return (
        <LayoutComponent>
            <div className="about vh-80 mt-20 relative">
                <div className="about-image"></div>
                <div className="about-content">
                    <div className="text-about-content">
                        <h1>Contact Us</h1>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </LayoutComponent>
    )
}

export default Contact;

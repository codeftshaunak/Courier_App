import React from 'react'
import LayoutComponent from '../layout/LayoutComponent';
import ContactForm from './ContactForm';

const Contact = () => {
    return (
        <LayoutComponent>
            <div className="vh-80 mt-20 bg-color pt-10">
                <ContactForm />
            </div>
        </LayoutComponent>
    )
}

export default Contact;

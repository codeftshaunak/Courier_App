import React from 'react';
import LayoutComponent from '../layout/LayoutComponent';
import Hero from './Hero';
import Footer from './Footer';
import HeroAbou from './HeroAbou';

const About = () => {
    return (
        <>
            <LayoutComponent>
                <HeroAbou />
                <Footer />
            </LayoutComponent>
        </>

    )
}

export default About;

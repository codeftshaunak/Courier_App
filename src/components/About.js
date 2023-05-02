import React from 'react';
import LayoutComponent from '../layout/LayoutComponent';
import Hero from './Hero';
import Footer from './Footer';
import HeroAbou from './HeroAbou';
import Overview from './Overview';

const About = () => {
    return (
        <>
            <LayoutComponent>
                <HeroAbou />
                <Overview />
                <Footer />
            </LayoutComponent>
        </>

    )
}

export default About;

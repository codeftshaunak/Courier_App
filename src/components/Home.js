import React from 'react';
import LayoutComponent from '../layout/LayoutComponent';
import Hero from './Hero';
import Footer from './Footer';

const Home = () => {
    return (
        <LayoutComponent>
            <Hero />
            <Footer />
        </LayoutComponent>
    )
}

export default Home;

import React from 'react';
import Banner from './Banner';
import CheckoutPage from '../CheckOut/CheckoutPage';
import WhyChooseUs from './WhyChooseUs';
import SpecialOffer from './SpecialOffer';
import Gallery from './Gallery';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Gallery></Gallery>
            <WhyChooseUs></WhyChooseUs>
            <SpecialOffer></SpecialOffer>
            <CheckoutPage></CheckoutPage>
        </div>
    );
};

export default Home;
import React from 'react';
import Banner from './Banner';
import CheckoutPage from '../CheckOut/CheckoutPage';
import WhyChooseUs from './WhyChooseUs';
import SpecialOffer from './SpecialOffer';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <SpecialOffer></SpecialOffer>
            <CheckoutPage></CheckoutPage>
        </div>
    );
};

export default Home;
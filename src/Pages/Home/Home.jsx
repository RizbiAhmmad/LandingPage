import React from 'react';
import Banner from './Banner';
import CheckoutPage from '../CheckOut/CheckoutPage';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <CheckoutPage></CheckoutPage>
        </div>
    );
};

export default Home;
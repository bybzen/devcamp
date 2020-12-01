import React from 'react'
import ShopItem from './ShopItem'
import main from './images/main.jpg'
import Navbar from './components/Navbar';
import './Card.css';


const cards = () => {
    return (
        <div >
             <Navbar />
            

            {/* <h1>Check out these EPIC Destinations!</h1> */}
            <div className='cards'>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <ShopItem
                            src={main}
                            text='Explore the hidden waterfall deep inside the Amazon Jungle'
                            label='Adventure'
                            path='/login'
                        />
                        <ShopItem
                            src={main}
                            text='วิชา : '
                            label='Luxury'
                            path='/services'
                        />
                    </ul>
                    <ul className='cards__items'>
                        <ShopItem
                            src={main}
                            text='วิชา : '
                            label='Mystery'
                            path='/services'
                        />
                         </ul>
                    <ul className='cards__items'>
                        <ShopItem
                            src={main}
                            text='วิชา : '
                            label='Adventure'
                            path='/products'
                        />
                        
                        <ShopItem
                            src={main}
                            text='วิชา : '
                            label='Adrenaline'
                            path='/sign-up'
                        />
                        <ShopItem
                            src={main}
                            text='วิชา : '
                            label='Adrenaline'
                            path='/sign-up'
                        />
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default cards
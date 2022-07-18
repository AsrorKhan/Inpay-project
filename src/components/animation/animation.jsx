import React from 'react';
import Lottie from 'react-lottie'
import './animation.scss'

export const LottieAnimation = ({animationData}) => {
    const defaultOption = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className='lottie-animation-wrapper'>
            <Lottie
                options={defaultOption}
                height={400}
                width={400}
            />
        </div>
    );
}

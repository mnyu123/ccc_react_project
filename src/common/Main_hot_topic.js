import React, { useState, useEffect } from 'react';
import '../css/Main_hot_topic.css';

const MainHotTopic = () => {
    // 임시 데이터
    const slidesData = [
        { img: '/images/ccc_bookcover/도쿄 에일리언즈 7.jpg', alt: '책 표지', number: 1, description: '설명' },
        { img: '/images/ccc_bookcover/황제의 외동딸(만화) 1.jpg', alt: '책 표지', number: 2, description: '설명' },
        { img: '/images/ccc_bookcover/하루만 네가 되고 싶어.jpg', alt: '책 표지', number: 3, description: '설명' },
        { img: '/images/ccc_bookcover/주술회전.jpg', alt: '책 표지', number: 4, description: '설명' },
        { img: '/images/ccc_bookcover/오투 중등 과학 3-2(2023).jpg', alt: '책 표지', number: 5, description: '설명' },
        { img: '/images/ccc_bookcover/역대급 영지 설계사 1.jpg', alt: '책 표지', number: 6, description: '설명' },
        { img: '/images/ccc_bookcover/명탐정코난.jpg', alt: '책 표지', number: 7, description: '설명' },
        { img: '/images/ccc_bookcover/쎈 중등 수학 2-2(2023).jpg', alt: '책 표지', number: 8, description: '설명' },
        { img: '/images/ccc_bookcover/아레나 옴므+(2023년 11월호).jpg', alt: '책 표지', number: 9, description: '설명' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = slidesData;

    const updateSlidePosition = () => {
        const slideContainer = document.querySelector('.slide');
        slideContainer.style.transform = `translateX(-${currentIndex * (100 / slides.length)}%)`;
    };

    useEffect(() => {
        updateSlidePosition();
    }, [currentIndex]);

    const prevSlide = () => {
        setCurrentIndex(prevIndex => {
            let newIndex = prevIndex - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            console.log('이전 버튼 눌려짐'); // 이 부분 추가
            return newIndex;
        });
    };

    const nextSlide = () => {
        setCurrentIndex(prevIndex => {
            let newIndex = prevIndex + 1;
            if (newIndex >= slides.length) newIndex = 0;
            console.log('다음 버튼 눌려짐'); // 이 부분 추가
            return newIndex;
        });
    };


    return (
        <div className="soaring_wrap" id="soaring_wrap">
            <h2>급상승</h2>
            <div className="slide">
                <div className="soaring1">
                    {slides.map((slide, index) => (
                        <div key={index} className="item">
                            <img src={slide.img} alt={slide.alt} />
                            <span className="number">{slide.number}</span>
                            <p className="description">{slide.description}</p>
                        </div>
                    ))}
                </div>
                <button id="nextBtn" onClick={nextSlide}> {'>'} </button>
            </div>
            <button id="prevBtn" onClick={prevSlide}> {'<'} </button>
        </div>
    );
};

export default MainHotTopic;
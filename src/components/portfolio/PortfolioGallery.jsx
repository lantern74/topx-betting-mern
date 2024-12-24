import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lightbox from 'react-lightbox-component';
// import 'react-lightbox-component/style.css';



const PortfolioContent = [
    {
        img:'image1',
        tag: '社群分享',
        pjname:'Product Analysis',
        plus: 'bi bi-plus',
    },
    {
        img:'image2',
        tag: '動態更新',
        pjname:'UI, UX Design',
        plus: 'bi bi-plus',
    },
    {
        img:'image3',
        tag: '分析紀錄',
        pjname:'Content Marketing',
        plus: 'bi bi-plus',
    },
]

const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        }, {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const images = [
    "/images/gallery/image1.jpg",
    "/images/gallery/image2.jpg",
    "/images/gallery/image3.jpg",
  ];

const PortfolioGallery = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    
    return (
        <Fragment>
            <Slider {...settings} className="portfolio_slider_one">
                {PortfolioContent.map((val, i)=>(
                    <div key={i} className="item">
                    <div className="portfolio-block-one">
                        <div className="img-meta"><img src={`images/gallery/${val.img}.jpg`} alt="" className="w-100"/></div>
                    </div>
                    <div style={{textAlign:"center"}}>{val.tag}</div>
                </div>
                ))}
            </Slider>
        </Fragment>
    )
}

export default PortfolioGallery
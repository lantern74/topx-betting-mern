import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

import AboutThree from '../../components/about/AboutThree';
import AdressOne from '../../components/adress/AdressOne';
import Info from '../../components/adress/Info';
import Blog from '../../components/blog/Blog';
import BrandOne from '../../components/brand/BrandOne';
import CounterThree from '../../components/counter/CounterThree'
import FancyFeatureOne from '../../components/feature/FancyFeatureOne'
import FancyFeatureThree from '../../components/feature/FancyFeatureThree'
import TopNavOne from '../../components/header/TopNavOne'
import HeroBannerOne from '../../components/hero-banner/HeroBannerOne'
import PortfolioGallery from '../../components/portfolio/PortfolioGallery'
import PricingTab from '../../components/pricing/pricetab/PricingTab';
import TestimonialOne from '../../components/testimonial/TestimonialOne';
import FooterTwo from '../../components/footer/FooterTwo';
import CopyRightFour from '../../components/footer/CopyRightFour';

const DataScience = () => {
    return (
        <Fragment>
            <div className="main-page-wrapper">
                
                <div className="portfolio-gallery-one mt-150 lg-mt-110" data-aos="fade-up">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5 col-md-7 col-sm-8">
                                <div className="title-style-one text-center text-sm-start xs-pb-20">
                                    <h2 className="main-title"><span>多平台</span>公開分析紀錄<br></br>實力見證效果</h2>
                                </div>
                                {/* /.title-style-one */}
                            </div>
                        </div>
                        <div className="slider-wrapper">
                            <PortfolioGallery/>
                        </div>
                        {/* /.slider-wrapper */}
                    </div>
                </div>
                {/* /.portfolio-gallery-one */}

                

            </div>
        </Fragment>
    )
}

export default DataScience
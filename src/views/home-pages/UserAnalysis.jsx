import React,{Fragment} from 'react';
import {Helmet} from 'react-helmet';


import TopNavFour from '../../components/header/TopNavFour';
import HeroBannerFive from '../../components/hero-banner/HeroBannerFive';
import FancyFeatureSeventeen from '../../components/feature/FancyFeatureSeventeen';
import About from '../../components/about/About';
import FancyFeatureNineteen from '../../components/feature/FancyFeatureNineteen';
import CounterOne from '../../components/counter/CounterOne';
import DataScience from './DataScience';
import Contact from '../../components/contact/Contact';
import FooterFour from '../../components/footer/FooterFour';
import CopyRightFour from '../../components/footer/CopyRightFour';



const UserAnalysis = () => {
    return (
        <Fragment>
            <div className="main-page-wrapper">
                <Helmet>
                    <title>User Analysis || Sinco - Data Science & Analytics React Template</title>
                </Helmet>
                {/* helmet end */}

                <TopNavFour/>
                {/* theme-menu-four */}

                <HeroBannerFive/> 
                {/* {Herobanner End} */}


                <div className="fancy-feature-seventeen position-relative mt-160 xl-mt-50">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-5" data-aos="fade-right">
                                <div className="title-style-three text-center text-lg-start">
                                    <h2 className="main-title">
                                        <span>探索</span> 我們的<br></br>核心技術和實際應用。</h2>
                                </div>
                                {/* /.title-style-three */}
                            </div>
                            <div className="col-xl-6 col-lg-7" data-aos="fade-left">
                                {/* <p className="m0 text-center text-lg-start md-pt-30">NLP entails applying
                                    algorithms to identify and extract rules such that the unstructured language
                                    data is converted.</p> */}
                            </div>
                        </div>
                        <FancyFeatureSeventeen/>
                    </div>
                    {/* /.container */}
                    <div className="shapes shape-one"/>
                </div>
                {/* /.fancy-feature-seventeen */}

                <About/> {/* /.fancy-feature-eighteen */}

                <div className="fancy-feature-nineteen position-relative pt-130 lg-pt-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-5 col-lg-6 col-md-7">
                                <FancyFeatureNineteen />
                                {/* /.block-style-thirteen */}
                            </div>
                        </div>
                    </div>
                    {/* /.container */}
                    <div className="illustration-holder" data-aos="fade-left">
                        <img src="images/assets/ils_15.svg" alt="" className="w-100 main-illustration"/>
                        <img src="images/assets/ils_15_1.svg" alt="" className="shapes shape-one"/>
                        <img src="images/assets/ils_15_2.svg" alt="" className="shapes shape-two"/>
                        <img src="images/assets/ils_15_3.svg" alt="" className="shapes shape-three"/>
                        <img src="images/assets/ils_15_4.svg" alt="" className="shapes shape-four"/>
                        <img
                            src="images/assets/ils_15_5.svg"
                            alt=""
                            className="shapes shape-five"
                            data-aos="fade-down"
                            data-aos-delay={200}
                            data-aos-duration={2000}/>
                        <img
                            src="images/assets/ils_15_6.svg"
                            alt=""
                            className="shapes shape-six"
                            data-aos="fade-down"
                            data-aos-delay={100}
                            data-aos-duration={2000}/>
                        <img
                            src="images/assets/ils_15_7.svg"
                            alt=""
                            className="shapes shape-seven"
                            data-aos="fade-down"
                            data-aos-duration={2000}/>
                    </div>
                    {/* /.illustration-holder */}
                    <div className="shapes oval-one"/>
                    <div className="shapes oval-two"/>
                    {/* <img src="images/shape/shape_35.svg" alt="" className="shapes bg-shape"/> */}
                </div>
                {/* /.fancy-feature-nineteen */}

                <CounterOne/> 
                <DataScience />

                

                <Contact/> {/* /.Fancy Feature 21 end */}

                

                <div className="footer-style-four theme-basic-footer mt-100">
                    <div className="container">
                        <div className="inner-wrapper">

                            <FooterFour/> {/* /.FooterFour End */}

                            <div className="bottom-footer">
                                <CopyRightFour/>
                            </div>
                        </div>
                        {/* /.inner-wrapper */}
                    </div>
                </div>
                {/* /.footer-style-four */}

            </div>
        </Fragment>
    )
}

export default UserAnalysis
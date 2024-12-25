import React,{Fragment} from 'react';
import {Helmet} from 'react-helmet';
import TopNav from '../components/header/TopNav';
import HeroBanner from '../components/pages/HeroBanner';
import Explore from '../components/pages/Explore';
import Analysis from '../components/pages/Analysis';
import HowWorks from '../components/pages/HowWorks';
import CounterOne from '../components/pages/CounterOne';
import MultiPlatform from '../components/pages/MultiPlatform';
import Contact from '../components/pages/Contact';
import Footer from '../components/footer/Footer';

const UserAnalysis = () => {
    return (
        <Fragment>
            <div className="main-page-wrapper">
                <Helmet>
                    <title>TOP X</title>
                </Helmet>
                <TopNav/>
                <HeroBanner/> 
                <div className="fancy-feature-seventeen position-relative mt-160 xl-mt-50">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-5" data-aos="fade-right">
                                <div className="title-style-three text-lg-start">
                                    <h2 className="main-title">
                                        <span>探索</span> 我們的<br></br>核心技術和實際應用。</h2>
                                </div>
                            </div>
                        </div>
                        <Explore/>
                    </div>
                    <div className="shapes shape-one"/>
                </div>

                <Analysis/>

                <div className="fancy-feature-nineteen position-relative pt-130 lg-pt-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-5 col-lg-6 col-md-7">
                                <HowWorks />
                            </div>
                        </div>
                    </div>
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
                    <div className="shapes oval-one"/>
                    <div className="shapes oval-two"/>
                </div>

                <CounterOne/> 
                <MultiPlatform />
                <Contact/>

                <div className="footer-style-four theme-basic-footer mt-200 lg-mt-100">
                    <div className="container">
                        <div className="inner-wrapper">

                            <div className="bottom-footer">
                                <Footer/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UserAnalysis
import React,{Fragment} from 'react';
import {Helmet} from 'react-helmet';
import TopNav from '../../components/header/TopNav';
import HeroBanner from '../../components/hero-banner/HeroBanner';
import FancyFeatureSeventeen from '../../components/feature/FancyFeatureSeventeen';
import About from '../../components/about/About';
import FancyFeatureNineteen from '../../components/feature/FancyFeatureNineteen';
import CounterOne from '../../components/counter/CounterOne';
import DataScience from './DataScience';
import Contact from '../../components/contact/Contact';
import CopyRightFour from '../../components/footer/CopyRightFour';

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
                        <FancyFeatureSeventeen/>
                    </div>
                    <div className="shapes shape-one"/>
                </div>

                <About/>

                <div className="fancy-feature-nineteen position-relative pt-130 lg-pt-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-5 col-lg-6 col-md-7">
                                <FancyFeatureNineteen />
                            </div>
                        </div>
                    </div>
                    
                </div>
                {/* /.fancy-feature-nineteen */}

                <CounterOne/> 
                <DataScience />
                <Contact/> {/* /.Fancy Feature 21 end */}

                <div className="footer-style-four theme-basic-footer mt-200 lg-mt-100">
                    <div className="container">
                        <div className="inner-wrapper">

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
import React, {Fragment} from 'react';
import PortfolioGallery from '../../components/portfolio/PortfolioGallery'

const DataScience = () => {
    return (
        <Fragment>
            <div className="main-page-wrapper" id='raceRecords'>
                
                <div className="portfolio-gallery-one mt-150 lg-mt-110" data-aos="fade-up">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5 col-md-7 col-sm-8">
                                <div className="title-style-one text-sm-start xs-pb-20">
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
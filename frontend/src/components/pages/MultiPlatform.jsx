import React, { Fragment } from "react";
import PortfolioGallery from "./PortfolioGallery";
import { useTranslation } from "react-i18next";

const MultiPlatform = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="main-page-wrapper" id="raceRecords">
        <div
          className="portfolio-gallery-one mt-150 lg-mt-110"
          data-aos="fade-up"
        >
          <div className="container">
            <div className="row align-items-center mb-50">
              <div className="col-lg-5 col-md-7 col-sm-8">
                <div className="title-style-one text-sm-start xs-pb-20">
                  <h2 className="main-title">
                    <span>{t("多平台")}</span>
                    {t("公開分析紀錄")}
                    <br></br>
                    {t("實力見證效果")}
                  </h2>
                </div>
              </div>
            </div>
            <div className="slider-wrapper">
              <PortfolioGallery />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MultiPlatform;

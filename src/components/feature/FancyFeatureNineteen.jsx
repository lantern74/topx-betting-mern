import React, {Fragment} from 'react'

const ProcessContent = [
    {
        num: 1,
        className: 'numb tran3s',
        heading: '聚焦核心賽事',
        desc: '選擇您感興趣的賽事，我們的 AI 系統將開始分析賽事趨勢。',
        dataDelay: ''
    }, {
        num: 2,
        className: 'numb tran3s',
        heading: '數據蒐集',
        desc: '調用 FOOTBALL API 數據，結合 23,835 支球隊的歷史表現和當前狀態進行深入分析。',
        dataDelay: '50'
    }, {
        num: 3,
        className: 'numb tran3s',
        heading: '處理數據',
        desc: '生成準確的分析報告，推薦最佳投注方向。',
        dataDelay: '100'
    }
]

const FancyFeatureNineteen = () => {
    return (
        <Fragment>
            <div className="block-style-thirteen" data-aos="fade-right">
                <div className="title-style-three pb-15">
                    <div className="sc-title">WORK PROCESS</div>
                    <h2 className="main-title"><span>TOP X</span> 的運作原理</h2>
                </div>
                {/* /.title-style-three */}
                <ul className="style-none list-item">
                    {ProcessContent.map((val, i) => (
                        <li key={i} data-aos="fade-up" data-aos-delay={val.dataDelay}>
                            <div className={val.className}>{val.num}</div>
                            <h6>{val.heading}</h6>
                            <span>{val.desc}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* /.block-style-thirteen */}
        </Fragment>
    )
}

export default FancyFeatureNineteen
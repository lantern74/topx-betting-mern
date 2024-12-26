import React,{Fragment} from 'react'
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const CountContent = [
    {
        mark: '',
        num: 200,
        text: 'K',
        desc: '節省分析時間：20 萬小時+',
    },
    {
        mark: '',
        num: 83.88,
        text: '%',
        desc: '平均準確率：83.88%',
    },
    {
        mark: '',
        num: 100,
        text: 'K',
        desc: '幫助用戶提升收益：$10 萬+',
    }
]

const CommonCounter = () => {
    return ( 
    <Fragment> 
        <div className="row justify-content-center">
            {CountContent.map((val, i)=>(
                <div
                key={i}
                className="col-md-4 col-sm-6"
                data-aos="fade-up"
                data-aos-delay={val.dataDelay}>
                <div className="counter-block-one text-center mb-20">
                    <div className="main-count">
                        <span className="counter">{val.mark}
                            <CountUp start={0} end={val.num} duration={1}>
                                {({countUpRef, start}) => (
                                    <VisibilitySensor onChange={start}>
                                        <span ref={countUpRef}/>
                                    </VisibilitySensor>
                                )}
                            </CountUp>
                        </span>{val.text}</div>
                    <p>{val.desc}</p>
                </div>
            </div>
            ))}
        </div> 
    </Fragment>

    )}

export default CommonCounter
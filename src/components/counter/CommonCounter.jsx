import React,{Fragment} from 'react'
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const CountContent = [
    {
        mark: '',
        num: 20,
        text: 'mil',
        desc: '節省分析時間：20 萬小時+',
        // desc2: 'with help of AI',
    },
    {
        mark: '',
        num: 83.88,
        text: '%',
        desc: '平均準確率：83.88%',
        // desc2: 'AI Solutions',
    },
    {
        mark: '$',
        num: 10,
        text: 'mil+',
        desc: '幫助用戶提升收益：$10 萬+',
        // desc2: 'due to AI',
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
                    <p>{val.desc} <br/>{val.desc2}</p>
                </div>
            </div>
            ))}
        </div> 
    </Fragment>

    )}

export default CommonCounter
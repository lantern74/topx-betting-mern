import React, {Fragment} from 'react'

const Footer = () => {
    return (
        <Fragment>
            <div className="d-lg-flex justify-content-center align-items-center">
                <p className="copyright text-center order-lg-0 pb-15">Copyright @{new Date().getFullYear()}{" "}
                    TOP X</p>
            </div>
        </Fragment>
    )
}

export default Footer
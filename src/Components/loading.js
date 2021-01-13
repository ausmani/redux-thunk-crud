import React from 'react';
import './../Css/loader.css';

const Loading = () => {

    return (
        <div className="wrap">
            <div className="loading">
                <div className="bounceball"></div>
                <div className="text">NOW LOADING</div>
            </div>
        </div>
    )
}

export default Loading;
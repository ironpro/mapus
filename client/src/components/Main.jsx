import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';

const Main = ({props}) => {
    return <div className="">

        <Link to="/map">
           <div className="mt-5 ml-5">
               <h2> Go to map</h2>
           </div>
        </Link>
        <Link to="/client">
           <div className="mt-5 ml-5">
               <h2> Go to client </h2>
           </div>
        </Link>

    </div>
}

export default Main ; 
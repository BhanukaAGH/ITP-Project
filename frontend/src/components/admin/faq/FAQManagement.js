import React from 'react'
import FAQPage from './components/FAQPage';

import { useLocation } from "react-router";

//Sub Pages



const FAQManagement = () => {

    let subpath = useLocation();
    let pathName = subpath.pathname;
    

    return (
        <div>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>FAQ Managment</h1>
      </div>
      
      <section>
            <FAQPage/>
        </section>

    </div>
    )
}

export default FAQManagement

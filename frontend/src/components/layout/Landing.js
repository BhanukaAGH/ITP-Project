import React, {Fragment, useState, useEffect} from 'react'
import Navbar from './Navbar'
import Cart from './cart/Cart'
import Section from './productSection/Section'
import Slider from './Slider'
import Footer from './Footer'
import Boxes from './Boxes'
import Spinner from './Spinner'
import Advertisments from './Advertisments'

// redux
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllProducts} from '../../actions/products'
import {getAllAdvertisments} from '../../actions/advertisments'

const Landing = ({
                     products: {products, loading},
                     advertisments: {adds, loadingadds},
                     getAllProducts,
                     getAllAdvertisments,
                 }) => {
    const categories = [...new Set(products.map((product) => product.category))]

    useEffect(() => {
        getAllProducts()
        getAllAdvertisments()
    }, [loading])

    return (
        <Fragment>
            <Navbar/>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    <Slider/>
                    <Cart/>

                    {categories.map((category, index) => (
                        <Section key={index} category={category} products={products}/>
                    ))}
                    <div className='container advertismentsection'>
                        {adds.map((add, index) => (
                            <Advertisments key={index} add={add}/>
                        ))}
                    </div>
                    <Boxes/>
                </>
            )}
            <Footer/>
        </Fragment>
    )
}

Landing.propTypes = {
    getAllProducts: PropTypes.func.isRequired,
    getAllAdvertisments: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    products: state.products,
    advertisments: state.advertisments,
})

export default connect(mapStateToProps, {
    getAllProducts,
    getAllAdvertisments,
})(Landing)

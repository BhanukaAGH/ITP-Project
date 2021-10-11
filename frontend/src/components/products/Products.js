import React, { Component, Fragment } from 'react'
import Navbar from '../layout/Navbar'
import Cart from '../layout/Cart'
import Boxes from '../layout/Boxes'
import Footer from '../layout/Footer'
import SideBar from './SideBar'
import Content from './Content'
import { Alert, Spin } from 'antd'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      order: 'asc',
      range: {
        from: 0,
        to: 0,
      },
      loading: false,
      products: [],
      error: false,
    }
  }

  onChange = (value) => {
    this.setState(value, () => {
      this.getData()
    })
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.setState({ loading: true, error: false })
    fetch('/api/store/get-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projection: {
          categories: this.state.categories,
          order: this.state.order,
          range: this.state.range,
        },
      }),
    })

    // response from backend(product)
      .then((response) => {
        this.setState({ loading: false })
        if (response.status !== 200) {
          throw new Error(response.statusText.toString())
        }
        return response.json()
      })
      .then((data) => {
        this.setState({ products: data, error: data.length === 0 })
      })
      .catch(() => {
        this.setState({ loading: false, error: true })
      })
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <Cart />

        {/* product page body and side bar (CUSTOMER SIDE) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignContent: 'stretch',
          }}
        >

          {/* sidebar */}
          <div
            style={{
              width: '240px',
              flex: '0 0 240px',
              borderRight: '1px solid lightgray',
            }}
          >
            <SideBar onChange={this.onChange} />
          </div>


           {/* card view  */}
          <div className='mx-0 px-0' style={{ width: 'calc(100% - 240px)' }}>
            <Spin
              size='large'
              tip='Loading...'

              // when loding is true, then run that part
              spinning={this.state.loading}
              style={{ minHeight: '200px' }}
            >

              {/* Tht part is loding when loding part is false in the spin */}
              <Content products={this.state.products} />
            </Spin>
            {this.state.error ? (
              <Alert
                className='mx-3'
                type='warning'
                message='No products found..!'
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <Footer />
      </Fragment>
    )
  }
}

Products.propTypes = {}

export default Products

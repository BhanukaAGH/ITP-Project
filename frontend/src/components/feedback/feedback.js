import React, {Fragment} from 'react';
import {Provider} from "react-redux";
import PostMessages from "./post-messages";
import {store} from "../../actions/store";
import {Typography} from "@material-ui/core";
import ButterToast, {POS_RIGHT, POS_TOP} from "butter-toast";
import ItemDetails from "./item-details";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Cart from "../layout/Cart";
import {Alert, Spin} from "antd";


export default class Feedback extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productID: '',
      productDetails: {},
      loading: false,
      error: false
    }
  }

  componentDidMount() {
    const route = window.location.href.split('/');
    this.setState({productID: route[route.length - 1]}, () => {
      this.getProductDetails(this.state.productID);
    });
  }

  getProductDetails = (productID) => {
    this.setState({activeKey: '1', loading: true, productDetails: {}, error: false})
    fetch('/api/store/get-product-details', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({productID}),
    })
      .then((response) => {
        this.setState({loading: false})
        if (response.status !== 200) {
          throw new Error(response.statusText.toString())
        }
        return response.json()
      })
      .then((data) => {
        this.setState({productDetails: data});
        console.log(this.state.productDetails);
      })
      .catch(() => {
        this.setState({loading: false, error: true});
      })
  }

  render() {
    return (
      (!this.state.loading || !this.state.error) ? <div>
        <Spin size='large' tip='Loading...' spinning={this.state.loading} style={{minHeight: '200px'}}>
          <Navbar/>
          <Cart/>
          <ItemDetails productDetails={this.state.productDetails}/>
          <PostMessages _id={this.state.productDetails._id}/>
          <Footer/>
        </Spin>
      </div> : <Alert type="error" message={"Something went wrong..!"} />
    );
  }

}

import React from 'react'
import {Spin, Tabs, message} from 'antd'

import Product from './store/Products'
import AllProducts from './store/AllProducts'

class Store extends React.Component {

  formRef = React.createRef();

  constructor(props) {
    super(props)
    this.state = {
      activeKey: '2',
      loading: false,
      productDetails: {},
      allProducts: [],
      images: [],
      reportProgress: false
    }
  }

  onTabChange = (activeKey) => {
    this.setState({activeKey})
  }

  //
  search = (searchKey) => {
    this.setState({loading: true, allProducts: []});
    fetch('/api/store/search-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({searchKey})
    }).then(response => {
      this.setState({loading: false});
      if (response.status !== 200) {
        throw new Error(response.statusText.toString())
      }
      return response.json();
    }).then(data => {
      data = data.map(product => {
        product.images = [product.images];
        return product;
      });
      this.setState({allProducts: data})
    }).catch(error => {
      this.setState({loading: false, error: true});
    });
  }


  //refill amount
  refill = (amount, productID) => {
    this.setState({loading: true})
    fetch('/api/store/refill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({productID, amount}),
    })
      .then((response) => {
        this.setState({loading: false})
        if (response.status !== 200) {
          throw new Error(response.statusText.toString())
        }
        return response.json()
      })
      .then(() => {
        const products = this.state.allProducts;
        const product = products.find(item => item._id === productID);
        product.available = parseInt(product.available, 10) + parseInt(amount);
        this.setState({allProducts: products});
        message.success({
          content: 'Amount added successfully..!',
          style: {
            marginTop: '90vh',
          },
        })
      })
      .catch(() => {
        this.setState({loading: false})
        message.error({
          content: 'An error occurred while updating..!',
          style: {
            marginTop: '90vh',
          },
        })
      })
  }

  //Generate report
  generateReport = () => {
    this.setState({reportProgress: true})
    fetch('/api/store/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        this.setState({reportProgress: false});
        if (response.status !== 200) {
          throw new Error(response.statusText.toString())
        }
        return response.json()
      })
      .then(data => {
        const report = [];
        data.forEach(item => {
          const temp = {
            ID: item._id,
            Category: item.category,
            Brand: item.brand,
            Model: item.model,
            "Unit Price": item.price
          }
          item.refills.forEach(refill => {
            temp.Date = new Date(refill.date).toLocaleString("en-US");
            temp.Amount = refill.amount;
            temp.Price = parseInt(refill.amount) * parseInt(item.price);
            report.push(Object.assign({}, temp));
          });
        });
        let total_items = 0, total_cost = 0
        report.forEach(item => {
          total_items += parseInt(item.Amount);
          total_cost += parseInt(item.Amount) * parseInt(item["Unit Price"]);
          console.log(total_items, parseInt(item.Amount), item["Unit Price"], total_cost);
        });
        report.push({
          ID: '',
          Category: '',
          Brand: '',
          Model: '',
          "Unit Price": '',
          Date: '',
          Amount: total_items,
          Price: total_cost
        });
        report.sort((a, b) => a.Date < b.Date ? 1 : -1);
        this.JSONToTSVConvertor(report, 'Store Report', true);
        message.success({
          content: 'Report Generated successfully..!',
          style: {
            marginTop: '90vh',
          },
        })
      })
      .catch(() => {
        this.setState({reportProgress: false});
        message.error({
          content: 'Error generating the report..!',
          style: {
            marginTop: '90vh',
          },
        })
      })
  }

  JSONToTSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
    let index;
    let row;
    const arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    let CSV = '';
    CSV += ReportTitle + '\r\n\n';
    if (ShowLabel) {
      row = "";
      for (index in arrData[0]) {
        row += index + ',';
      }
      row = row.slice(0, -1);
      CSV += row + '\r\n';
    }

    for (let i = 0; i < arrData.length; i++) {
      row = "";
      for (index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }
      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }

    if (CSV === '') {
      alert("Invalid data");
      return;
    }

    let fileName = "Report_";
    fileName += ReportTitle.replace(/ /g, "_");

    const uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    const link = document.createElement("a");
    link.href = uri;

    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  showProductDetails = (productID) => {
    this.setState({activeKey: '1', loading: true, productDetails: {}})
    fetch('/api/store/get-product-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
        this.setState({productDetails: data}, () => {
          this.formRef.current.setFieldsValue(this.state.productDetails);
        })
      })
      .catch(() => {
        this.setState({loading: false})
      })
  }

  showAllProducts = () => {
    this.setState({activeKey: '2'})
    this.getAllProducts()
  }

  getAllProducts = () => {
    this.setState({loading: true, allProducts: []})
    fetch('/api/store/get-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        this.setState({loading: false})
        if (response.status !== 200) {
          throw new Error(response.statusText.toString())
        }
        return response.json()
      })
      .then((data) => {
        this.setState({allProducts: data})
      })
      .catch(() => {
        this.setState({loading: false})
      })
  }

  deleteProduct = (productID) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      this.setState({loading: true})
      fetch('/api/store/delete-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
          message.success({
            content: 'Product deleted successfully..!',
            style: {
              marginTop: '90vh',
            },
          })
          this.getAllProducts()
        })
        .catch(() => {
          message.error({
            content: 'Error deleting the product..!',
            style: {
              marginTop: '90vh',
            },
          })
          this.setState({loading: false})
        })
    }
  }

  deleteImage = (image) => {
    const productDetails = this.state.productDetails;
    productDetails.images.splice(productDetails.images.indexOf(image), 1);
    this.setState({productDetails});
  }

  deleteProductDetails = () => {
    this.setState({productDetails: {}});
  }

  addImage = (image) => {
    let productDetails = {
      images: []
    }
    if (Object.keys(this.state.productDetails).length !== 0) {
      productDetails = this.state.productDetails;
    }
    productDetails.images.push(image);
    this.setState({productDetails});
  }

  updateProductDetails = (details) => {
    this.setState({productDetails: details});
  }

  componentDidMount() {
    this.getAllProducts()
  }

  render() {
    return (
      <div>
        <div
          className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
          <h1 className='h2'>Store Management</h1>
        </div>

        <Tabs activeKey={this.state.activeKey} onChange={this.onTabChange}>
          <Tabs.TabPane tab='Add Product' key='1'>
            <Spin
              size='large'
              tip='Loading...'
              spinning={this.state.loading}
              style={{minHeight: '200px'}}
            >
              <Product
                changeTab={this.showAllProducts}
                productDetails={this.state.productDetails}
                deleteImage={this.deleteImage}
                deleteProductDetails={this.deleteProductDetails}
                addImage={this.addImage}
                formRef={this.formRef}
              />
            </Spin>
          </Tabs.TabPane>

          <Tabs.TabPane tab='View Products' key='2'>
            <Spin
              size='large'
              tip='Loading...'
              spinning={this.state.loading}
              style={{minHeight: '200px'}}
            >
              <AllProducts
                search={this.search}
                changeTab={this.showProductDetails}
                products={this.state.allProducts}
                deteleProduct={this.deleteProduct}
                refill={this.refill}
                generateReport={this.generateReport}
                reportProgress={this.state.reportProgress}
              />
            </Spin>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Store

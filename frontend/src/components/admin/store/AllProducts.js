import React, {Fragment, useState} from 'react';
import {Button, Popover, Spin, Table} from "antd";
import Search from "antd/es/input/Search";

import {LoadingOutlined} from "@ant-design/icons";

const AllProducts = (props) => {

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: images => (<img src={images && images[0]} alt="Product"
                              style={{width: '50px', height: '50px', overflow: 'hidden', objectFit: 'cover'}}/>)
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => (category.substring(0, 1).toUpperCase() + category.substring(1))
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model'
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      render: weight => (<span>{weight.value} {weight.unit}</span>)
    },
    {
      title: 'Dimensions',
      dataIndex: 'dimensions',
      key: 'dimensions',
      render: dimesions => (<span>{dimesions.width}x{dimesions.height}x{dimesions.length} {dimesions.unit}</span>)
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Options',
      dataIndex: 'options',
      key: 'options',
      width: '285px',
      render: (text, record) => (
        <Fragment>
          <button className='btn btn-primary' onClick={() => editProduct(record._id)}><i className='fas fa-edit'></i> Edit</button>
          <button className='btn btn-danger mx-1' onClick={() => deleteProduct(record._id)}><i className='far fa-trash-alt'></i> Delete</button>
          <Popover
            content={
              <Search
                placeholder="Enter the amount to be added."
                enterButton="Add"
                size="large"
                onSearch={(amount) => props.refill(amount, record._id)}
              />
            }
            title="Amount to be added"
            trigger="click"
          >
            <button className="btn btn-secondary"><i className='fa fa-plus'></i> Refill</button>
          </Popover>
        </Fragment>
      )
    }
  ];

  const deleteProduct = (productID) => {
    props.deteleProduct(productID);
  }

  const editProduct = (productID) => {
    props.changeTab(productID);
  }

  return (
    <Fragment>

      <div className="row mx-0 px-0 d-flex justify-content-between">

        <button className="btn btn-success m-1" style={{width: '200px'}} type="button" onClick={props.generateReport}>
          Generate Report&nbsp;&nbsp;{props.reportProgress ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />: <></>}
        </button>

        <div className="col-4 mx-0 px-0">
          <Search className="w-100" onSearch={props.search}/>
        </div>

      </div>

      <Table columns={columns} dataSource={props.products}/>

    </Fragment>
  );

}

export default AllProducts;

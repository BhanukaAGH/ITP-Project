import React, { Fragment } from 'react'
import { Button, Table } from 'antd'


import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const AllProducts = (props) => {
  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <img
          src={images && images[0]}
          alt='Product'
          style={{
            width: '50px',
            height: '50px',
            overflow: 'hidden',
            objectFit: 'cover',
          }}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'category',
      key: 'category',
      render: (category) =>
        category.substring(0, 1).toUpperCase() + category.substring(1),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Options',
      dataIndex: 'options',
      key: 'options',
      render: (text, record) => (
        <Fragment>
          {/* <EditOutlined
            style={{ color: 'blue' }}
            onClick={() => editProduct(record._id)}
          />
          <DeleteOutlined
            style={{ color: 'red', marginLeft: '20px' }}
            onClick={() => deleteProduct(record._id)}
          /> */}

          <button className='btn btn-primary' onClick={() => editProduct(record._id)}><i className='fas fa-edit'></i> Edit</button>
          <button className='btn btn-danger mx-1' onClick={() => deleteProduct(record._id)}><i className='far fa-trash-alt'></i> Delete</button>

        </Fragment>
      ),
    },
  ]

  const deleteProduct = (productID) => {
    props.deteleProduct(productID)
  }

  const editProduct = (productID) => {
    props.changeTab(productID)
  }

  return (
    <Fragment>
      
      <Table columns={columns} dataSource={props.products} />
    </Fragment>
  )
}

export default AllProducts

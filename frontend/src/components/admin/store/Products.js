import React, {Fragment, useState} from 'react'
import {
  Image,
  Form,
  Input,
  Select,
  Button,
  Alert, message,
} from 'antd'
import Title from 'antd/es/typography/Title'
import {LoadingOutlined, CloseOutlined} from '@ant-design/icons'

import FallbackImage from '../../../img/fallback-image.png'

const Option = {Select}

const Products = (props) => {
  const {changeTab, productDetails} = props

  const initialValue = {
    category: '',
    brand: '',
    model: '',
    available: '',
    weight: {
      value: '',
      unit: 'g',
    },
    dimensions: {
      width: '',
      height: '',
      length: '',
      unit: 'mm',
    },
    description: '',
    price: '',
  }

  const [image, setImage] = useState('')
  const [imageError, setImageError] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [progress, setProgress] = useState(false)

  const submitForm = (value) => {
    setImageError(false);
    if (productDetails.images.length !== 0) {
      setError('')
      setSuccess(false)
      setProgress(true)
      fetch('/api/store/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productID: productDetails._id,
          productDetails: value,
          images: productDetails.images,
        }),
      })
        .then((response) => {
          setProgress(false)
          if (response.status !== 200) {
            throw new Error(response.statusText.toString())
          }
          return response.json()
        })
        // edit msg
        .then(() => {
          setSuccess(true)
          setImage('');
          props.formRef.current.setFieldsValue(initialValue);
          props.deleteProductDetails();
          changeTab()
          message.success({
            content: 'Product saved successfully..!',
            style: {
              marginTop: '90vh',
            },
          })
        })
        .catch(() => {
          setError('Error saving data')
        })
    } else {
      setImageError(true)
    }
  }

  const readFiles = (files) => {
    const fileList = Object.assign([], files.target.files);
    document.getElementById('image_upload').value = '';
    console.log(fileList);
    for (let i = 0; i < fileList.length; i++) {
      getBase64(fileList[i], (base64) => {
        props.addImage(base64);
      });
    }
  }

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function () {
      cb('');
    };
  }

  const resetForm = () => {
    props.formRef.current.setFieldsValue({});
    props.deleteProductDetails();
  }

  //related image in add product page
  return (
    <Fragment>
      <Title level={3}>Add New Products</Title>

      <div className='row mx-0 px-0'>
        <div className='col-lg-4 mx-0 px-0'>
          <h6>
            Upload Images<span className='text-danger'>*</span>
          </h6>
          <div className='row mx-0 px-0 my-2'>
            <ImagePreview image={productDetails.images && productDetails.images[0] && !image ? productDetails.images[0] : image }/>
          </div>
          <div className='row mx-0 px-0 my-2 d-flex justify-content-start'>
            <div className='row mx-0 px-2'>
              {
                productDetails.images ? productDetails.images.map(image =>
                  <div className='col-md-3 border rounded' style={{width: '103px', height: '103px', margin: '4px'}}>
                    <CloseOutlined style={{position: 'absolute', marginTop: '10px', cursor: "pointer"}}
                                   onClick={() => {setImage(''); props.deleteImage(image)}}/>
                    <img src={image} alt="Image"
                         style={{width: '100%', height: '100%', overflow: 'hidden', objectFit: 'cover',}}
                         onClick={() => setImage(image)}/>
                  </div>
                ) : <></>
              }
              <input className="d-none" id="image_upload" type="file" multiple accept="image/jpeg"
                     onChange={readFiles}/>
              <div className='col-md-3 border rounded hove image-upload'
                   style={{width: '103px', height: '103px', margin: '4px', cursor: "pointer"}} onClick={() => {
                document.getElementById("image_upload").click()
              }}>
              </div>
            </div>
          </div>
          <div className='row mx-1 px-2 my-2'>
            {imageError ? (
              <Alert message='Image is required!!!.Please add a image...' type='error'/>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className='col-lg-8 mx-0 px-0 d-flex justify-content-start'>
          <ProductForm
            onSubmit={submitForm}
            formRef={props.formRef}
            initialValue={initialValue}
            _id={productDetails._id}
            error={error}
            success={success}
            progress={progress}
            resetForm={resetForm}
          />
        </div>
      </div>
    </Fragment>
  )
}

const ImagePreview = (props) => {
  const image = props.image
  return (
    <Image
      style={{objectFit: 'cover', width: '100%', aspectRatio: '1'}}
      src={image}
      fallback={FallbackImage}
    />
  )
}

const ProductForm = (props) => {
  const {initialValue, onSubmit, error, progress, formRef, resetForm, _id} = props

  const demo = () => {
    resetForm();
    formRef.current.setFieldsValue({
      category: 'mobile',
      brand: 'Samsung',
      model: 'S2 16GB 3.5"',
      available: 10,
      weight: {
        value: 100,
        unit: 'g'
      },
      dimensions: {
        width: 10,
        height: 150,
        length: 100,
        unit: 'mm'
      },
      description: 'This is a mobile phone.',
      price: 15000
    })
  }

  return (
    <Form
      layout='vertical'
      name='productForm'
      ref={formRef}
      initialValues={initialValue}
      onFinish={onSubmit}
      autoComplete='off'
      style={{width: '100%', margin: '20px'}}
    >
      <Form.Item
        name='category'
        label='Category'
        rules={[{required: true, message: 'This filed is required.'}]}
      >
        <Select placeholder='Select a category'>
          <Option value='Mobile'>Smart Phone</Option>
          <Option value='Television'>Television</Option>
          <Option value='Laptop'>Laptop</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='brand'
        label='Brand'
        rules={[{required: true, message: 'This filed is required.'}]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name='model'
        label='Model'
        rules={[{required: true, message: 'This filed is required.'}]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name='available'
        label='Available Amount'
        rules={[{required: true, message: 'This filed is required.'}]}
      >
        <Input type='number' disabled={_id}/>
      </Form.Item>

      <Form.Item label='Weight' style={{marginBottom: 0}}>
        <Input.Group>
          <Form.Item
            style={{display: 'inline-block', width: 'calc(100% - 80px)'}}
            name={['weight', 'value']}
          >
            <Input type='number'/>
          </Form.Item>

          <Form.Item
            style={{display: 'inline-block'}}
            name={['weight', 'unit']}
          >
            <Select style={{width: '70px', marginLeft: '10px'}}>
              <Option value='kg'>kg</Option>
              <Option value='g'>g</Option>
            </Select>
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item label='Dimensions' style={{marginBottom: '0'}}>
        <Input.Group>
          <Form.Item
            name={['dimensions', 'width']}
            style={{display: 'inline-block', width: 'calc(32.5% - 32px)'}}
          >
            <Input placeholder='Width' type='number'/>
          </Form.Item>

          <span
            style={{
              display: 'inline-block',
              width: '16px',
              lineHeight: '32px',
              textAlign: 'center',
            }}
          >
            x
          </span>

          <Form.Item
            name={['dimensions', 'height']}
            style={{display: 'inline-block', width: 'calc(32.5% - 32px)'}}
          >
            <Input placeholder='Height' type='number'/>
          </Form.Item>

          <span
            style={{
              display: 'inline-block',
              width: '16px',
              lineHeight: '32px',
              textAlign: 'center',
            }}
          >
            x
          </span>

          <Form.Item
            name={['dimensions', 'length']}
            style={{display: 'inline-block', width: 'calc(32.5% - 32px)'}}
          >
            <Input placeholder='Length' type='number'/>
          </Form.Item>

          <Form.Item
            style={{display: 'inline-block'}}
            name={['dimensions', 'unit']}
          >
            <Select style={{width: 70, marginLeft: '10px'}}>
              <Option value='m' selected>
                m
              </Option>
              <Option value='mm'>mm</Option>
            </Select>
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item
        name='description'
        label='Description'
        rules={[{required: true, message: 'This filed is required.'}]}
      >
        <Input.TextArea placeholder='Enter product description'/>
      </Form.Item>

      <Form.Item
        name='price'
        label='Price'
        style={{marginBottom: '15px'}}
        rules={[{required: true, message: 'This filed is required.'}]}
      >
        <Input addonAfter={<span>$</span>} type='number'/>
      </Form.Item>

      <div className='mb-3'>
        {error ? <Alert type='error' message={error}/> : <></>}
      </div>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
        <Button
          className='mx-2'
          type='secondary'
          htmlType='reset'
          onClick={resetForm}
        >
          Reset
        </Button>
        <Button htmlType="button" type='primary' danger onClick={demo}>Demo</Button>
        {progress ? (
          <LoadingOutlined
            className="mx-2"
            style={{fontSize: '24px', marginLeft: '10px'}}
            spin
          />
        ) : (
          <></>
        )}
      </Form.Item>
    </Form>
  )
}

export default Products

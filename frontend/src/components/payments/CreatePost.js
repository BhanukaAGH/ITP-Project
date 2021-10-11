import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: '',
      Name: '',
      Address: '',
      city: '',
      zip: '',
      country: '',
      topicError: '',
      NameError: '',
      AddressError: '',
      cityError: '',
      zipError: '',
      countryError: '',
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target

    this.setState({
      ...this.state,
      [name]: value,
    })
  }

  validate = () => {
    let topicError = ''
    let NameError = ''
    let AddressError = ''
    let cityError = ''
    let zipError = ''
    let countryError = ''

    if (!this.state.topic) {
      topicError = 'Please Enter Validate Type!'
    }
    if (!this.state.Name) {
      NameError = 'Please Enter Proper Name!'
    }
    if (!this.state.Address) {
      AddressError = 'Please Enter Valid Address!'
    }
    if (!this.state.city) {
      cityError = 'Please Enter Valid City!'
    }
    if (!this.state.zip) {
      zipError = 'Please Enter Valid ZIP code!'
    }
    if (!this.state.country) {
      countryError = 'Please Enter Valid Country code!'
    }

    if (
      topicError ||
      NameError ||
      AddressError ||
      cityError ||
      zipError ||
      countryError
    ) {
      this.setState({ topicError })
      this.setState({ NameError })
      this.setState({ AddressError })
      this.setState({ cityError })
      this.setState({ zipError })
      this.setState({ countryError })
      return false
    }
    return true
  }

  onSubmit = (e) => {
    e.preventDefault()
    const isValidate = this.validate()
    if (isValidate) {
      const { topic, Name, Address, city, zip, country } = this.state
      const data = {
        topic: topic,
        Name: Name,
        Address: Address,
        city: city,
        zip: zip,
        country: country,
      }
      console.log(data)

      axios.post('/post/save', data).then((res) => {
        if (res.data.success) {
          swal({
            title: 'Confirm Your Details',
            text:
              '\n Topic :' +
              data.topic +
              '\n Name :' +
              data.Name +
              '\n Address :' +
              data.Address +
              '\n city :' +
              data.city +
              '\n zip :' +
              data.zip +
              '\n country :' +
              data.country,

            icon: 'warning',
            button: 'Purchace History',
          }).then(function () {
            window.location = '/paymentCard'
          })
          this.setState({
            topic: '',
            Name: '',
            Address: '',
            city: '',
            zip: '',
            country: '',
            topicError: '',
            NameError: '',
            AddressError: '',
            cityError: '',
            zipError: '',
            countryError: '',
          })
        }
      })
    }
  }
  render() {
    return (
      <div className='col-md-8 mt-4 mx-auto'>
        <h1 className='h3 mb-3 font-weight-nomal'>Create Billing Infomation</h1>
        <from className='needs-validation' noValidate>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <div class='form-group row'>
              <label class='col-4'>Payment Type</label>
              <div class='col-8'>
                <div class='custom-control custom-radio custom-control-inline'>
                  <input
                    name='topic'
                    id='radio_0'
                    type='radio'
                    class='custom-control-input'
                    value='Visa'
                    onChange={this.handleInputChange}
                  />
                  <label for='radio_0' class='custom-control-label'>
                    <div className='fs-4 align-middle'>
                      <i className='bi bi-credit-card fs-1 ps-4 pe-4'></i>
                      Visa
                    </div>
                  </label>
                </div>
                <br></br>
                <div class='custom-control custom-radio custom-control-inline'>
                  <input
                    name='topic'
                    id='radio_1'
                    type='radio'
                    class='custom-control-input'
                    value='Debit'
                    onChange={this.handleInputChange}
                  />
                  <label for='radio_1' class='custom-control-label'>
                    <div className='fs-4 align-middle'>
                      <i className='bi bi-cash-coin fs-1 ps-4 pe-4'></i>
                      Cash on Delivery
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.topicError}
            </div>
          </div>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Name</label>
            <input
              type='text'
              className='form-control'
              name='Name'
              placeholder='Enter Name'
              Value={this.state.Name}
              onChange={this.handleInputChange}
            />
            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.NameError}
            </div>
          </div>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Address</label>
            <input
              type='text'
              className='form-control'
              name='Address'
              placeholder='Enter Address'
              Value={this.state.Address}
              onChange={this.handleInputChange}
              required
            />
            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.AddressError}
            </div>
          </div>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>City</label>
            <input
              type='text'
              className='form-control'
              name='city'
              placeholder='Enter City'
              Value={this.state.city}
              onChange={this.handleInputChange}
              required
            />
            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.cityError}
            </div>
          </div>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Zip Code</label>
            <input
              type='number'
              className='form-control'
              name='zip'
              placeholder='Zip Code'
              Value={this.state.zip}
              onChange={this.handleInputChange}
              required
            />

            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.zipError}
            </div>
          </div>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Country</label>
            <input
              type='text'
              className='form-control'
              name='country'
              placeholder='Enter Country'
              Value={this.state.country}
              onChange={this.handleInputChange}
              required
            />
            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.zipError}
            </div>
          </div>
          <button
            className='btn btn-success'
            type='submit'
            style={{ marginBottom: '15px' }}
            onClick={this.onSubmit}
          >
            <i className='far fa-check-square'></i>&nbsp;SAVE
          </button>
        </from>
      </div>
    )
  }
}

export default CreatePost

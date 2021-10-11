import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

class adminCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      cardNo: '',
      expm: '',
      expy: '',
      csv: '',
      nameErorr: '',
      cardNoErorr: '',
      expmErorr: '',
      expyErorr: '',
      csvErorr: '',
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
    let nameErorr = ''
    let cardNoErorr = ''
    let expmErorr = ''
    let expyErorr = ''
    let csvErorr = ''
    const re = '^[0-9]{3}$'

    if (!this.state.name) {
      nameErorr = 'Please Enter Validate Name!'
    }
    if (!this.state.cardNo) {
      cardNoErorr = 'Please Enter Proper Name!'
    }
    if (!this.state.expm) {
      expmErorr = 'Please Enter Valid Expire Date!'
    }
    if (!this.state.expy) {
      expyErorr = 'Please Enter Valid Expire Year!'
    }
    if (!this.state.csv) {
      csvErorr = 'Please Enter Valid CSV code!'
    }

    if (nameErorr || cardNoErorr || expyErorr || csvErorr || expmErorr) {
      this.setState({ nameErorr })
      this.setState({ cardNoErorr })
      this.setState({ expyErorr })
      this.setState({ csvErorr })
      this.setState({ expmErorr })

      return false
    }
    return true
  }

  onSubmit = (e) => {
    e.preventDefault()
    const isValidate = this.validate()
    if (isValidate) {
      const { name, cardNo, expm, expy, csv } = this.state
      const data = {
        name: name,
        cardNo: cardNo,
        expm: expm,
        expy: expy,
        csv: csv,
      }
      console.log(data)

      axios.post('/adminRoute/save', data).then((res) => {
        if (res.data.success) {
          swal({
            title: 'Confirm Your Details',
            text:
              '\n Name :' +
              data.name +
              '\n cardNo :' +
              data.cardNo +
              '\n Expired Months  :' +
              data.expm +
              '\n Expired Year  :' +
              data.expy +
              '\n CSV :' +
              data.csv,

            icon: 'warning',
            button: 'Purchace History',
          }).then(function () {
            window.location = '/'
          })
          this.setState({
            name: '',
            cardNo: '',
            expm: '',
            expy: '',
            csv: '',
            nameErorr: '',
            cardNoErorr: '',
            expmErorr: '',
            expyErorr: '',
            csvErorr: '',
          })
        }
      })
    }
  }
  render() {
    return (
      <div className='col-md-8 mt-4 mx-auto'>
        <h1 className='h3 mb-3 font-weight-nomal'> Card Details</h1>
        <from className='needs-validation' noValidate>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Card Holder Name</label>
            <input
              type='text'
              className='form-control'
              name='name'
              placeholder='Card Holder Name'
              Value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.nameErorr}
            </div>
          </div>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>Card Number</label>
            <input
              type='number'
              className='form-control'
              name='cardNo'
              placeholder='Card Number'
              Value={this.state.cardNo}
              onChange={this.handleInputChange}
              required
            />
            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.cardNoErorr}
            </div>
          </div>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>EXP Months</label>
            <input
              type='month'
              className='form-control'
              name='expm'
              placeholder='EXP Months'
              Value={this.state.expm}
              onChange={this.handleInputChange}
              required
            />
            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.expmErorr}
            </div>
          </div>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>EXP Year</label>
            <input
              type='number'
              className='form-control'
              name='expy'
              placeholder='EXP Year'
              Value={this.state.expy}
              onChange={this.handleInputChange}
              required
            />
            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.expyErorr}
            </div>
          </div>
          <div className='form-group' style={{ marginBottom: '15px' }}>
            <label style={{ marginBottom: '5px' }}>CSV Number</label>
            <input
              type='number'
              className='form-control'
              name='csv'
              placeholder='CSV'
              Value={this.state.csv}
              onChange={this.handleInputChange}
              required
            />
            <div style={{ color: 'red', fontSize: 12 }}>
              {this.state.csvErorr}
            </div>
          </div>
          <button
            className='btn btn-success'
            type='submit'
            style={{ marginBottom: '15px' }}
            onClick={this.onSubmit}
          >
            <i className='far fa-check-square'></i>
            &nbsp;SAVE
          </button>
        </from>
      </div>
    )
  }
}

export default adminCard

import React, { useState, Fragment } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import './css.css'
import Multiselect from 'multiselect-react-dropdown'

import Footer from '../layout/Footer'
import imagep14 from '../../img/p14.gif'
import imagep2 from '../../img/p2.gif'
import imagep88 from '../../img/p88.gif'


export default function AddOrders({ editOrder, isEdit }) {
  var date = new Date(editOrder.orderdate)

  const [Cname, setname] = useState(isEdit ? editOrder.Cname : '')
  const [phone, setphone] = useState(isEdit ? editOrder.phone : '')
  const [email, setemail] = useState(isEdit ? editOrder.email : '')
  const [orderitems, setitems] = useState(isEdit ? editOrder.orderitems : [])
  const [quantity, setquantity] = useState(isEdit ? editOrder.quantity : '')
  const [orderdate, setdate] = useState(isEdit ? editOrder.orderdate : '')

  function sendData(e) {
    e.preventDefault()
    const newOrder = {
      Cname,
      phone,
      email,
      orderitems,
      quantity,
      orderdate,
    }

    axios
      .post('/api/orders/add', newOrder)
      .then(() => {
        alert('Order Added Successfully!!!')
      })
      .catch((err) => {
        alert(err)
      })
  }
  //new DEMO Button
  function addDemoData(e) {
    e.preventDefault()
    setname('K.K.Nayanajith')
    setphone('071-2657129')
    setemail('nayanajith@demo.com')
    setitems(['Laptop(Dell)'])
    setquantity(2)
    setdate('2021-10-02')
  }

  function appendItems() {}

  function editOrderCall(e) {
    e.preventDefault()
    const updateOrder = {
      Cname,
      phone,
      email,
      orderitems,
      quantity,
      orderdate,
    }
    axios
      .put('/api/orders/update/' + editOrder._id, updateOrder)
      .then(() => {
        alert('Order Updated Successfully!!!')
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <Fragment>
      <section className='bg-light pb-5'>
        <section className='position-relative Account-banner bg-dark mt-0'>
          <div className='container fs-3 position-absolute top-50 start-50 translate-middle'>
            <img src={imagep14} alt='imagep14' width='420' height='231' />
            <img src={imagep2} alt='imagep2' width='450' height='231' />
            <img src={imagep88} alt='imagep88' width='420' height='231' />
          </div>
        </section>
        <div>
          <h1>{isEdit ? 'Edit Order' : 'Add Order'}</h1>
          <section className='bg-light mt-5 mb-5'>
            <img
              src='https://www.freepnglogos.com/uploads/macbook-png/macbook-mac-buyers-guide-for-all-mac-computers-recomhub-25.png'
              width='120'
              alt='macbook, mac buyers guide for all mac computers recomhub'
            />
            <div className='container h-100 shadow p-5 pt-4 mb-5'>
              <div className='h2 mb-4'>Order Details</div>
              <form onSubmit={isEdit ? editOrderCall : sendData}>
                <div class='row mb-3'>
                  <label for='name' class='col-sm-2 col-form-label'>
                    Full Name
                  </label>
                  <div class='col-sm-10'>
                    <input
                      type='name'
                      class='form-control'
                      value={Cname}
                      id='name'
                      placeholder='Enter full name with initials'
                      onChange={(e) => {
                        setname(e.target.value)
                      }}
                      required
                    />
                  </div>
                </div>
                <div class='row mb-3'>
                  <label for='name' class='col-sm-2 col-form-label'>
                    Phone Number
                  </label>
                  <div class='col-sm-10'>
                    <input
                      type='string'
                      class='form-control'
                      value={phone}
                      id='name'
                      maxlength='11'
                      pattern='[0-9]{3}-[0-9]{7}'
                      placeholder='07x-xxxxxxx'
                      onChange={(e) => {
                        setphone(e.target.value)
                      }}
                      required
                    />
                    <small id='phoneHelp' class='form-text text-muted'>
                      We'll never share your phonenumber with anyone else.
                    </small>
                  </div>
                  <div class='invalid-feedback'>
                    Please provide a valid phone number.
                  </div>
                </div>
                <div class='row mb-3'>
                  <label for='email' class='col-sm-2 col-form-label'>
                    E-mail
                  </label>
                  <div class='col-sm-10'>
                    <input
                      type='email'
                      class='form-control'
                      href='link'
                      value={email}
                      id='email'
                      placeholder='Enter e-mail'
                      onChange={(e) => {
                        setemail(e.target.value)
                      }}
                      required
                    />
                    <small id='emailHelp' class='form-text text-muted'>
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div class='invalid-feedback'>
                    Please provide a valid e-mail.
                  </div>
                </div>

                <label for='name' class='col-sm-2 col-form-label'>
                  Order Items
                </label>

                <div class='form-check form-check-inline'>
                  {isEdit ? (
                    <div class='form-check form-check-inline'>
                      <input
                        class='form-check-input'
                        type='checkbox'
                        value={orderitems}
                        id='inlineCheckbox1'
                        onChange={(e) => {
                          setitems(e.target.value)
                        }}
                      ></input>
                      <label class='form-check-label' for='inlineCheckbox1'>
                        {editOrder.orderitems}
                      </label>
                    </div>
                  ) : (
                    <div>
                      <div class='form-check form-check-inline'>
                        <br></br>
                        <input
                          class='form-check-input'
                          type='checkbox'
                          id='inlineCheckbox1'
                          value='Laptop(Dell)'
                          onChange={(e) => {
                            setitems([...orderitems, e.target.value])
                          }}
                        ></input>
                        <label class='form-check-label' for='inlineCheckbox1'>
                          Laptop(Dell)
                        </label>
                      </div>
                      <div class='form-check form-check-inline'>
                        <input
                          class='form-check-input'
                          type='checkbox'
                          id='inlineCheckbox2'
                          value='Laptop(Asus)'
                          onChange={(e) => {
                            setitems([...orderitems, e.target.value])
                          }}
                        ></input>
                        <label class='form-check-label' for='inlineCheckbox2'>
                          Laptop(Asus)
                        </label>
                      </div>
                      <div class='form-check form-check-inline'>
                        <input
                          class='form-check-input'
                          type='checkbox'
                          id='inlineCheckbox2'
                          value='Laptop(Acer)'
                          onChange={(e) => {
                            setitems([...orderitems, e.target.value])
                          }}
                        ></input>
                        <label class='form-check-label' for='inlineCheckbox2'>
                          Laptop(Acer)
                        </label>
                      </div>

                      <div class='form-check form-check-inline'>
                        <input
                          class='form-check-input'
                          type='checkbox'
                          id='inlineCheckbox2'
                          value='TV(LG)'
                          onChange={(e) => {
                            setitems([...orderitems, e.target.value])
                          }}
                        ></input>
                        <label class='form-check-label' for='inlineCheckbox2'>
                          TV(LG)
                        </label>
                      </div>
                      <div class='form-check form-check-inline'>
                        <input
                          class='form-check-input'
                          type='checkbox'
                          id='inlineCheckbox2'
                          value='TV(Abans)'
                          onChange={(e) => {
                            setitems([...orderitems, e.target.value])
                          }}
                        ></input>
                        <label class='form-check-label' for='inlineCheckbox2'>
                          TV(Abans)
                        </label>
                      </div>

                      <div class='form-check form-check-inline'>
                        <input
                          class='form-check-input'
                          type='checkbox'
                          id='inlineCheckbox3'
                          value='option'
                          disabled
                        ></input>
                        <label class='form-check-label' for='inlineCheckbox3'>
                          etc (disabled)
                        </label>
                      </div>
                      <br></br>
                      <br></br>
                    </div>
                  )}
                </div>

                <br></br>
                <br></br>

                <div class='row mb-3'>
                  <label for='mobile' class='col-sm-2 col-form-label'>
                    Quantity
                  </label>
                  <div class='col-sm-10'>
                    <input
                      type='number'
                      class='form-control'
                      id='mobile'
                      value={quantity}
                      placeholder='select a number'
                      onChange={(e) => {
                        setquantity(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div class='row mb-3'>
                  <label for='orderdate' class='col-sm-2 col-form-label'>
                    Order Date
                  </label>
                  <div class='col-sm-10'>
                    <input
                      type='date'
                      class='form-control'
                      value={orderdate}
                      id='orderdate'
                      onChange={(e) => {
                        setdate(e.target.value)
                      }}
                      required
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  class='col-md-6 col-lg-6 btn knbtn-sm  btn-success'
                >
                  {isEdit ? 'Edit Order' : 'Add Order'}
                </button>
                <br></br>

                <div className='row'>
                  <button
                    id='demokn'
                    className='btn btn-danger col-md-2 col-lg-2'
                    onClick={(e) => addDemoData(e)}
                  >
                    Demo
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </Fragment>
  )
}

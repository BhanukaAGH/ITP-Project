import './addfrom.css'
import { useState } from 'react'

const Addform = (props) => {
  const [enteredname, setEnteredname] = useState('')
  const [enteredcategerioy, setEnteredCategerioy] = useState('')
  const [enteredquntity, setEnteredquntity] = useState('')
  const [enteredprice, setEnteredprice] = useState('')
  const [enteredate, setEntereddate] = useState('')

  const nameHandler = (event) => {
    setEnteredname(event.target.value)
  }

  const categeroyHandler = (event) => {
    setEnteredCategerioy(event.target.value)
  }

  const quntityHandler = (event) => {
    setEnteredquntity(event.target.value)
  }

  const priceHandler = (event) => {
    setEnteredprice(event.target.value)
  }

  const dateHandler = (event) => {
    setEntereddate(event.target.value)
  }

  const SubmitHandler = async (event) => {
    event.preventDefault()
    const productinfo = {
      name: enteredname,
      Category: enteredcategerioy,
      Quantity: enteredquntity,
      Price: enteredprice,
      date: enteredate,
    }

    const response = await fetch('/productinfo', {
      method: 'POST',
      body: JSON.stringify(productinfo),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
  }

  return (
    <div className='main-formr'>
      <form onSubmit={SubmitHandler}>
        <div className='supplier-product'>
          <div className='form-inputs'>
            <span className='from-lable'> Select Name </span>
            <select onChange={nameHandler}>
              {props.datas.map((datauu) => (
                <option> {datauu.Name}</option>
              ))}
            </select>
          </div>
          <div className='form-inputs'>
            <span className='from-lable'> Select Category </span>
            <select onChange={categeroyHandler}>
              <option selected>Category</option>
              <option>Tv</option>
              <option>Phone</option>
              <option>Computer</option>
            </select>
          </div>
          <div className='form-inputs'>
            <span className='from-lable'> Enter Quantity </span>
            <input
              type='number'
              placeholder='Quantity'
              onChange={quntityHandler}
              required
            />
          </div>
          <div className='form-inputs'>
            <span className='from-lable'> Original Price </span>
            <input
              type='number'
              placeholder='Price'
              onChange={priceHandler}
              required
            />
          </div>
          <div className='form-inputs'>
            <span className='from-lable'> Received Date </span>
            <input type='date' onChange={dateHandler} />
          </div>
        </div>
        <div className='form-button'>
          <input className='add-btn' type='submit' value='Add Details' />
        </div>
      </form>
    </div>
  )
}

export default Addform

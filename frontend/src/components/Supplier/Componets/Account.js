import { useState } from 'react'
import '../CSS/account.css'
import ProfileDetails from './ProfileUpload'
import Sucess from './Sucess'
const Account = (props) => {
  const [enteredname, setEnteredname] = useState('')
  const [enteredphone, setEnteredphone] = useState('')
  const [enteredmail, setEnteredmail] = useState('')
  const [enteredlocation, setEnteredloction] = useState('')
  const [enteredimg, setEnteredimg] = useState('')
  const [enteredate, setEntereddate] = useState('')
  const [sucesss, setSucesss] = useState(false)

  const closeMessage = () => {
    setSucesss(false)
  }

  const nameHandler = (event) => {
    setEnteredname(event.target.value)
  }
  const phoneHandler = (event) => {
    setEnteredphone(event.target.value)
  }

  const emailHandler = (event) => {
    setEnteredmail(event.target.value)
  }

  const locationHandler = (event) => {
    setEnteredloction(event.target.value)
  }

  const imageHandler = (res) => {
    setEnteredimg(res)
  }

  const dateHandler = (event) => {
    setEntereddate(event.target.value)
  }

  const SubmitHandler = async (event) => {
    event.preventDefault()
    const details = {
      name: enteredname,
      Phonenumber: enteredphone,
      Email: enteredmail,
      Location: enteredlocation,
      imgager: enteredimg,
      date: enteredate,
    }

    const response = await fetch('/supplier', {
      method: 'POST',
      body: JSON.stringify(details),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!(data == '')) {
      setSucesss(true)
    } else {
      console.log('unsuccess')
    }
    props.onreload()
  }

  return (
    <div className='hs-Main-container'>
      {sucesss ? <Sucess closeBackgroundmessage={closeMessage}></Sucess> : null}
      <div className='hs-btn-closer'>
        <button onClick={props.closeBackground} className='hs-closer-btn'>
          Close
        </button>
      </div>
      <form id='forms' onSubmit={SubmitHandler}>
        <div className='hs-Full-continer'>
          <div className='hs-profile-image'>
            <ProfileDetails Onadd={imageHandler} />
          </div>
          <div className='hs-second-container'>
            <div className='hs-sub-container'>
              <label className='hslabel'>Name</label>
              <input
                type='text'
                onChange={nameHandler}
                placeholder='Eg:ABC Company'
                className='hs-input-class'
                id='inputname'
                name='suppliername'
                required
              />
              <small>error message</small>
            </div>
            <div className='hs-sub-container'>
              <label className='hslabel'>Email</label>
              <input
                type='email'
                onChange={emailHandler}
                className='hs-input-class'
                placeholder='Eg:Abc@gmail.com'
                id='inputgamil'
                name='email'
                required
              />
              <small>error message</small>
            </div>
            <div className='hs-sub-container'>
              <label className='hslabel'>Phone Number</label>
              <input
                type='number'
                onChange={phoneHandler}
                className='hs-input-class'
                placeholder='Eg:715678990'
                id='inputnumber'
                name='phone'
                required
              />
              <small>error message</small>
            </div>
            <div className='hs-sub-container'>
              <label className='hslabel'>Location</label>
              <input
                type='text'
                onChange={locationHandler}
                className='hs-input-class'
                placeholder='Eg:Galle'
                id='inputlocation'
                required
              />
              <small>error message</small>
            </div>
            <div className='hs-sub-container'>
              <label className='hslabel'>Registered Date</label>
              <input
                type='date'
                onChange={dateHandler}
                className='hs-input-class'
                name='location'
              />
              <small>error message</small>
            </div>
          </div>
        </div>
        <div className='hs-btn-register'>
          <button className='hs-Regsiter-btn'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Account

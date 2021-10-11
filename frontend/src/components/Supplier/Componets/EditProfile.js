import '../CSS/edit.css'
import Editsucess from './Editsuccess'
import { useState } from 'react'
const EditProfile = (props) => {
  const [enteredname, setEnteredname] = useState(props.list.name)
  const [enteredmail, setEnteredmail] = useState(props.list.Email)
  const [enteredphone, setEnteredphone] = useState(props.list.Phonenumber)
  const [enteredlocation, setEnteredlocation] = useState(props.list.Location)
  const [enteredimg, setEnteredImg] = useState(props.list.imgager)
  const [editsucesss, setEditsucesss] = useState(false)

  const id = props.list._id
  const closeMessage = () => {
    setEditsucesss(false)
  }

  //console.log(id);

  const getnamehandler = (event) => {
    setEnteredname(event.target.value)
  }

  const getmalihandler = (event) => {
    setEnteredmail(event.target.value)
  }

  const getphonehandler = (event) => {
    setEnteredphone(event.target.value)
  }

  const getlocationhandler = (event) => {
    setEnteredlocation(event.target.value)
  }

  const imghandler = (event) => {
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    const uploadedFile = event.target.files[0]
    toBase64(uploadedFile)
      .then((res) => {
        setEnteredImg(res)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const editsubmithandler = async (event) => {
    event.preventDefault()

    const neweditdata = {
      name: enteredname,
      Email: enteredmail,
      Phonenumber: enteredphone,
      Location: enteredlocation,
      imgager: enteredimg,
    }
    const response = await fetch(`/supplier/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(neweditdata),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (!(data == '')) {
      setEditsucesss(true)
    } else {
      console.log('unsuccess')
    }
    console.log(data)
    props.onreload()
  }

  return (
    <div className='hs-Main-View-edit-profile'>
      {editsucesss ? (
        <Editsucess closeBackgroundmessage={closeMessage}></Editsucess>
      ) : null}
      <div className='hs-hhhhhhhhhhhhh'>
        <div className='hs-profile-image'>
          <img src={enteredimg} className='hs-img-profile-pro' />
          <input
            type='file'
            onChange={imghandler}
            className='hs-profile-edit-img'
          />
          <h1 className='hs-Profile-name'>Profile Image</h1>
        </div>
        <div className='hs-main-form'>
          <form onSubmit={editsubmithandler}>
            <div>
              <label className='hs-chdsch'>Name</label>
              <input
                className='hs-input-profile'
                type='text'
                onChange={getnamehandler}
                placeholder={props.list.name}
              />
              <label className='hs-chdsch'>Gmail</label>
              <input
                className='hs-input-profile'
                type='text'
                onChange={getmalihandler}
                placeholder={props.list.Email}
              />
              <label className='hs-chdsch'>Phone number</label>
              <input
                className='hs-input-profile'
                type='text'
                onChange={getphonehandler}
                placeholder={props.list.Phonenumber}
              />
              <label className='hs-chdsch'>Location</label>
              <input
                className='hs-input-profile'
                type='text'
                onChange={getlocationhandler}
                placeholder={props.list.Location}
              />
            </div>
            <div className='hs-edit-hs'>
              <button className='hs-edit-btn-hs'> Edit Profile </button>
            </div>
          </form>
        </div>
      </div>
      <div className='hs-btn-profile-close'>
        <button onClick={props.closebackroundvuew} className='hs-closer-btn'>
          Close
        </button>
      </div>
    </div>
  )
}

export default EditProfile

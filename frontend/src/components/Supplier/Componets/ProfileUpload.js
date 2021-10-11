import { useState } from 'react'
import '../CSS/image.css'
const ProfileDetails = (props) => {
  const [profileImg, setProfileImg] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  )

  //const [file, setFile] = useState("");

  const imageHandler = (event) => {
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
        //console.log(res);
        props.Onadd(res)
        setProfileImg(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='page'>
      <div className='container'>
        <h1 className='heading'>Upload Profile Image</h1>
        <div className='img-holder'>
          <img src={profileImg} alt='' id='img' className='img' />
        </div>
        <input
          type='file'
          name='imageupload'
          className='file-uplaod'
          onChange={imageHandler}
        />
        <div className='label'>
          <label className='image-upload' htmlFor='input'>
            Choose A Photo
          </label>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails

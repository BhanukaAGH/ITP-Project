import '../CSS/view.css'
const ViewProfile = (props) => {
  return (
    <div className='hs-Main-View-dgsgsgs'>
      <div className='hs-hhhhhhhhhhhhh'>
        <div className='hs-profile-image'>
          <img
            src={`${props.list.imgager}`}
            className='hs-view-profile-image'
          />
          <h1 className='hs-Profile-name'>Profile Image</h1>
        </div>
        <div className='hs-main-form'>
          <form className='hs-view-profile'>
            <label className='hs-chdsch'>Name</label>
            <input
              className='hs-input-profile'
              type='text'
              value={props.list.name}
              disabled
            />
            <label className='hs-chdsch'>Gmail</label>
            <input
              className='hs-input-profile'
              type='text'
              value={props.list.Email}
              disabled
            />
            <label className='hs-chdsch'>Phone number</label>
            <input
              className='hs-input-profile'
              type='text'
              value={props.list.Phonenumber}
              disabled
            />
            <label className='hs-chdsch'>Location</label>
            <input
              className='hs-input-profile'
              type='text'
              value={props.list.Location}
              disabled
            />
          </form>
        </div>
      </div>
      <div className='hs-btn-profile-close'>
        <button className='hs-closer-btn' onClick={props.closebackroundvuew}>
          Close
        </button>
      </div>
    </div>
  )
}

export default ViewProfile

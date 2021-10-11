import '../CSS/sucess.css'
const Sucess = (props) => {
  return (
    <div className='main-foucs'>
      <div className='main-sucees'>
        <h1 className='hs-heading-success'>Profile Successfully Created</h1>
        <button
          className='hs-btn-success-msg'
          onClick={props.closeBackgroundmessage}
        >
          Ok
        </button>
      </div>
    </div>
  )
}

export default Sucess

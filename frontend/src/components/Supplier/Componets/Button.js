import { useState } from 'react'
import Account from './Account'
import '../CSS/button.css'
const Compo = (props) => {
  const [account, SetAccount] = useState(false)

  const AccountHandler = () => {
    SetAccount(true)
    //console.log("sucess");
  }

  const closeRegister = () => {
    SetAccount(null)
  }

  const onpasscall = () => {
    props.onhhh()
  }

  return (
    <div className='hs-change-container'>
      {account ? (
        <Account
          closeBackground={closeRegister}
          onreload={onpasscall}
        ></Account>
      ) : null}
      <div className='hs-Add-Supplier'>
        <button className='hs-change-btn' onClick={AccountHandler}>
          Add Supplier
        </button>
      </div>
    </div>
  )
}

export default Compo

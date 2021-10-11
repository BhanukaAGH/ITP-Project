import '../CSS/delete.css'
const Deletemessage = (props) => {
  const id = props.deletedid

  const ondeleteaccunt = async () => {
    const response = await fetch(`/supplier/${id}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    console.log(data)
    props.ondeletemsg()
    props.reredertable()
  }
  console.log(props.deletedid)
  return (
    <div className='hs-main-foucser'>
      <div className='hs-main-sucees'>
        <h2>Do you want to delete this account</h2>
        <button className='hs-yes-btn' onClick={ondeleteaccunt}>
          Yes
        </button>
        <button className='hs-close-btn' onClick={props.ondeletemsg}>
          No
        </button>
      </div>
    </div>
  )
}

export default Deletemessage

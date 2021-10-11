import '../CSS/suppliertable.css'
import { useState } from 'react'

const Tabledata = (props) => {
  const [deletemsg, setDeletemsg] = useState(false)
  const Getsuppllierinfo = () => {
    //console.log(props.ID);

    const id = props.ID
    //console.log(id);

    fetch(`/supplier/${id}`)
      .then((data) => {
        return data.json()
      })
      .then((post) => {
        // console.log(post);
        props.onData(post)
      })
  }

  const Editsuppllierinfo = () => {
    //console.log(props.ID);

    const id = props.ID
    console.log(id)

    fetch(`/supplier/${id}`)
      .then((data) => {
        return data.json()
      })
      .then((post) => {
        // console.log(post);
        props.onGetdata(post)
      })
  }

  const Onwarning = () => {
    props.ondeletewaring(props.ID)
  }

  return (
    <tr className='hstr'>
      <td className='hstd'>{props.Name}</td>
      <td className='hstd'>{props.Gmail}</td>
      <td className='hstd'>
        <button className='hs-view-table' onClick={Getsuppllierinfo}>
          View Profile
        </button>
      </td>
      <td className='hstd'>
        <button onClick={Editsuppllierinfo} className='hs-update-table'>
          Edit
        </button>
      </td>
      <td className='hstd'>
        <button onClick={Onwarning} className='hs-delete-table'>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default Tabledata

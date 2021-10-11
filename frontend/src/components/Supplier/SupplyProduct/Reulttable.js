const Resulttabledata = (props) => {
  return (
    <tr className='hstr'>
      <td className='hstd'>{props.name}</td>
      <td className='hstd'>{props.category}</td>
      <td className='hstd'>{props.quantity}</td>
      <td className='hstd'>Rs.{props.price}</td>
      <td className='hstd'>{props.date}</td>
      <td className='hstd'>Rs.{props.total}</td>
    </tr>
  )
}

export default Resulttabledata

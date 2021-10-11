import Resulttabledata from './Reulttable'
const Supplytableheader = (props) => {
  //console.log(props.getnewdata);

  //let madeArr = Object.entries(props.getnewdata);
  const data = Array.from(props.getnewdata)

  data.map((total) => {
    let tol = total.Price
    let quan = total.Quantity
    let add = tol * quan
    console.log(add)
  })

  //console.log(data);

  return (
    <div>
      <table className='Supplier-table'>
        <tr className='hstr'>
          <th className='hsth'>Supplier Name</th>
          <th className='hsth'>Category</th>
          <th className='hsth'>Received quantity</th>
          <th className='hsth'>Original Price</th>
          <th className='hsth'>Recevied Date</th>
          <th className='hsth'>Total Cost</th>
        </tr>
        {data.map((res) => (
          <Resulttabledata
            name={res.Name}
            category={res.Category}
            quantity={res.Quantity}
            price={res.Price}
            date={res.Date}
            total={res.Price * res.Quantity}
          />
        ))}
      </table>
    </div>
  )
}

export default Supplytableheader

import '../CSS/extrainfo.css'
import supplier from '../img/supplier.png'
import spend from '../img/spend.png'
const ExtraInfo = (props) => {
  let totalcost = 0
  let tol
  let quan
  let add

  props.allcost.map((total) => {
    // let totalcost;
    tol = total.Price
    quan = total.Quantity
    add = tol * quan
    totalcost = totalcost + add
  })
  return (
    <div className='hs-parent-exter-info'>
      <div className='hs-parent-exter-info-first'>
        <img
          src={supplier}
          width='42'
          height='42'
          className='hs-supplier-image'
        />
        <h1>
          number of supplier <span>{props.alldata.length}</span>{' '}
        </h1>
      </div>
      <div className='hs-parent-exter-info-second'>
        <img src={spend} width='42' height='42' className='hs-supplier-image' />
        <h1>Total spend sofar Rs.{totalcost}</h1>
      </div>
    </div>
  )
}

export default ExtraInfo

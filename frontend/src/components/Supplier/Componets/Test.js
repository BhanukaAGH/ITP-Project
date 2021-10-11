import { useState } from 'react'
import '../CSS/test.css'

import Supplytableheader from '../SupplyProduct/Supplyheadertable'
import SearchResult from '../SupplyProduct/SearchResult'

const Testresult = (props) => {
  const [takeinput, settakeInput] = useState('')
  const [vdfavfyavsyfyas, setResshow] = useState('')
  const [searchresult, setSearchreult] = useState(false)

  const resusltclose = () => {
    setSearchreult(false)
  }

  console.log(props.resultset)

  const nameHandler = (event) => {
    settakeInput(event.target.value)
    //console.log(event.target.value);
  }

  const displayresult = () => {
    const filteredExpenses = props.resultset.filter((list) => {
      return list.Name.toString() === takeinput
    })

    //console.log(filteredExpenses);
    setResshow(filteredExpenses)
    if (!(filteredExpenses == '')) {
      console.log('result sucess')
    } else {
      console.log('no result found')
      setSearchreult(true)
    }
    props.ondataget(vdfavfyavsyfyas)
  }

  return (
    <div>
      {searchresult ? <SearchResult></SearchResult> : null}
      <select
        className='has-name-list'
        onChange={nameHandler}
        onClick={resusltclose}
      >
        {props.datas.map((datauu) => (
          <option> {datauu.Name}</option>
        ))}
      </select>
      <button className='has-search-list' onClick={displayresult}>
        Search
      </button>
      <Supplytableheader getnewdata={vdfavfyavsyfyas} />
    </div>
  )
}

export default Testresult

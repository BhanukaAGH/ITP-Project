import { Fragment, useState } from 'react'
import '../CSS/search.css'
import ViewProfile from './ViewProfile'

const SearchBar = (props) => {
  const [search, SetSearch] = useState(false)
  const [getinput, setGetinput] = useState('')
  const [resultr, setResultr] = useState('')
  const [aa, setAa] = useState('')

  let filtered

  const searchhandler = (event) => {
    setGetinput(event.target.value)
    if (document.getElementById('question').value.length == 0) {
      return setResultr('')
    } else {
      filtered = props.resuslts.filter((country) => {
        return country.Name.toLowerCase().includes(getinput.toLowerCase())
      })

      //setAa(filtered);
      console.log('filtered' + filtered)

      if (!(filtered == '')) {
        filtered.map((res) => {
          setResultr(res.Name)
        })
      } else {
        setResultr('no result')
      }
    }
  }

  const closeedit = () => {
    SetSearch(null)
  }

  return (
    <Fragment>
      {search ? (
        <ViewProfile list={aa} closebackroundvuew={closeedit}></ViewProfile>
      ) : null}
      <input
        className='search-box'
        id='question'
        type='text'
        name='searh'
        placeholder='Search For Supplier'
        onChange={searchhandler}
      />
      <p className='hs-result-show'>{resultr}</p>
    </Fragment>
  )
}

export default SearchBar

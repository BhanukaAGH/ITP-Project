import '../CSS/suppliertable.css'
import Tabledata from './Tableheader'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
const SupplierTable = (props) => {
  const uguuuiiui = (id) => {
    props.ongetdelete(id)
  }
  const viewprofile = (posts) => {
    const newdata = {
      ...posts,
    }

    //console.log(newdata);
    props.onProfile(newdata)
  }

  const editprofile = (posts) => {
    const newdata = {
      ...posts,
    }

    //console.log(newdata);
    props.onEdit(newdata)
  }

  return (
    <>
      <div className='d-block container'>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='download-table-xls-button'
          table='supptable-to-xls'
          filename='tablexls'
          sheet='tablexls'
          buttonText='Generate User Report'
        />
      </div>
      <div className='Main-Table-Container'>
        <table className='Supplier-table' id='supptable-to-xls'>
          <tr className='hstr'>
            <th className='hsth'>SupplierName</th>
            <th className='hsth'>Supplier Email</th>
            <th className='hsth'>Action</th>
            <th className='hsth'>Edit</th>
            <th className='hsth'>Delete</th>
          </tr>
          {props.list.map((data) => (
            <Tabledata
              ID={data.Id}
              Name={data.Name}
              Gmail={data.Gmail}
              onData={viewprofile}
              onGetdata={editprofile}
              ondeletewaring={uguuuiiui}
            />
          ))}
        </table>
      </div>
    </>
  )
}

export default SupplierTable

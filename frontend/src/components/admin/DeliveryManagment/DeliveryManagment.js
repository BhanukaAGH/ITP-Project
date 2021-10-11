import React, { useState, Fragment } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import './del.css'
import AddDelivery from './AddDelivery'
import FetchAllDelivery from './FetchAllDelivery'

const DeliveryManagment = (props) => {
  const [add, showAdd] = useState(true)
  const [editDelivery, setEditDelivery] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [text, setText] = useState(false)
  const allDel = 'Show all Deliveries'
  const addDel = 'Add new Delivery'
  

  function getDeliveryDetails(delivery) {
    console.log(delivery)
    setEditDelivery(delivery)
    setIsEdit(true)
  }

  return (
    // <Router>
    <div>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Delivery Management</h1>
      </div>

      <Button
        id='kkbtn1'
        className='btn btn-dark'
        onClick={() => {
          showAdd(!add)
          setText(!text)}}
      >
        <i className='bi bi-plus'></i> {text ? allDel : addDel}     
      </Button>

      {/* <Route path="admin/add" exact component={AddDelivery} /> */}
      {add ? (
        <FetchAllDelivery
          add={add}
          addChange={showAdd}
          getDelivery={getDeliveryDetails}
        />
      ) : (
        <AddDelivery editDelivery={editDelivery} isEdit={isEdit} />
      )}
    </div>
    // </Router>
  )
}

export default DeliveryManagment

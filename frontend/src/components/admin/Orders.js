import { React, useEffect, useState } from 'react'
import axios from 'axios'
import imagelock from '../../img/lock.png'
import './ordercss.css'
import { Link } from 'react-router-dom'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
const Orders = () => {
  const [orders, setOrders] = useState([])

  const fileSaver = require('file-saver');

  useEffect(() => {
    fetchOrders()
  }, [])

  function fetchOrders() {
    axios
      .get('/api/orders/')
      .then((res) => {
        setOrders(res.data)
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  function downloadOrderReport() {
    axios
      .get('/api/orders/report')
      .then((res) => {
        window.open('data:text/csv;charset=utf-8,' + escape(res.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }

   //pdf order report 
   function downloadPdf(){
    axios.get('/api/orders/pdf').then((res)=> {
      const arraybuffer = base64ToArrayBuffer(res.data);
      const blob = new Blob([arraybuffer], { type: "application/pdf" });
      fileSaver.saveAs(blob, "test.pdf");    
    }).catch((error)=>{
        console.log(error);
      });
  }

  function base64ToArrayBuffer(data) {
    var binaryString = window.atob(data);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  function deleteOrder(orderId) {

    console.log(orderId)

    axios

      .delete('/api/orders/delete/' + orderId)

      .then((res) => {

        alert('Order deleted Successfully!!!')

        console.log(res)

        //setOrders(res.data)

      })

      .catch((err) => {

        alert(err.message)

      })

  }

  function HandleChange(searchText) {

    setOrders([])

    if (searchText === '') {

      searchText = '*'

    }



    axios

      .get('/api/orders/search/' + searchText)

      .then((res) => {

        console.log(searchText)

        console.log(res.data)



        if (res.data.length > 0) {

          setOrders(res.data)

        }

      })

      .catch((error) => {

        console.log(error)

      })

  }

  return (
    <div>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Order Management</h1>
        {/* <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='download-table-xls-button'
          table='ordtable-to-xls'
          filename='tablexls'
          sheet='tablexls'
          buttonText='Generate Orders Report'
        /> */}
        <div className='container text-end'>
        <button  
        className="download-table-pdf-button" onClick={downloadPdf}>
          Generate Order Report</button></div>
      </div>

      <div className='container text-end'>

          <input

          type='text'

          class='searchkn'

          placeholder='Search Order'

          onChange={(event) => {

          HandleChange(event.target.value)

  }}

/></div>

      <div>
        <h1 className='col-md-6 col-lg-6'>All Orders</h1>
        <h7>Admin purpose only</h7>
        <img src={imagelock} alt='imagelock' width='50' />
        <br></br>
        <div>
          <table
            class='table table-striped table-hover mt-3'
            id='ordtable-to-xls'
          >
            <thead>
              <tr>
                <th scope='col'>Customer_Name</th>
                <th scope='col'>Phone_Number</th>
                <th scope='col'>E-mail</th>
                <th scope='col'>Order_Items</th>
                {/* <th scope='col'>NIC</th> */}
                <th scope='col'>Quantity</th>
                <th scope='col'>Order_Date</th>
                <th scope='col'>Action</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((row) => (
                <tr key={row._id}>
                  <td>{row.Cname}</td>
                  <td>{row.phone}</td>
                  {/* <td>{order.nic}</td> */}
                  <td>{row.email}</td>
                  <td>{row.orderitems}</td>
                  <td>{row.quantity}</td>
                  <td>{row.orderdate}</td>
                  <td><Link

                    to='#'

                    className='btn btn-danger'

                    onClick={() => {

                      if (

                        window.confirm(

                          'Are you sure you wish to delete this Order ?'

                        )

                      )

                        deleteOrder(row._id)

                    }}

                  >

                    <i className='far fa-trash-alt'></i>&nbsp;Delete

                  </Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders

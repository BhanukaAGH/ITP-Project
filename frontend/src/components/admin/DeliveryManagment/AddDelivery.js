import React, { useState } from 'react'
import axios from "axios";
import ReactDOM from 'react-dom';
import imagelock from '../../../img/lock.png'
import './css.css'
import { Link } from "react-router-dom";

export default function AddDelivery({ editDelivery, isEdit }) {

    var date = new Date(editDelivery.deliverydate)

    const [destination, setdestination] = useState(isEdit ? editDelivery.destination : "");
    const [pstate, setstate] = useState(isEdit ? editDelivery.pstate : "");
    const [dtype, settype] = useState(isEdit ? editDelivery.dtype : "");
    const [ddate, setdate] = useState(isEdit ? editDelivery.ddate : "");
    const [dname, setname] = useState(isEdit ? editDelivery.dname : "");
    const [dstate, setdstate] = useState(isEdit ? editDelivery.dstate : "");


    function sendData(e) {
        e.preventDefault();
        const newDelivery = {
            destination,
            pstate,
            dtype,
            ddate,
            dname,
            dstate

        }
        axios.post('/api/deliverys/add', newDelivery).then(() => {
            alert("Delivery Added Successfully!!!")

        }).catch((err) => {
            alert(err)
        })

    }


    //new DEMO Button
    function addDemoData(e){
        e.preventDefault();
        setdestination("Matara");
        setstate("completed");
        settype("Express Delivery");
        setdate("2021-10-02");
        setname("J.Jayathilaka");
        setdstate("processing");
      }

    function editDeliveryCall(e) {
        e.preventDefault();
        const updateDelivery = {
            destination,
            pstate,
            dtype,
            ddate,
            dname,
            dstate
        }
        axios.put('/api/deliverys/update/' + editDelivery._id, updateDelivery).then(() => {
            alert("Delivery Updated Successfully!!!")

        }).catch((err) => {
            alert(err)
        })
    }



    return (
        <div>
            <h1>{isEdit ? 'Edit Delivery' : 'Add Delivery'}</h1>
            <div className="container">
                <h7>Admin purpose only</h7><img src={imagelock} alt='imagelock' width="50" />
                <section className='bg-light mt-5 mb-5'>
                    <div className='container h-100 shadow p-5 pt-4 mb-5'>
                        <div className='h2 mb-4'>Delivery Details</div>
                        <form onSubmit={isEdit ? editDeliveryCall : sendData}>
                            <div class='row mb-3'>
                                <label for='name' class='col-sm-2 col-form-label'>
                                   <b> Destination</b>
                                </label>
                                <div class='col-sm-10'>
                                    <input type='name' class='form-control' value={destination} id='name' placeholder="Enter customer address " onChange={(e) => {

                                        setdestination(e.target.value);

                                    }} required />
                                </div>
                            </div><br></br>
                            <div class="form-row form-row-inline">
                                <div class="col-auto my-1">
                                    <label class="mr-sm-2" for="inlineFormCustomSelect"><b>Payment State</b></label>
                                    <select class="custom-select mr-sm-2" value={pstate} id="inlineFormCustomSelect" style={{ margin: "0 200px 0 53px " }} onChange={(e) => {
                                        setstate(e.target.value);

                                    }}  >
                                        <option selected>Choose...</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Processing">Processing</option>
                                    </select>
                                </div></div><br></br>
                            <label for='email' class='col-sm-2 col-form-label'>
                            <b>Delivery Type</b>
                            </label><br></br><br></br>
                            <div class="form-check form-check-inline">
                                {isEdit ? <div class="form-check form-check-inline"  >
                                    <input class="form-check-input" type="radio" value={dtype} id="inlineCheckbox1" onChange={(e) => {

                                        settype(e.target.value);

                                    }}></input>
                                    <label class="form-check-label" for="inlineCheckbox1">{editDelivery.dtype}</label>
                                </div> : <div><div class="form-check form-check-inline" ><br></br>
                                    <input class="form-check-input" type="radio" id="inlineCheckbox1" value="1-3 Day's" onChange={(e) => {

                                        settype(e.target.value);

                                    }}></input>
                                    <label class="form-check-label" for="inlineCheckbox1" >1-3 Day's Delivery</label>
                                </div>

                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="inlineCheckbox2" value="Express" onChange={(e) => {

                                            settype(e.target.value);

                                        }}></input>
                                        <label class="form-check-label" for="inlineCheckbox2">Express Delivery</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="inlineCheckbox2" value="Custom " onChange={(e) => {

                                            settype(e.target.value);

                                        }}></input>
                                        <label class="form-check-label" for="inlineCheckbox2">Custom Delivery</label>
                                    </div>

                                    <br></br><br></br>
                                </div>}</div>

                            <div class='row mb-3'>
                                <label for='deliverydate' class='col-sm-2 col-form-label'>
                                <b>Delivery Date</b>
                                </label>
                                <div class='col-sm-10'>
                                    <input type='date' class='form-control' value={ddate} id='Deliverydate' onChange={(e) => {

                                        setdate(e.target.value);

                                    }}required />
                                </div>
                            </div><br></br>
                            <div class='row mb-3'>
                                <label for='name' class='col-sm-2 col-form-label'>
                                <b>Deliver's Name</b>
                                </label>
                                <div class='col-sm-10'>
                                    <input type='name' class='form-control' value={dname} id='name' placeholder="Enter assign person name for delivery " onChange={(e) => {

                                        setname(e.target.value);

                                    }} required />
                                </div>
                            </div><br></br>
                            <div class="form-row form-row-inline">
                                <div class="col-auto my-1">
                                    <label class="mr-sm-2" for="inlineFormCustomSelect"><b>Delivery State</b></label>
                                    <select class="custom-select mr-sm-2" value={dstate} id="inlineFormCustomSelect" style={{ margin: "0 200px 0 58px " }} onChange={(e) => {

                                        setdstate(e.target.value);

                                    }}  >
                                        <option selected>Choose...</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Processing">Processing</option>
                                    </select>
                                </div></div><br></br>
                            <button type='submit' class='col-md-6 col-lg-6 btn nnbtn-sm  btn-success' >
                                {isEdit ? 'Edit Delivery' : 'Add Delivery'}
                            </button>
                            <br></br>

                            <div className="row">
                          <button className="btn btn-danger col-md-2 col-lg-2" onClick={(e) => addDemoData(e)}>
                              Demo
                          </button>
                        </div>
                        </form>
                    </div>
                </section>
            </div>


        </div>


    )


}




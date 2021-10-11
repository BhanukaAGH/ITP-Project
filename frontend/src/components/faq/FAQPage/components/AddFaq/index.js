import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function AddFaq(props) {

    const [question, setQuestion] = useState("");
    const [category, setCategory] = useState("");
    const [topic, setTopic] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const submitQuestion = () => {
        if (question !== "" && category !== "" && topic !== "") {
            axios.post("/api/faq/add", {
                question: question,
                topic: topic,
                category: category,
                date: Date()
            }).then(response => {
                console.log(response.data)
                if (response.data.status === "success") {
                    enqueueSnackbar("Successfully Submitted", {
                        variant: 'success',
                        autoHideDuration: 3000,
                    });
                    props.onCloseModal();
                }
            }).catch(err => {
                console.log(err);
                enqueueSnackbar("FAQ Submission Failed", {
                    variant: 'error',
                    autoHideDuration: 3000,
                });
            })
        }
        else{
            enqueueSnackbar("please fill relavant feilds", {
                variant: 'error',
                autoHideDuration: 3000,
            });
        }
    }

    return (
        <div>
            <section className="hero is-link edit-hero">
                <div className="hero-body">
                    <p className="title">
                        Add a Question
                    </p>
                </div>
            </section>
            <div className="columns is-link edit-hero ">
                <div className="column is-full">
                    <h1 className="title is-5 mt-3 mb-0">Topic</h1>
                    <div >   {/* //class="input mt-3 */}
                        <input class="input mt-3" type="text" placeholder="Topic" required  onChange={(e) => { setTopic(e.target.value) }}>
                        </input>
                    </div>
                </div>
                
            </div>
            <div className="columns">
            <div className="column is-6">
                    <h1 className="title is-5 mt-3 mb-0">Category</h1>
                    <div class="select mt-2">
                        <select required onChange={(e) => {setCategory(e.target.value)}} >
                            <option value="" selected>Select a Category</option>
                            <option value="Store" >Store</option>
                            <option value="Genaral" >Genaral</option>
                            <option value="Product">Product</option>
                            <option value="Payment">Payment</option>
                            <option value="Warranty">Warranty</option>
                            <option value="Other">Other</option> 
                        </select>
                    </div>
                </div>


            </div>

            <h1 className="title is-5 mt-3 mb-0">Question</h1>
            <textarea className="textarea mt-3" placeholder="Type your question here" onChange={(e) => { setQuestion(e.target.value) }} ></textarea>
            <div className="buttons has-text-centered mt-4">
                <button className="button is-link" onClick={submitQuestion}>Submit Question</button>
            </div>
        </div>
    );
}

export default AddFaq;
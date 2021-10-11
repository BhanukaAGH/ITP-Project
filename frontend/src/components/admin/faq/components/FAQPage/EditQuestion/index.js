import axios from 'axios';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import "./index.css";

function EditQuestion(props) {

    const [newAnswer, setNewAnswer] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const editQuestion = () => {
        if (newAnswer !== "") {
            axios.put("/api/faq/edit", {
                id: props.selectedQuestion._id,
                answer: newAnswer
            }).then(response => {
                console.log(response.data)
                if (response.data.status === "success") {
                    enqueueSnackbar("Successfully Edited", {
                        variant: 'success',
                        autoHideDuration: 3000,
                    });
                    props.closeEditModal();
                    props.getQuestions();
                }
            }).catch(err => {
                console.log(err);
                enqueueSnackbar("Edit FAQ Failed", {
                    variant: 'error',
                    autoHideDuration: 3000,
                });
            })
        }
    }

    return (
        <div>
            <section className="hero is-link edit-hero">
                <div className="hero-body">
                    <p className="title">
                        Edit Question
                    </p>
                </div>
            </section>
            <h1 className="title is-5 mt-3 mb-0">Question</h1>
            <p className="w-600">{props.selectedQuestion.question}</p>
            <textarea className="textarea mt-5" defaultValue={props.selectedQuestion.answer} onChange={(e) => { setNewAnswer(e.target.value) }}></textarea>
            <div className="buttons has-text-centered mt-4">
                <button className="button is-success" onClick={editQuestion}>Edit Answer</button>
            </div>
        </div>
    );
}

export default EditQuestion;
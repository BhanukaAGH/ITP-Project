import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function AnswerQuestion(props) {

    const [answer, setAnswer] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const answerQuestion = () => {
        if (answer !== "") {
            axios.put("/api/faq/edit", {
                id: props.selectedQuestion._id,
                answer: answer
            }).then(response => {
                console.log(response.data)
                if (response.data.status === "success") {
                    enqueueSnackbar("Successfully Answered", {
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
        }else {
            enqueueSnackbar("Please add an answer", {
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
                        Answer Question
                    </p>
                </div>
            </section>
            <h1 className="title is-5 mt-3 mb-0">Question</h1>
            <p className="w-600">{props.selectedQuestion.question}</p>
            <textarea  className="textarea mt-5" placeholder="Type your answer here" onChange={(e) => { setAnswer(e.target.value) }}></textarea>
            <div className="buttons has-text-centered mt-4">
                <button className="button is-success" onClick={answerQuestion}>Submit Answer</button>
            </div>
        </div>
    );
}

export default AnswerQuestion;
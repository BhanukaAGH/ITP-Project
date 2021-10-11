import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import EditQuestion from './EditQuestion';
import { Modal } from 'react-responsive-modal';
import 'react-accessible-accordion/dist/fancy-example.css';
import 'react-responsive-modal/styles.css';
import AnswerQuestion from './AnswerQuestion';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { useSnackbar } from 'notistack';

function FAQPage(props) {

    const [selectedQuestion, setSelectedQuestion] = useState({})
    const [faqs, setFaqs] = useState([])
    const { enqueueSnackbar } = useSnackbar();

    //Edit Modal
    const [editId, setEditId] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const onOpenEditModal = () => setEditModalOpen(true);
    const onCloseEditModal = () => setEditModalOpen(false);

    //Answer Modal
    const [answerId, setAnswerId] = useState("");
    const [answerModalOpen, setAnswerModalOpen] = useState(false);
    const onOpenAnswerModal = () => setAnswerModalOpen(true);
    const onCloseAnswerModal = () => setAnswerModalOpen(false);

    const answerQuestion = (e) => {
        setAnswerId(e.target.id);
        findSelectedRow(e.target.id, "answer");
        onOpenAnswerModal();
    }
    const editQuestion = (e) => {
        console.log(e.target.id)
        findSelectedRow(e.target.id, "edit");
        onOpenEditModal();
    }

    //for answerd questions
    const findSelectedRow = (id, type) => {
        console.log(id)
        if (type === "edit") {
            faqs.filter(element => element.state === "answered").map(question => {
                if (question._id === id.split("-")[1].toString()) {
                    setSelectedQuestion(question)
                    return;
                }
            })
        } else {
            faqs.filter(element => element.state === "pending").map(question => {
                if (question._id === id.split("-")[1].toString()) {
                    setSelectedQuestion(question)
                    return;
                }
            })
        }

    }

    const deleteQuestion = (e) => {
        console.log(e.target.id)
        if (e.target.id !== "") {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this after deleting!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete("/api/faq/delete", {
                        data: { id: (e.target.id).split("-")[1].toString() }
                    }).then(response => {
                        if (response.data.status === "success") {
                            enqueueSnackbar("Successfully Deleted", {
                                variant: 'success',
                                autoHideDuration: 3000,
                            });
                            getQuestions()
                        }
                    })
                }
            })
        }
    }

    //for getting qurstions
    const getQuestions = () => {
        axios.get("/api/faq/get")
            .then(response => {
                setFaqs(response.data.data)
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getQuestions();
    }, [])

    return (
        <div>
            <section className="hero is-warning">
                <div className="hero-body pb-3 pt-5">
                    <div className="columns">
                        <div className="column is-10">
                            <p className="title">
                                FAQ Management
                            </p>
                            <p className="subtitle">
                                Admin  FAQ
                            </p>
                        </div>
                        <div className="column is-2">
                            <img className="hero-image" src="https://image.flaticon.com/icons/png/512/1321/1321740.png" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-5">
                <div className="columns">
                    <div className="column is-6 has-text-centered">

                        {/* ANSWERED */}
                        <h1 className="title is-4">Answered</h1>
                        <Accordion>
                            {
                                faqs.filter(element => element.state === "answered").map((faq, key) => {
                                    return (
                                        <AccordionItem key={key}>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    {faq.question}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <div className="tags mb-1">
                                                    <span className="tag is-link">{faq.category}</span>
                                                    <span className="tag is-warning">{faq.topic}</span>
                                                </div>
                                                <p className="has-text-justified" id={"qab-" + faq._id}>
                                                    {faq.answer}
                                                </p>
                                                <div className="has-text-centered mt-3">
                                                    <div className="buttons has-text-centered">
                                                        <button className="button is-success is-small" id={"qe-" + faq._id} onClick={editQuestion}>Edit</button>
                                                        <button className="button is-danger is-small" id={"qd-" + faq._id} onClick={deleteQuestion}>Delete</button>
                                                    </div>
                                                </div>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    )
                                })
                            }
                        </Accordion>
                        <Modal className="is-fullwidth" open={editModalOpen} onClose={onCloseEditModal} center>
                             {/* Render Edit Question Page */}
                            <EditQuestion selectedQuestion={selectedQuestion} closeEditModal={onCloseEditModal} getQuestions={getQuestions} />
                        </Modal>
                    </div>
                    <div className="column is-6 has-text-centered">

                        {/* not answered */}
                        <h1 className="title is-4">Need To Respond</h1>
                        <Accordion>
                            {
                                faqs.filter(element => element.state === "pending").map((faq, key) => {
                                    return (
                                        <AccordionItem key={key}>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    {faq.question}
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <div className="has-text-centered">
                                                    <div className="buttons has-text-centered">
                                                        <button className="button is-success is-small" id={"qa-" + faq._id} onClick={answerQuestion}>Answer</button>
                                                        <button className="button is-danger is-small" id={"qd-" + faq._id} onClick={deleteQuestion}>Delete</button>
                                                    </div>
                                                </div>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    )
                                })
                            }
                        </Accordion>
                        <Modal open={answerModalOpen} onClose={onCloseAnswerModal} center>
                            {/* Render Answer question Component */}
                            <AnswerQuestion selectedQuestion={selectedQuestion} closeEditModal={onCloseAnswerModal} getQuestions={getQuestions} />
                        </Modal>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default FAQPage;
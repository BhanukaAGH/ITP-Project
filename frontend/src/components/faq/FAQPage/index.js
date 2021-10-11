import React, { useState, useEffect } from "react";
import './index.css';
import '../faq.css' ;
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer"
import { Modal } from 'react-responsive-modal';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import 'react-responsive-modal/styles.css';
import axios from 'axios';
import AddFaq from "./components/AddFaq";
import { popularFaq } from "./popularFaq";


function FAQPage() {

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [faqs, setFaqs] = useState([])

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
    <section>
      <Navbar />
      <section className="hero is-warning mt-4">
        <div className="hero-body pb-3 pt-5">
          <div className="columns">
            <div className="column is-10">
              <p className="title">
                Frequently Asked Questions
              </p>
              <p className="subtitle">
                Tech Gear
              </p>
            </div>
            <div className="column is-2">
              <img className="hero-image" src="https://image.flaticon.com/icons/png/512/1321/1321740.png" />
            </div>
          </div>
        </div>
      </section>
      <div className="searchbar mt-5">
        <div className="field has-addons">
          <div className="control">
            <input className="input" type="text" placeholder="Find a FAQ" />
          </div>
          <div className="control">
            <a className="button is-link">
              Search
            </a>
          </div>
        </div>
        <button className="button is-link ml-2" onClick={onOpenModal}>Add FAQ</button>
      </div>

      <div className="columns mt-5 pl-3 pr-3">
        <div className="column is-6 has-text-centered">

          {/* POPULAR FAQ */}
          <h1 className="title is-4">Popular FAQ</h1>
          <Accordion>
            {
              popularFaq !== null ? (popularFaq.map((faq, key) => {
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
                    </AccordionItemPanel>
                  </AccordionItem>
                )
              })) : ""
            }
          </Accordion>
        </div>
        
        {/* CUSTOMER ASKED */}
        <div className="column is-6 has-text-centered">
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
                    </AccordionItemPanel>
                  </AccordionItem>
                )
              })
            }
          </Accordion>
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <AddFaq onCloseModal={onCloseModal} />
      </Modal>
      <Footer/>
    </section>
  );
}

export default FAQPage;

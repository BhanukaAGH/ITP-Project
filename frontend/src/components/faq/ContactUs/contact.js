import React from 'react'
import './contact.css'
import emailjs from 'emailjs-com';
import Navbar from '../../layout/Navbar' 
import Footer from '../../layout/Footer' 
import '../faq.css' ;
import { useSnackbar } from 'notistack';




const ContactUs = () => {

	const { enqueueSnackbar } = useSnackbar();
	function sendEmail (e) {
		e.preventDefault();
	
		emailjs.sendForm('service_9wekzs2', 'template_kxuu8bg', e.target, 'user_bul4bVluweEoVpOi8bsNW')
		  .then((result) => {
			  console.log(result.text);
			  enqueueSnackbar("You have sent an email", {
				variant: 'success',
				autoHideDuration: 3000,
			});
		  }, (error) => {
			  console.log(error.text);
		  });
		  e.target.reset();
		 
		  
		  
	  }

    return (

       
<body id="contact-us-background-img34" >
	
<Navbar/> 
  
	<section className="hero is-fullheight" >
		<div className="hero-body">
			<div className="container has-text-centered">
				<div className="columns is-8 is-variable ">
					<div className="column is-two-thirds has-text-left">
						<h1 className="title is-1">Contact Us</h1>
						<p className="is-size-4">A Creator-friendly customer support team , that's always just a cliick away
						If you have any questions or quries a member of staff will always be happy to help . Feel free to contact us by telephone or 
						email and we will be sure to get back to you as soon as possible  </p>
						
					</div>
					<form className="column is-one-third has-text-left" onSubmit={sendEmail}>
					<div  >
						<div className="field">
							<label className="label">Name</label>
							<div className="control">
								<input className="input is-medium" type="text" placeholder="Enter your Name" name="name" required/>
							</div>
						</div> 
						<div className="field">
							<label className="label" >Email</label>
							<div className="control">
								<input className="input is-medium" type="Email" name="email" placeholder="alexsmith@gmail.com" required/>
							</div>
						</div>
						<div className="field">
							<label className="label">Subject</label>
							<div className="control">
								<input className="input is-medium" type="text" name="subject" placeholder="Subject" required/>
							</div>
						</div>
						<div className="field">
							<label className="label">Message</label>
							<div className="control">
								<textarea className="textarea is-medium" placeholder="Message" name="message" required></textarea>
							</div>
						</div>
						<div className="control" >
							<button type="submit" className="button is-link is-fullwidth has-text-weight-medium is-medium">Send Message</button>
						</div>
					</div>

					</form>
					
				</div>
			</div>
		</div>
	</section>
		<Footer/>
</body>



    )
}

export default ContactUs




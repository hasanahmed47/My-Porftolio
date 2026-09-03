import {
  useEffect,
  useRef,
} from "react";

import { transitions } from "../../../animations";

import Social from "../../../components/Social.jsx";

import "./Contact.css";


function Contact() {
  const contactElement =
    useRef(null);


  useEffect(() => {
    if (
      !contactElement.current
    ) {
      return;
    }


    transitions.contact.setup(
      contactElement.current
    );


    return () => {
      transitions.contact.destroy();
    };
  }, []);


  return (
    <div
      ref={contactElement}
      className="contact grid"
      id="contact"
    >

      <div className="contact-content">

        <h2 className="contact-title">
          Let's work
          <br />
          together!
        </h2>


        <Social
          variant="background"
        />

      </div>

    </div>
  );
}


export default Contact;
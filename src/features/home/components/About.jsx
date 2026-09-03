import {
  useEffect,
  useRef,
  useState,
} from "react";

import { transitions } from "../../../animations";

import BoxDescription from "./BoxDescription.jsx";
import BoxServices from "./BoxServices.jsx";
import BoxDetails from "./BoxDetails.jsx";
import ProgressCount from "./ProgressCount.jsx";

import "./About.css";


function About({
  spacerRef,
}) {
  const contentDescriptionRef =
    useRef(null);

  const contentServicesRef =
    useRef(null);

  const contentDetailsRef =
    useRef(null);

  const contentProgressCountRef =
    useRef(null);


  const [
    tlDescription,
    setTlDescription,
  ] = useState(null);

  const [
    tlServices,
    setTlServices,
  ] = useState(null);

  const [
    tlDetails,
    setTlDetails,
  ] = useState(null);


  useEffect(() => {
    if (
      !spacerRef ||
      !spacerRef.current ||
      !contentDescriptionRef.current ||
      !contentServicesRef.current ||
      !contentDetailsRef.current ||
      !contentProgressCountRef.current ||
      !tlDescription ||
      !tlServices ||
      !tlDetails
    ) {
      return;
    }


    transitions.about.setup({
      about:
        spacerRef.current,

      contentDescription:
        contentDescriptionRef.current,

      tlDescription,

      contentServices:
        contentServicesRef.current,

      tlServices,

      contentDetails:
        contentDetailsRef.current,

      tlDetails,

      contentProgressCount:
        contentProgressCountRef.current,
    });


    return () => {
      transitions.about.destroy();
    };
  }, [
    spacerRef,
    tlDescription,
    tlServices,
    tlDetails,
  ]);


  return (
    <div className="about-content">

      <div
        ref={contentDetailsRef}
        className="about-details"
      >
        <BoxDetails
          onTimelineCreated={
            setTlDetails
          }
        />
      </div>


      <div
        ref={contentDescriptionRef}
        className="about-description"
      >
        <BoxDescription
          onTimelineCreated={
            setTlDescription
          }
        />
      </div>


      <div
        ref={contentServicesRef}
        className="about-services"
      >
        <BoxServices
          onTimelineCreated={
            setTlServices
          }
        />
      </div>


      <div
        ref={contentProgressCountRef}
        className="about-progress-count"
      >
        <ProgressCount />
      </div>

    </div>
  );
}

export default About;
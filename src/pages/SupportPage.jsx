import { useRef, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { contactData } from "../data/index";
import PropTypes from "prop-types";

const SupportPage = ({ language }) => {
  const form = useRef();
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // Tawk.to integration
  useEffect(() => {
    // Create Tawk.to script element
    var s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/67ce66c1c7388b190b531937/1ilv42p15";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    // Append script to body
    document.body.appendChild(s1);

    // Cleanup function to remove script when component unmounts
    return () => {
      document.body.removeChild(s1);
    };
  }, []); // Empty dependency array means this runs once on mount

  const onChange = (token) => {
    setRecaptchaToken(token);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setErrorMessage(
        language === "ID"
          ? "Mohon selesaikan reCAPTCHA."
          : "Please complete the reCAPTCHA."
      );
      return;
    }

    emailjs
      .sendForm("service_9tootbq", "template_rlkp529", form.current, {
        publicKey: "M-ppLBzI5LzsdyrVU",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setErrorMessage(
            language === "ID"
              ? "Pesan berhasil dikirim!"
              : "Message sent successfully!"
          );
          form.current.reset();
          setRecaptchaToken(null);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setErrorMessage(
            language === "ID"
              ? "Gagal mengirim pesan. Silakan coba lagi."
              : "Failed to send message. Please try again."
          );
        }
      );
  };

  return (
    <div className="contact-us w-100 min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h1 className="fw-bold mb-5">{contactData[language].title}</h1>
            <Row className="g-4">
              <Col md={4}>
                <div className="contact-info">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    size="3x"
                    className="mb-3"
                  />
                  <h4>{contactData[language].address.title}</h4>
                  <p className="p-alamat">
                    {contactData[language].address.detail}
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="contact-info">
                  <FontAwesomeIcon icon={faPhone} size="3x" className="mb-3" />
                  <h4>{contactData[language].phone.title}</h4>
                  <p>{contactData[language].phone.detail}</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="contact-info">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size="3x"
                    className="mb-3"
                  />
                  <h4>{contactData[language].email.title}</h4>
                  <p>{contactData[language].email.detail}</p>
                </div>
              </Col>
            </Row>
            <Form
              className="mt-5"
              ref={form}
              onSubmit={sendEmail}
              noValidate // Menonaktifkan validasi bawaan
            >
              <Row className="g-3">
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="user_name"
                    placeholder={contactData[language].form.namePlaceholder}
                    required
                    className="custom-input"
                    autoComplete="off" // Menonaktifkan autocomplete
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="email_name"
                    placeholder={contactData[language].form.emailPlaceholder}
                    required
                    className="custom-input"
                    autoComplete="off" // Menonaktifkan autocomplete
                  />
                </Col>
                <Col md={12}>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    placeholder={contactData[language].form.messagePlaceholder}
                    required
                    className="custom-input"
                    autoComplete="off" // Menonaktifkan autocomplete
                  />
                </Col>

                {errorMessage && (
                  <Col md={12}>
                    <div className="error-message">{errorMessage}</div>
                  </Col>
                )}

                <Col md={12}>
                  <div className="recaptcha-container">
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={onChange}
                      theme="light"
                      size="normal"
                    />
                  </div>
                </Col>

                <Col md={12} className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className="cta-support"
                    value="Send"
                    disabled={!recaptchaToken}>
                    {contactData[language].form.submitButton}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

SupportPage.propTypes = {
  language: PropTypes.string.isRequired,
};

export default SupportPage;

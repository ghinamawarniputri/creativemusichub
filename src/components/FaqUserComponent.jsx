import { Container, Row, Col, Accordion } from "react-bootstrap";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const FaqUserComponent = ({ language }) => {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get("/faq");
        // Filter FAQ berdasarkan status "Published"
        const publishedFaqs = response.data.filter(
          (faq) => faq.status === "Published"
        );
        setFaqs(publishedFaqs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (isLoading) {
    return <div>Loading FAQs...</div>;
  }

  return (
    <div className="faq">
      <Container>
        <Row>
          <Col>
            <h2 className="text-center fw-bold h2-faq">
              {language === "EN"
                ? "Frequently Asked Questions"
                : language === "SD"
                ? "Patarosan anu Sering Ditaroskeun"
                : "Pertanyaan yang Sering Diajukan"}
            </h2>
          </Col>
        </Row>
        <Row className="row-cols-lg-2 row-cols-1 g-4 pt-5">
          {faqs.map((data) => (
            <Col key={data.id}>
              <Accordion className="shadow-sm">
                <Accordion.Item eventKey={data.id.toString()}>
                  <Accordion.Header>
                    {language === "EN"
                      ? data.question_en
                      : language === "SD"
                      ? data.question_sd
                      : data.question_id}
                  </Accordion.Header>
                  <Accordion.Body className="faq-answer">
                    {language === "EN"
                      ? data.answer_en
                      : language === "SD"
                      ? data.answer_sd
                      : data.answer_id}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

FaqUserComponent.propTypes = {
  language: PropTypes.string.isRequired,
};

export default FaqUserComponent;

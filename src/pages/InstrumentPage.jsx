import { useRef, useEffect } from "react";
import ProductDescComponent from "../components/ProductDescComponent";
import HowItWorksComponent from "../components/HowItWorksComponent";
import PriceListComponent from "../components/PriceListComponent";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../style/produk-2.css";
import backgroundImage from "../assets/Frame-2.png";
import { instrumentSectionData } from "../data/index";
import PropTypes from "prop-types";

const InstrumentPage = ({ language }) => {
  const priceListRef = useRef(null);

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

  const scrollToPriceList = () => {
    priceListRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="instrument-page">
      <div
        className="product-page"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Container>
          <Row className="text-center pt-5">
            <Col>
              <div className="tulisan">
                <h1
                  className="headline"
                  dangerouslySetInnerHTML={{
                    __html: instrumentSectionData[language].headline + "🎸 ",
                  }}
                />
                <p className="subtext">
                  {instrumentSectionData[language].subtext}
                </p>
                <Button
                  className="btn btn-primary instrument-btn"
                  onClick={scrollToPriceList}>
                  {instrumentSectionData[language].buttonText}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Content Section */}
      <Container>
        <Row className="text-center pt-5">
          <Col className="py-5">
            <ProductDescComponent page="instrument" language={language} />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <HowItWorksComponent page="instrument" language={language} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div ref={priceListRef}>
              <PriceListComponent page="instrument" language={language} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

InstrumentPage.propTypes = {
  language: PropTypes.string.isRequired,
};

export default InstrumentPage;

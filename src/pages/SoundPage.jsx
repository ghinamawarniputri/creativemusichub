import { useRef, useEffect} from "react";
import ProductDescComponent from "../components/ProductDescComponent";
import HowItWorksComponent from "../components/HowItWorksComponent";
import PriceListComponent from "../components/PriceListComponent";
import { Container, Row, Col } from "react-bootstrap";
import "../style/produk-3.css";
import pict1 from "../assets/pict1.png";
import pict2 from "../assets/pict2.png";
import pict3 from "../assets/pict3.png";

import { soundEffectSectionData } from "../data/index";
import PropTypes from "prop-types";

const SoundPage = ({ language }) => {
  const priceListRef = useRef(null);

  // Tawk.to integration
  useEffect(() => {
    // Create Tawk.to script element
    var s1 = document.createElement("script");
    s1.async = true;
    s1.src = 'https://embed.tawk.to/67ce66c1c7388b190b531937/1ilv42p15';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
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
    <div className="sound-page">
      {/* Header */}
      <div className="page text-center">
        <Row className="justify-content-center pt-5">
          <Col md={10}>
            <h2
              className="judul"
              dangerouslySetInnerHTML={{
                __html: soundEffectSectionData[language].title +  "🎧 " ,
              }}
            />
          </Col>
        </Row>

        {/* Gambar & Button */}
        <Row className="justify-content-center mt-4">
          <Col md={3} className="d-flex flex-column align-items-center">
            <img
              src={pict1}
              className="img-fluid rounded shadow-lg"
              alt="Create"
            />
            <div className="custom-container mt-3 w-75 text-center py-2">
              {soundEffectSectionData[language].div.create}
            </div>
          </Col>
          <Col md={3} className="d-flex flex-column align-items-center">
            <img
              src={pict2}
              className="img-fluid rounded shadow-lg"
              alt="Process"
            />
            <div className="custom-container mt-3 w-75 text-center py-2">
              {soundEffectSectionData[language].div.process}
            </div>
          </Col>
          <Col md={3} className="d-flex flex-column align-items-center">  
            <img
              src={pict3}
              className="img-fluid rounded shadow-lg"
              alt="Result"
            />
            <div className="custom-container mt-3 w-75 text-center py-2">
              {soundEffectSectionData[language].div.result}
            </div>
          </Col>
        </Row>

        {/* Button Utama */}
        <Row className="justify-content-center mt-5">
          <Col md={6} className="d-flex justify-content-center">
            <button
              className="btn-sound px-5 py- fw-bold"
              onClick={scrollToPriceList}
            >
              {soundEffectSectionData[language].buttons.mainButton}
            </button>
          </Col>
        </Row>
      </div>

      {/* Komponen Tambahan */}
      <Container>
        <Row className="text-center pt-5">
          <Col className="py-5">
            <ProductDescComponent page="sound" language={language} />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <HowItWorksComponent page="sound" language={language} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div ref={priceListRef}>
              <PriceListComponent page="sound" language={language} />
            </div>  
          </Col>
        </Row>
      </Container>
    </div>
  );
};

SoundPage.propTypes = {
  language: PropTypes.string.isRequired,
};

export default SoundPage;

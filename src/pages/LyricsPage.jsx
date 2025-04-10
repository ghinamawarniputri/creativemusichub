import { useRef, useEffect} from "react";
import ProductDescComponent from "../components/ProductDescComponent";
import HowItWorksComponent from "../components/HowItWorksComponent";
import PriceListComponent from "../components/PriceListComponent";
import { Container, Row, Col } from "react-bootstrap";
import myImage from "../assets/Frame1.png";
import "../style/produk-1.css";
import { musicSectionData, musicInspirationData } from "../data/index";
import PropTypes from "prop-types";

const LyricsPage = ({ language }) => {
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
    <div className="lyrics-page">
      <div className="product-wrapper">
        <Container fluid className="music-container">
          <Row className="d-flex flex-column flex-md-row align-items-center">
            {/* Kolom Kiri - Gambar */}
            <Col md={6} className="image-section">
              <div className="image-overlay">
                <img
                  src={myImage}
                  alt="Music Inspiration"
                  className="music-image img-fluid"
                />
                <div className="overlay-content">
                  <h2 className="song-title">
                    {musicSectionData[language].songTitle}
                  </h2>
                  <div className="music-controls">
                    <button className="btn btn-outline-light">
                      {musicSectionData[language].playButton}
                    </button>
                    <button className="btn btn-outline-light">
                      {musicSectionData[language].pauseButton}
                    </button>
                    <button className="btn btn-outline-light">
                      {musicSectionData[language].stopButton}
                    </button>
                  </div>
                  <button className="btn btn-success download-btn">
                    {musicSectionData[language].downloadButton}
                  </button>
                </div>
              </div>
            </Col>
            {/* Kolom Kanan - Konten */}
            <Col md={6} className="music-section">
              <div className="music-content">
                <h3
                  className="inspiration-title"
                  dangerouslySetInnerHTML={{
                    __html: musicInspirationData[language].title +  "✍️ ",
                  }}
                />
                <p className="inspiration-text">
                  {musicInspirationData[language].text}
                </p>
                <h4
                  className="ai-title"
                  dangerouslySetInnerHTML={{
                    __html: musicInspirationData[language].aiTitle,
                  }}
                />
                  <div className="lyric-input-container"> 
    <textarea
      className="form-lyric lyric-input"
      placeholder={musicInspirationData[language].lyricPlaceholder}
    ></textarea>
    <button
      className="btn-lyric btn-primary create-btn"
      onClick={scrollToPriceList}
    >
      {musicInspirationData[language].createButton}
    </button>
  </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row className="text-center pt-5">
          <Col className="py-5">
            <ProductDescComponent page="lyrics" language={language} />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <HowItWorksComponent page="lyrics" language={language} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div ref={priceListRef}>
              <PriceListComponent page="lyrics" language={language} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

LyricsPage.propTypes = {
  language: PropTypes.string.isRequired,
};

export default LyricsPage;

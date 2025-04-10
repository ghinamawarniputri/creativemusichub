import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import SoundCloudPlayer from "../components/SoundCloudPlayer";
import { portfolioDescriptions } from "../data/index.js";

const genres = ["All", "Accoustic", "Dubstep", "Jazz", "Pop", "Progressive", "Sundanese"];

// eslint-disable-next-line no-empty-pattern
const PortfolioPage = ({ language }) => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  
  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:1000/portfolios");
        console.log("Fetched portfolios:", response.data); // 🔹 Debugging output
        setPortfolios(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching portfolios:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPortfolios();
  }, []);
  

  const filteredPortfolios =
    selectedGenre === "All"
      ? portfolios
      : portfolios.filter((item) => item.genre === selectedGenre);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="portfolio-page">
        <Container>
          <Row>
            <Col>
              <h1 className="h1-portfolio">
                🎼 Portfolio 🎼
              </h1>
            </Col>
          </Row>
          <Row className="mb-4 text-center">
            {genres.map((genre) => (
              <Col key={genre}>
                <Button
                  variant={selectedGenre === genre ? "light" : "outline-light"}
                  onClick={() => setSelectedGenre(genre)}
                  className="m-1"
                >
                  {genre}
                </Button>
              </Col>
            ))}
          </Row>
          <Row className="header-content g-4">
            {filteredPortfolios.map((item) => (
              <Col key={item.id} sm={6} md={4}>
                <div className="video-card shadow-sm rounded p-3 bg-dark text-light">
                  <div className="song-title-container">
                    <h4 className="fw-bold my-2 text-uppercase" style={{ letterSpacing: "2px" }}>
                      {item.name}
                    </h4>
                    <div className="song-tooltip">
                      <strong>Genre:</strong> {item.genre}<br/>
                      {portfolioDescriptions[language][item.name]}
                    </div>
                  </div>
                  <SoundCloudPlayer embedUrl={item.link} />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
    </div>
  );
};

PortfolioPage.propTypes = {
  language: PropTypes.string.isRequired,
};

export default PortfolioPage;
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGlobe, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import PropTypes from "prop-types";
import { creativeMusicHubData } from "../data/index.js";

const FooterComponent = ({ language }) => {
  const [footerData, setFooterData] = useState([]);
  const [visitors, setVisitors] = useState(0);
  const hasIncremented = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/footers");
        setFooterData(response.data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchData();

    const fetchVisitors = async () => {
      try {
        const response = await axios.get("http://creativemusichub.com/api/visitors.php");
        setVisitors(response.data.count);

        if (
          !hasIncremented.current &&
          window.location.origin === "http://localhost:5173" &&
          window.location.pathname === "/"
        ) {
          await axios.post("http://localhost:1000/visitors");
          hasIncremented.current = true;
        }

        setTimeout(() => {
          const counterWidget = document.querySelector(
            ".elfsight-app-954f2dc6-9353-4086-83d2-32455852907f"
          );
          if (counterWidget) {
            const counterText = counterWidget.querySelector("span");
            if (counterText) {
              counterText.textContent = response.data.count.toLocaleString();
            }
          }
        }, 2000);
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      }
    };

    fetchVisitors();
  }, []);

  const handleSocialClick = (link) => {
    window.open(link, "_blank");
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="footer">
      <Container>
        <Row className="d-flex justify-content-between">
          {footerData.map((footer, index) => (
            <React.Fragment key={index}>
              <Col>
                <h3 className="fw-bold">
                  CreativeMusic<span className="hub">Hub</span>
                </h3>
                <p className="desc">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ marginRight: "8px" }}
                  />
                  {language === "EN" 
                    ? footer.address_en 
                    : language === "SD"
                      ? footer.address_sd
                      : footer.address_id}
                </p>
                <div className="no mb-1 mt-2">
                  <Link className="text-decoration-none">
                    <FontAwesomeIcon
                      icon={faWhatsapp}
                      style={{ marginRight: "8px" }}
                    />
                    <p className="m-0">{footer.phone}</p>
                  </Link>
                </div>
                <div className="mail">
                  <Link className="text-decoration-none">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ marginRight: "8px" }}
                    />
                    <p className="m-0">{footer.email}</p>
                  </Link>
                </div>
                <div className="social mt-3">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{ marginRight: "12px", cursor: "pointer" }}
                    onClick={() => handleSocialClick(footer.instagram_link)}
                  />
                  <FontAwesomeIcon
                    icon={faGlobe}
                    style={{ marginRight: "12px", cursor: "pointer" }}
                    onClick={() => handleSocialClick(footer.website_link)}
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEmailClick(footer.email)}
                  />
                </div>
              </Col>
              <Col className="d-flex flex-column col-lg-4 col mt-lg-0 mt-5">
                <h5 className="fw-bold">
                  {language === "EN" 
                    ? "Our Products" 
                    : language === "SD"
                      ? "Produk Urang"
                      : "Produk Kami"}
                </h5>
                {footerData.map((footer, index) => (
                  <React.Fragment key={index}>
                    <Link to={footer[`product1_link_${language.toLowerCase()}`] || footer.product1_link_id}>
                      {footer[`product1_name_${language.toLowerCase()}`] || footer.product1_name_id}
                    </Link>
                    <Link to={footer[`product2_link_${language.toLowerCase()}`] || footer.product2_link_id}>
                      {footer[`product2_name_${language.toLowerCase()}`] || footer.product2_name_id}
                    </Link>
                    <Link to={footer[`product3_link_${language.toLowerCase()}`] || footer.product3_link_id}>
                      {footer[`product3_name_${language.toLowerCase()}`] || footer.product3_name_id}
                    </Link>
                    <Link to={footer[`product4_link_${language.toLowerCase()}`] || footer.product4_link_id}>
                      {footer[`product4_name_${language.toLowerCase()}`] || footer.product4_name_id}
                    </Link>
                  </React.Fragment>
                ))}
              </Col>
              <Col className="d-flex flex-column col-lg-3 col mt-lg-0 mt-5">
                <h5 className="fw-light">
                  {language === "EN" 
                    ? "Total Visitors: "
                    : language === "SD"
                      ? "Total Pangunjung: "
                      : "Total Pengunjung: "}
                  <span className="pengunjung">{visitors.toLocaleString()}</span>
                </h5>
                <div
                  className="elfsight-app-954f2dc6-9353-4086-83d2-32455852907f"
                  data-elfsight-app-lazy
                  data-elfsight-counter-value={visitors}></div>
              </Col>
            </React.Fragment>
          ))}
        </Row>
        <Row>
          <Col>
            <p className="text-center px-md-0 px-3">
              &copy; Copyright {new Date().getFullYear()} ku{" "}
              <span className="fw-bold">Creative Music Hub</span>, 
              {language === "SD" ? " Sadaya Hak Dipiara" : " All Right Reserved"}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="footer-links text-center">
              {creativeMusicHubData[language]?.footerTexts.map((text, index) => (
                <Link 
                  key={index}
                  to={index === 0 ? "/privacy-policy" : index === 1 ? "/terms-of-use" : "/sitemap"}
                  className={index !== 2 ? "me-3" : ""}>
                  {text}
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

FooterComponent.propTypes = {
  language: PropTypes.string.isRequired,
};

export default FooterComponent;

import { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import LogoCMH from "../assets/CMH-LOGO.jpg";

const NavbarComponent = ({ language, setLanguage }) => {
  const [scroll, setScroll] = useState(false);
  const location = useLocation();
  const [navData, setNavData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("https://creativemusichub.com/api/headers.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Navbar Data Fetched:", data);
        setNavData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching navbar data:", err);
        setIsLoading(false);
      });
  }, []);

  const getLanguageContent = (item) => {
    switch (language) {
      case "EN":
        return item.content_en;
      case "SD":
        return item.content_sd || item.content_id;
      default:
        return item.content_id;
    }
  };

  const getDropdownItems = (parentId) => {
    return navData.filter((item) => item.parent_id === parentId);
  };

  if (isLoading) {
    return (
      <Navbar
        expand="lg"
        fixed="top"
        className={scroll ? "navbar navbar-active" : "navbar"}>
        <Container>
          <Navbar.Brand href="#home" className="fs-3 fw-bold">
          <img src={LogoCMH} alt="Creative Music Hub Logo" width="150" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <p>Loading menu...</p>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={scroll ? "navbar navbar-active" : "navbar"}>
      <Container>
        <Navbar.Brand href="#home" className="fs-3 fw-bold">
        <img src={LogoCMH} alt="Creative Music Hub Logo" width="150" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {navData
              .filter((item) => item.parent_id === null)
              .map((link) => {
                console.log("🔹 Navbar Item:", link);
                const dropdownItems = getDropdownItems(link.id);
                return (
                  <div className="nav-item" key={link.id}>
                    {dropdownItems.length > 0 ? (
                  <NavDropdown
                  title={
                    <span className="nav-btn">
                      {getLanguageContent(link)}
                      <FontAwesomeIcon icon={faChevronRight} className="dropdown-arrow ms-2" />
                    </span>
                  }
                  id={`dropdown-${link.id}`}
                  className="custom-dropdown"
                  >
                  {dropdownItems.map((item) => (
                    <NavDropdown.Item key={item.id} href={item.path} className="dropdown-item-btn">
                      {getLanguageContent(item)}
                    </NavDropdown.Item>
                  ))}
                  </NavDropdown>
                   ) : (
                  <Nav.Link
                  href={link.path}
                  className={`nav-btn mx-2 ${location.pathname === link.path ? "active" : ""}`}
                  >
                  {getLanguageContent(link)}
                  </Nav.Link>
                    )}
                  </div>
                );
              })}
          </Nav>

          <div className="text-center">
            <button
              className="btn-language btn-outline-warning rounded-1"
              onClick={() => {
                setLanguage((prev) => {
                  if (prev === "ID") return "EN";
                  if (prev === "EN") return "SD";
                  return "ID";
                });
              }}>
              {language}
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavbarComponent.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

export default NavbarComponent;

import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaInfoCircle,
  FaCamera,
  FaGraduationCap,
  FaSignOutAlt,
  FaBars,
  FaChevronDown,
  FaDesktop,
  FaEllipsisH,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/CMH-LOGO.jpg";
import lirikIcon from "../assets/lirik.png";
import instrumenIcon from "../assets/instrumen.png";
import efekSuaraIcon from "../assets/efek_suara.png";
import "../style/sidebar.css";
import axios from "axios";

const SideBarComponent = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    return savedState ? JSON.parse(savedState) : true;
  });

  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(""); // Simpan menu yang aktif

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
    setActiveItem("produk"); // Set aktif saat klik produk
  };

  const handleKeluar = async () => {
    try {
      await axios.post("/admin/logout"); // Kirim permintaan ke server
      localStorage.removeItem("adminToken"); // Hapus token setelah berhasil logout
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Tambahkan penanganan error, misalnya menampilkan pesan ke pengguna
    }
  };

  const handleProductClick = (product) => {
    setActiveItem(product);
    navigate(`/admin/produk/${product}`);
  };

  const handleNavClick = (e, path, menu) => {
    e.preventDefault();
    setActiveItem(menu);
    navigate(path);
  };

  return (
    <>
      <div className={`sidebar-wrapper ${isOpen ? "open" : "closed"}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <div className="sidebar-container">
          <div className="logo-container">
            <img
              src={logo}
              alt="Logo"
              className="logo"
            />
          </div>

          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link
                href="#"
                className={`nav-link ${activeItem === "beranda" ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, "/admin", "beranda")}>
                <FaHome className="icon" />
                <span className="link-text">Beranda</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#"
                className={`nav-link ${activeItem === "produk" ? "active" : ""}`}
                onClick={toggleProductDropdown}>
                <FaCamera className="icon" />
                <span className="link-text">Transaksi</span>
                <FaChevronDown className="dropdown-icon" />
              </Nav.Link>
              <div
                className={`product-dropdown ${
                  isProductDropdownOpen ? "open" : ""
                }`}>
                <Nav.Link
                  href="#"
                  className={`nav-link sub-menu ${
                    activeItem === "lirik" ? "active" : ""
                  }`}
                  onClick={() => handleProductClick("lirik")}>
                  <img src={lirikIcon} alt="Lirik" className="menu-icon" />
                  <span className="link-text">Lirik</span>
                </Nav.Link>
                <Nav.Link
                  href="#"
                  className={`nav-link sub-menu ${
                    activeItem === "instrumen" ? "active" : ""
                  }`}
                  onClick={() => handleProductClick("instrumen")}>
                  <img
                    src={instrumenIcon}
                    alt="Instrumen"
                    className="menu-icon"
                  />
                  <span className="link-text">Instrumen</span>
                </Nav.Link>
                <Nav.Link
                  href="#"
                  className={`nav-link sub-menu ${
                    activeItem === "efek-suara" ? "active" : ""
                  }`}
                  onClick={() => handleProductClick("efek-suara")}>
                  <img
                    src={efekSuaraIcon}
                    alt="Efek Suara"
                    className="menu-icon"
                  />
                  <span className="link-text">Efek Suara</span>
                </Nav.Link>
              </div>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#"
                className={`nav-link ${
                  activeItem === "portofolio" ? "active" : ""
                }`}
                onClick={(e) =>
                  handleNavClick(e, "/tabelportofolio", "portofolio")
                }>
                <FaGraduationCap className="icon" />
                <span className="link-text">Portofolio</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#"
                className={`nav-link ${activeItem === "header" ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, "/adminheader", "header")}>
                <FaDesktop className="icon" />
                <span className="link-text">Header</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#"
                className={`nav-link ${activeItem === "footer" ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, "/adminfooter", "footer")}>
                <FaEllipsisH className="icon" />
                <span className="link-text">Footer</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="#"
                className={`nav-link ${activeItem === "faq" ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, "/admin/faq", "faq")}>
                <FaInfoCircle className="icon" />
                <span className="link-text">FAQ</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <div className="logout">
            <Nav.Item>
              <Nav.Link href="#" className="nav-link" onClick={handleKeluar}>
                <FaSignOutAlt className="icon" />
                <span className="link-text">Keluar</span>
              </Nav.Link>
            </Nav.Item>
          </div>
        </div>
      </div>
      <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      <div className={`main-content ${!isOpen ? 'sidebar-closed' : ''}`}>
        {/* konten utama */}
      </div>
    </>
  );
};

export default SideBarComponent;

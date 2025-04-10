const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "your_mysql_host.com", // Ganti ini (lihat di bawah)
  user: "cref8549_cmh",
  password: "creativemusichub",
  database: "cref8549_creativemusichub",
});

db.connect(err => {
  if (err) throw err;
  console.log("Database connected!");
});

app.get("/api/headers", (req, res) => {
  db.query("SELECT * FROM headers", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import NavbarComponent from "./components/NavbarComponent";
import FaqUserComponent from "./components/FaqUserComponent";
import FooterComponent from "./components/FooterComponent";
import CboxChat from "./components/CboxChat";

import HomePage from "./pages/HomePage";
import SupportPage from "./pages/SupportPage";
import PortfolioPage from "./pages/PortfolioPage";
import LyricsPage from "./pages/LyricsPage";
import InstrumenPage from "./pages/InstrumentPage";
import SoundPage from "./pages/SoundPage";
import Dashboard from "./pages/Dashboard";
import AdminLoginPage from "./pages/AdminLoginPage";
import ModalForm from "./pages/ModalForm";
import FaqPage from "./pages/FaqPage";
import TabelPortofolio from "./pages/Adminportofolio";
import AdminProduk from "./pages/AdminProduk";
import AdminHeaderTable from "./pages/AdminHeader";
import AdminFooterTable from "./pages/AdminFooter";
import TransactionDetails from "./pages/TransactionDetails";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:1000";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("ID");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("/admin/protected");
        console.log("Protected route response:", response);
        if (response.status === 200) {
          console.log("Admin is logged in");
          setIsAdminLoggedIn(true);
        }
      } catch (error) {
        console.log("Admin is not logged in:", error);
        setIsAdminLoggedIn(false);
        if (
          location.pathname.startsWith("/admin") &&
          location.pathname !== "/admin/login"
        ) {
          navigate("/admin/login");
        }
      }
    };
    checkLogin();
  }, [navigate, location.pathname]);

  const handleAdminLogin = () => {
    console.log("handleAdminLogin called");
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = async () => {
    try {
      await axios.post("/admin/logout");
      setIsAdminLoggedIn(false);
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Define public routes where FAQ for users should be displayed
  const publicRoutes = [
    "/",
    "/support",
    "/portfolio",
    "/musik-lyric",
    "/musik-instrument",
    "/sound-effect",
  ];

  const isAdminPage =
    (location.pathname.startsWith("/admin") &&
      location.pathname !== "/admin/login") ||
    location.pathname === "/tabelportofolio" ||
    location.pathname === "/adminheader" ||
    location.pathname === "/adminfooter";

  const hideNavbarFooter =
    isAdminPage ||
    location.pathname === "/checkout" ||
    location.pathname === "/admin/login" ||
    location.pathname === "/transaction-details";

  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.includes(location.pathname);

  return (
    <div>
      {/* Display Navbar only if it's not an admin page or checkout page */}
      {!hideNavbarFooter && (
        <NavbarComponent language={language} setLanguage={setLanguage} />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage language={language} />} />
        <Route path="/support" element={<SupportPage language={language} />} />
        <Route
          path="/portfolio"
          element={<PortfolioPage language={language} />}
        />
        <Route
          path="/musik-lyric"
          element={<LyricsPage language={language} />}
        />
        <Route
          path="/musik-instrument"
          element={<InstrumenPage language={language} />}
        />
        <Route
          path="/sound-effect"
          element={<SoundPage language={language} />}
        />
        <Route path="/checkout" element={<ModalForm />} />
        <Route path="/transaction-details" element={<TransactionDetails />} />

        {/* Admin Login Page */}
        <Route
          path="/admin/login"
          element={
            <AdminLoginPage onLogin={handleAdminLogin} language={language} />
          }
        />

        {/* Admin Dashboard and Pages */}
        {isAdminLoggedIn ? (
          <>
            <Route
              path="/admin/*"
              element={
                <Dashboard language={language} onLogout={handleAdminLogout} />
              }
            />
            <Route
              path="/admin/faq"
              element={<FaqPage language={language} />}
            />

            {/* Tabel Portofolio */}
            <Route
              path="/tabelportofolio"
              element={<TabelPortofolio language={language} />}
            />

            {/* Tabel Produk */}
            <Route
              path="/admin/produk/:product"
              element={<AdminProduk language={language} />}
            />

            {/* Tabel Header */}
            <Route
              path="/adminheader"
              element={<AdminHeaderTable language={language} />}
            />

            {/* Tabel Footer */}
            <Route path="/adminfooter" element={<AdminFooterTable />} />
          </>
        ) : (
          <Route
            path="/admin/*"
            element={
              <AdminLoginPage onLogin={handleAdminLogin} language={language} />
            }
          />
        )}
      </Routes>

      {/* Display Footer only for public pages */}
      {!hideNavbarFooter && <CboxChat />}

      {/* Display FAQ for users on all public routes */}
      {isPublicRoute && <FaqUserComponent language={language} />}

      {/* Display Footer only for public pages */}
      {!hideNavbarFooter && <FooterComponent language={language} />}
    </div>
  );
}

export default App;

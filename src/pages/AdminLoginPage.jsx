import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/CMH-LOGO.jpg";
import "../style/admin.css";
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";

function AdminLoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    const onChange = (token) => {
        setRecaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMessage("Username dan password wajib diisi.");
            return;
        }

        if (!recaptchaToken) {
            setErrorMessage("Mohon selesaikan reCAPTCHA.");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/admin/login`, {
                username,
                password,
                recaptchaToken,
            });

            if (response.status === 200) {
                console.log("Login berhasil, menuju /admin");
                onLogin();
                sessionStorage.setItem("justLoggedIn", "true"); // Simpan status login
                navigate("/admin");
            } else {
                setErrorMessage("Login gagal. Silakan coba lagi.");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage("Username atau password salah.");
            } else {
                console.error("Terjadi kesalahan saat login:", error);
                setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-form">
                <img src={logo} alt="CreativeMusicHub" className="logo" />
                <p className="subtext">Masukan Username dan Password</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="text"
                            placeholder="Username Anda"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Kata Kunci Anda"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <div className="recaptcha-container">
                        <ReCAPTCHA
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={onChange}
                            theme="light"
                            size="normal"
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Masuk
                    </button>
                </form>
            </div>
        </div>
    );
}

AdminLoginPage.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default AdminLoginPage;
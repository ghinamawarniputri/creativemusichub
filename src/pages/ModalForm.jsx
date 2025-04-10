import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import HeroImage from "../assets/music-1.jpg";
import { checkout } from "../components/Checkoutmodal";
import { products } from "../data/index";
import ReCAPTCHA from "react-google-recaptcha";

const ModalForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, page, language } = location.state || {};
  const recaptchaRef = useRef(null);

  const currentPlan = products[language]?.find(
    (product) => product.category === page && product.id === plan?.id
  );

  const [formData, setFormData] = useState({
    id: currentPlan?.id || plan?.id || null,
    item: currentPlan?.name || plan?.name || "",
    email: "",
    name: "",
    whatsapp: "",
    price: currentPlan?.price || plan?.price || 0,
    lyrics: "",
    instrument: "",
    soundEffect: "",
  });

  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    if (!page || !language || !plan) {
      navigate("/");
    }
  }, [page, language, plan, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    if (formErrors.recaptcha) {
      setFormErrors({ ...formErrors, recaptcha: "" });
    }
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = "Email harus diisi";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Format email tidak valid";
    }

    if (!formData.name) {
      errors.name = "Nama harus diisi";
    }

    if (!formData.whatsapp) {
      errors.whatsapp = "WhatsApp harus diisi";
    } else if (!/^\d+$/.test(formData.whatsapp)) {
      errors.whatsapp = "WhatsApp hanya boleh berisi angka";
    }

    // Validasi tambahan berdasarkan jenis modal form
    if (page === "lirik" && !formData.lyrics) {
      errors.lyrics = "Lirik harus diisi";
    }
    if (page === "instrumen" && !formData.instrument) {
      errors.instrument = "Instrumen harus diisi";
    }
    if (page === "soundEffect" && !formData.soundEffect) {
      errors.soundEffect = "Sound effect harus diisi";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async () => {
    if (!recaptchaToken) {
      setAlertMessage("Mohon selesaikan reCAPTCHA sebelum melanjutkan.");
      return;
    }

    if (isSubmitting) return;

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const formDataToSend = {
          ...formData,
          item_id: parseInt(formData.id, 10),
          id: parseInt(formData.id, 10),
          recaptchaToken: recaptchaToken,
        };

        const checkoutResult = await checkout(formDataToSend);

        if (checkoutResult) {
          navigate("/transaction-details", {
            state: { transactionData: formDataToSend },
          });
        }
      } catch (error) {
        console.error("Checkout error:", error);
        setAlertMessage(
          "Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi."
        );
      } finally {
        setIsSubmitting(false);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
          setRecaptchaToken(null);
        }
      }
    }
  };

  return (
    <div className="modal-form">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="form-card">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="back-link border-0 bg-transparent">
                ← Kembali
              </button>
              <img
                src={HeroImage}
                alt="Music Preview"
                className="preview-image"
              />
              <div className="form-content">
                <h2 className="form-title">Data Pemesanan:</h2>
                {alertMessage && (
                  <div className="alert alert-danger">{alertMessage}</div>
                )}
                <form
                  className="checkout-form"
                  onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.email && (
                    <p className="error">{formErrors.email}</p>
                  )}
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.name && (
                    <p className="error">{formErrors.name}</p>
                  )}
                  <input
                    type="text"
                    name="whatsapp"
                    placeholder="No. WhatsApp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.whatsapp && (
                    <p className="error">{formErrors.whatsapp}</p>
                  )}

                  {/* Tampilkan input field berdasarkan jenis modal form */}
                  {page === "lyrics" && (
                    <>
                      <p>
                        <strong>Masukkan Lirik Lagu:</strong>
                        <textarea
                          name="lyrics"
                          onChange={handleChange}
                          required
                          style={{ width: "100%", minHeight: "100px" }} // Tambahkan style untuk textarea
                        />
                      </p>
                      {formErrors.lyrics && (
                        <p className="error">{formErrors.lyrics}</p>
                      )}
                    </>
                  )}
                  {page === "instrument" && (
                    <>
                      <p>
                        <strong>Masukkan Instrumen:</strong>
                        <input
                          type="text"
                          name="instrument"
                          onChange={handleChange}
                          required
                          style={{ width: "100%" }} // Tambahkan style untuk input
                        />
                      </p>
                      {formErrors.instrument && (
                        <p className="error">{formErrors.instrument}</p>
                      )}
                    </>
                  )}
                  {page === "sound" && (
                    <>
                      <p>
                        <strong>Masukkan Efek Musik Yang anda inginkan:</strong>
                        <input
                          type="text"
                          name="soundEffect"
                          onChange={handleChange}
                          required
                          style={{ width: "100%" }} // Tambahkan style untuk input
                        />
                      </p>
                      {formErrors.soundEffect && (
                        <p className="error">{formErrors.soundEffect}</p>
                      )}
                    </>
                  )}

                  <div className="order-summary">
                    <p>Item: {formData.item}</p>
                    <p>
                      Total:{" "}
                      <strong>
                        Rp.{formData.price.toLocaleString("id-ID")}
                      </strong>
                    </p>
                  </div>
                  <div className="recaptcha-container-2">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      onChange={handleRecaptchaChange}
                      theme="light"
                      size="normal"
                    />
                  </div>
                  <button
                    type="button"
                    className="submit-button"
                    onClick={handleCheckout}>
                    {isSubmitting ? "Memproses..." : "Pilih Pembayaran"}
                  </button>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ModalForm;

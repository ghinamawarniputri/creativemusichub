import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import SideBarComponent from "../components/SideBarComponent";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import "../style/tabelportfolio.css";
import axios from "axios";

const PortfolioTable = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    genre: "",
    link: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:1000/portfolios");
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

  const handleShow = (
    portfolio = { id: null, name: "", genre: "", link: "" }
  ) => {
    setForm(portfolio);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (form.id) {
        await axios.put(`http://localhost:1000/portfolios/${form.id}`, form);
      } else {
        await axios.post("http://localhost:1000/portfolios", form);
      }
      handleClose();
      // Refresh data after successful submit
      const response = await axios.get("http://localhost:1000/portfolios");
      setPortfolios(response.data);
    } catch (error) {
      console.error("Error submitting portfolio:", error);
      setError("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/portfolios/${id}`);
      // Refresh data after successful delete
      const response = await axios.get("http://localhost:1000/portfolios");
      setPortfolios(response.data);
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      setError("Terjadi kesalahan saat menghapus data.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <SideBarComponent />
      <div className="dashboard-content">
        <MainHeader />
        <div className="dashboard-content-isi" style={{ flex: 1, padding: "30px" }}>
          <h2>CRUD Portfolio</h2>
          <Button 
            onClick={() => handleShow()}
            className="button-tambah"
          >
            Tambah Portfolio
          </Button>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Genre</th>
                <th>Link</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {portfolios.map((portfolio) => (
                <tr key={portfolio.id}>
                  <td>{portfolio.id}</td>
                  <td>{portfolio.name}</td>
                  <td>{portfolio.genre}</td>
                  <td>
                    <a href={portfolio.link} target="_blank" rel="noopener noreferrer">
                      {portfolio.link}
                    </a>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleShow(portfolio)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(portfolio.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {form.id ? "Edit Portfolio" : "Tambah Portfolio"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Genre</Form.Label>
                  <Form.Select
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                  >
                    <option value="">Pilih Genre</option>
                    <option value="Accoustic">Accoustic</option>
                    <option value="Dubstep">Dubstep</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Pop">Pop</option>
                    <option value="Progressive">Progressive</option>
                    <option value="Sundanese">Sundanese</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="text"
                    name="link"
                    value={form.link}
                    onChange={handleChange}
                    placeholder="Masukkan link lagu dari SoundCloud"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="button-batal" onClick={handleClose}>
                Batal
              </Button>
              <Button className="button-simpan" onClick={handleSubmit}>
                Simpan
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <MainFooter />
      </div>
    </div>
  );
};

export default PortfolioTable;

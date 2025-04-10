import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import SideBarComponent from "../components/SideBarComponent";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import "../style/tabelportfolio.css";
import axios from "axios";

const AdminHeaderTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [headerData, setHeaderData] = useState([]);
  const [editedHeader, setEditedHeader] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/headers");
        setHeaderData(response.data);
      } catch (error) {
        console.error("Error fetching header data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (data) => {
    setEditedHeader(data);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/headers/${editedHeader.id}`, editedHeader);
      const response = await axios.get("/headers");
      setHeaderData(response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating header:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedHeader({ ...editedHeader, [name]: value });
  };

  const handleHapus = async (id) => {
    try {
      await axios.delete(`/headers/${id}`);
      const response = await axios.get("/headers");
      setHeaderData(response.data);
    } catch (error) {
      console.error("Error deleting header:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <SideBarComponent />
      <div className="dashboard-content">
        <MainHeader />
        <div className="dashboard-content-isi" style={{ flex: 1, padding: "20px" }}>
          <h2>CRUD Header</h2>
          <div className="table-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Posisi</th>
                  <th>Konten EN</th>
                  <th>Konten ID</th>
                  <th>Path</th>
                  <th>Parent ID</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {headerData.map((header) => (
                  <tr key={header.id}>
                    <td>{header.id}</td>
                    <td>{header.position}</td>
                    <td>{header.content_en}</td>
                    <td>{header.content_id}</td>
                    <td>{header.path}</td>
                    <td>{header.parent_id}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(header)}>
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleHapus(header.id)}>
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Header</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Posisi</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={editedHeader.position || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Konten EN</Form.Label>
                <Form.Control
                  type="text"
                  name="content_en"
                  value={editedHeader.content_en || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Konten ID</Form.Label>
                <Form.Control
                  type="text"
                  name="content_id"
                  value={editedHeader.content_id || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Path</Form.Label>
                <Form.Control
                  type="text"
                  name="path"
                  value={editedHeader.path || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Parent ID</Form.Label>
                <Form.Control
                  type="number"
                  name="parent_id"
                  value={editedHeader.parent_id || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <MainFooter />
      </div>
    </div>
  );
};

export default AdminHeaderTable;

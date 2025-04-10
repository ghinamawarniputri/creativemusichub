import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import SideBarComponent from "../components/SideBarComponent";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import "../style/tabelportfolio.css";
import axios from "axios";

const AdminFooterTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [footerData, setFooterData] = useState([]);
  const [editedFooter, setEditedFooter] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalType, setModalType] = useState("contact"); // "contact" atau "product"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/footers");
        setFooterData(response.data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (data, type) => {
    setEditedFooter(data);
    setModalType(type);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/footers/${editedFooter.id}`, editedFooter);
      const response = await axios.get("/footers");
      setFooterData(response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating footer data:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleHapus = async (id) => {
    try {
      await axios.delete(`/footers/${id}`);
      const response = await axios.get("/footers");
      setFooterData(response.data);
    } catch (error) {
      console.error("Error deleting footer data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFooter({ ...editedFooter, [name]: value });
  };

  return (
    <div className="dashboard-container">
      <SideBarComponent />

      <div className="dashboard-content">
        <MainHeader />

        <div className="dashboard-content-isi" style={{ flex: 1, padding: "20px" }}>
          <h2>CRUD Footer</h2>

          {/* Tabel Informasi Kontak */}
          <h3>Informasi Kontak</h3>
          <div className="table-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Address ID</th>
                  <th>Address EN</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Instagram Name</th>
                  <th>Instagram Link</th>
                  <th>Website Name</th>
                  <th>Website Link</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {footerData.map((footer) => (
                  <tr key={footer.id}>
                    <td>{footer.id}</td>
                    <td>{footer.address_id}</td>
                    <td>{footer.address_en}</td>
                    <td>{footer.phone}</td>
                    <td>{footer.email}</td>
                    <td>{footer.instagram_name}</td>
                    <td>{footer.instagram_link}</td>
                    <td>{footer.website_name}</td>
                    <td>{footer.website_link}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(footer, "contact")}>
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleHapus(footer.id)}>
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Tabel Produk */}
          <h3>Produk</h3>
          <div className="table-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th rowSpan="2">ID</th>
                  <th colSpan="2">Nama Produk</th>
                  <th rowSpan="2">Link</th>
                  <th rowSpan="2">Aksi</th>
                </tr>
                <tr>
                  <th>Bahasa Indonesia</th>
                  <th>Bahasa Inggris</th>
                </tr>
              </thead>
              <tbody>
                {footerData.map((footer, index) => (
                  <>
                    <tr key={`product1-${index}`}>
                      <td>1</td>
                      <td>{footer.product1_name_id}</td>
                      <td>{footer.product1_name_en}</td>
                      <td>{footer.product1_link_id}</td>
                      <td rowSpan="7">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(footer, "product")}>
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleHapus(footer.id)}>
                          Hapus
                        </Button>
                      </td>
                    </tr>
                    <tr key={`product2-${index}`}>
                      <td>2</td>
                      <td>{footer.product2_name_id}</td>
                      <td>{footer.product2_name_en}</td>
                      <td>{footer.product2_link_id}</td>
                    </tr>
                    <tr key={`product3-${index}`}>
                      <td>3</td>
                      <td>{footer.product3_name_id}</td>
                      <td>{footer.product3_name_en}</td>
                      <td>{footer.product3_link_id}</td>
                    </tr>
                    <tr key={`product4-${index}`}>
                      <td>4</td>
                      <td>{footer.product4_name_id}</td>
                      <td>{footer.product4_name_en}</td>
                      <td>{footer.product4_link_id}</td>
                    </tr>
                    <tr key={`privacy-${index}`}>
                      <td>5</td>
                      <td>{footer.privacy_policy_id}</td>
                      <td>{footer.privacy_policy_en}</td>
                      <td>/privacy-policy</td>
                    </tr>
                    <tr key={`terms-${index}`}>
                      <td>6</td>
                      <td>{footer.terms_of_use_id}</td>
                      <td>{footer.terms_of_use_en}</td>
                      <td>/terms-of-use</td>
                    </tr>
                    <tr key={`sitemap-${index}`}>
                      <td>7</td>
                      <td>{footer.sitemap_id}</td>
                      <td>{footer.sitemap_en}</td>
                      <td>/sitemap</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Footer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {modalType === "contact" ? (
                <>
                  <Form.Group>
                    <Form.Label>Address ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="address_id"
                      value={editedFooter.address_id || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Address EN</Form.Label>
                    <Form.Control
                      type="text"
                      name="address_en"
                      value={editedFooter.address_en || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={editedFooter.phone || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={editedFooter.email || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Instagram Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="instagram_name"
                      value={editedFooter.instagram_name || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Instagram Link</Form.Label>
                    <Form.Control
                      type="text"
                      name="instagram_link"
                      value={editedFooter.instagram_link || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Website Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="website_name"
                      value={editedFooter.website_name || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Website Link</Form.Label>
                    <Form.Control
                      type="text"
                      name="website_link"
                      value={editedFooter.website_link || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </>
              ) : (
                <>
                  <Form.Group>
                    <Form.Label>Product 1 Name ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="product1_name_id"
                      value={editedFooter.product1_name_id || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 1 Link ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="product1_link_id"
                      value={editedFooter.product1_link_id || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 2 Name ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="product2_name_id"
                      value={editedFooter.product2_name_id || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 2 Link ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="product2_link_id"
                      value={editedFooter.product2_link_id || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 3 Name ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="product3_name_id"
                      value={editedFooter.product3_name_id || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 3 Link ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="product3_link_id"
                      value={editedFooter.product3_link_id || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 4 Name ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="product4_name_id"
                      value={editedFooter.product4_name_id || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 4 Link ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="product4_link_id"
                      value={editedFooter.product4_link_id || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 1 Name EN</Form.Label>
                    <Form.Control
                      type="text"
                      name="product1_name_en"
                      value={editedFooter.product1_name_en || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 1 Link EN</Form.Label>
                    <Form.Control
                      type="text"
                      name="product1_link_en"
                      value={editedFooter.product1_link_en || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 2 Name EN</Form.Label>
                    <Form.Control
                      type="text"
                      name="product2_name_en"
                      value={editedFooter.product2_name_en || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 2 Link EN</Form.Label>
                    <Form.Control
                      type="text"
                      name="product2_link_en"
                      value={editedFooter.product2_link_en || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 3 Name EN</Form.Label>
                    <Form.Control
                      type="text"
                      name="product3_name_en"
                      value={editedFooter.product3_name_en || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 3 Link EN</Form.Label>
                    <Form.Control
                      type="text"
                      name="product3_link_en"
                      value={editedFooter.product3_link_en || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 4 Name EN</Form.Label>
                    <Form.Control
                      type="text"
                      name="product4_name_en"
                      value={editedFooter.product4_name_en || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Product 4 Link EN</Form.Label>
                    <Form.Control
                      type="text"
                      name="product4_link_en"
                      value={editedFooter.product4_link_en || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </>
              )}
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

export default AdminFooterTable;

import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SideBarComponent from "../components/SideBarComponent";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import "../style/tabelportfolio.css";
import axios from "axios";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

const AdminProduk = () => {
  const { product } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {
    console.log("Product ID:", product);

    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/biodata?item_id=${product}`);
        console.log("Response Data:", response.data);

        if (response.status === 404) {
          setTransactions([]);
        } else {
          setTransactions(response.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Gagal mengambil data transaksi. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [product]);

  useEffect(() => {
    if (transactions.length > 0) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable();
    }
  }, [transactions]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/biodata/${id}`);
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setError("Gagal menghapus transaksi. Silakan coba lagi.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <SideBarComponent />
      <div className="dashboard-content">
        <MainHeader />
        <div
          className="dashboard-content-isi"
          style={{ flex: 1, padding: "20px" }}>
          <h2>Daftar Transaksi: {product}</h2>
          <table ref={tableRef} className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Item</th>
                <th>Nama User</th>
                <th>Email</th>
                <th>No. Telp</th>
                <th>Waktu Transaksi</th>
                <th>Jumlah Transaksi</th>
                <th>Detail Transaksi</th> {/* Tambahkan kolom Detail */}
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.item_name}</td>
                    <td>{transaction.name}</td>
                    <td>{transaction.email}</td>
                    <td>{transaction.whatsapp}</td>
                    <td>
                      {new Date(transaction.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </td>
                    <td>{transaction.price}</td>
                    <td>
                      {/* Tampilkan detail berdasarkan item_name */}
                      {transaction.item_name === "lirik" &&
                        transaction.lyrics_text}
                      {transaction.item_name === "instrumen" &&
                        transaction.instrument_text}
                      {transaction.item_name === "efek-suara" &&
                        transaction.sound_effect_text}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(transaction.id)}>
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center" }}>
                    Tidak ada data transaksi untuk produk ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <MainFooter />
      </div>
    </div>
  );
};

export default AdminProduk;

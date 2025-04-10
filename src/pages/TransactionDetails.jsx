import { useLocation, useNavigate } from "react-router-dom";
import "../style/transaction.css";

const TransactionDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const transactionData = location.state?.transactionData;

  if (!transactionData) {
    return (
      <div className="transaction-details-container">
        {" "}
        {/* Tambahkan div ini */}
        <div className="transaction-card">
          {" "}
          {/* Tambahkan div ini */}
          <h2>Transaksi Tidak Ditemukan</h2>
          <p>Data transaksi tidak tersedia.</p>
          <button onClick={() => navigate("/")}>Kembali ke Beranda</button>
        </div>{" "}
        {/* Tambahkan div ini */}
      </div> // Tambahkan div ini
    );
  }

  return (
    <div className="transaction-details-container">
      {" "}
      {/* Tambahkan div ini */}
      <div className="transaction-card">
        {" "}
        {/* Tambahkan div ini */}
        <h2>Detail Transaksi</h2>
        <p>
          <strong>Nama:</strong> {transactionData.name}
        </p>
        <p>
          <strong>Produk:</strong> {transactionData.item}
        </p>
        <button onClick={() => navigate("/")}>Kembali ke Beranda</button>
      </div>{" "}
      {/* Tambahkan div ini */}
    </div> // Tambahkan div ini
  );
};

export default TransactionDetails;

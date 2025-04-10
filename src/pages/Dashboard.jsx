import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import SideBarComponent from "../components/SideBarComponent";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import "../style/admin.css";
import "../style/popup.css";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const Dashboard = () => {
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [totalBiodata, setTotalBiodata] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productLabels, setProductLabels] = useState([]);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const justLoggedIn = sessionStorage.getItem("justLoggedIn");

        if (justLoggedIn === "true") {
            setShowWelcomeModal(true);
            sessionStorage.removeItem("justLoggedIn"); // Hapus status login
        }

        const fetchTotalBiodata = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get("http://localhost:1000/biodata/count");
                setTotalBiodata(response.data.count);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching total biodata:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchProductData = async () => {
            try {
                const response = await axios.get("http://localhost:1000/biodata/categories/count");
                const produk = response.data.produk;
                const labels = produk.map((item) => item.nama_produk);
                const data = produk.map((item) => item.jumlah_terjual);

                setProductLabels(labels);
                setProductData(data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchTotalBiodata();
        fetchProductData();
    }, []);

    const barData = {
        labels: productLabels,
        datasets: [
            {
                label: "Jumlah Produk Terjual",
                data: productData,
                backgroundColor: ["#0088FE", "#00C49F", "#FFBB28"],
                borderColor: ["#005BBB", "#009E75", "#FFAA00"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <SideBarComponent />
            <div className="dashboard-content">
                <MainHeader />

                {showWelcomeModal && (
                    <div className="modal-overlay">
                        <div className="popup-content">
                            <h2>Selamat datang admin! 🎉</h2>
                            <button onClick={() => setShowWelcomeModal(false)} className="close-button">
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {console.log("Show Welcome Modal:", showWelcomeModal)}

                <div className="dashboard-main">
                    <h2>Dasbor Admin</h2>

                    <div className="d-flex justify-content aligin-items-center">
                        <div className="dashboard-cards">
                            <div className="dashboard-card">
                                <h3>Total Transaksi</h3>
                                {loading ? (
                                    <div>Loading...</div>
                                ) : error ? (
                                    <div>Error: {error}</div>
                                ) : (
                                    <p>{totalBiodata}</p>
                                )}
                            </div>
                        </div>

                        <div className="chart-container">
                            <h3>Statistik Produk</h3>
                            <Bar data={barData} />
                        </div>
                    </div>
                </div>

                <MainFooter />
            </div>
        </div>
    );
};

export default Dashboard;
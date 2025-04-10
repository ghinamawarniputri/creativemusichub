import PropTypes from "prop-types";
import { productDescriptions } from "../data/index";
import "../style/main.css";

const ProductDescComponent = ({ page, language }) => {
  const product = productDescriptions[language]?.find((item) => item.page === page);

  if (!product) {
    return <p>{language === "ID" ? "Produk tidak ditemukan." : "Product not found."}</p>;
  }

  return (
    <div className="product-desc d-flex align-items-center">
      {/* Left section: Text */}
      <div className="text-section pe-4">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description1}</p>
        <p className="product-description">{product.description2}</p>
        <p className="product-description">{product.description3}</p>
      </div>

      {/* Right section: Image */}
      <div className="image-section">
        <img
          src={product.imageUrl}
          alt={`${product.title} Image`}
          className="product-image"
        />
      </div>
    </div>
  );
};

ProductDescComponent.propTypes = {
  page: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default ProductDescComponent;

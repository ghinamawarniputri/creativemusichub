import PropTypes from "prop-types";
import { products, TextContent } from "../data/index";
import { useNavigate } from "react-router-dom";

const PriceListComponent = ({ page, language }) => {
  const navigate = useNavigate();
  const plans =
    products[language]?.filter((product) => product.category === page) || [];

  const handleCheckout = (plan) => {
    navigate("/checkout", {
      state: {
        plan: { id: plan.id, name: plan.name, price: plan.price },
        page: page, // Kirim page ke ModalForm
        language: language,
      },
    });
  };

  return (
    <div className="price-list">
      <h2>{TextContent[language].daftar}</h2>
      <div className="plans">
        {plans.map((plan, index) => (
          <div key={index} className="plan">
            <h3>{plan.name}</h3>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <p>{plan.price}</p>
            <button
              className="order-button"
              onClick={() => handleCheckout(plan)}>
              {TextContent[language].book}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

PriceListComponent.propTypes = {
  page: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default PriceListComponent;

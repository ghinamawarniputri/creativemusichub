import PropTypes from "prop-types";
import { howItWorksSteps, TextContent } from "../data/index";

const HowItWorksComponent = ({ page, language }) => {
  const steps =
    howItWorksSteps[language]?.find((item) => item.page === page)?.steps || [];

  return (
    <div className="how-it-works">
      <h2>{TextContent[language].howitworks}</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-item">
            <div className="step-content">
              <div className="step-number">
                {`${TextContent[language]?.step || "langkah"} ${index + 1}`}
              </div>
              <p className="step-text">{step.text}</p>
            </div>
            <img
              src={step.imageUrl}
              alt={`${
                language === "id" ? `Langkah ${index + 1}` : `Step ${index + 1}`
              }`}
              className="step-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

HowItWorksComponent.propTypes = {
  page: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default HowItWorksComponent;

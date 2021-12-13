import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ text, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;

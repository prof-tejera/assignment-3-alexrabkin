import PropTypes from "prop-types";
import "./Input.scss";

const Input = ({ label, placeholder, value, type, onChange }) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default Input;

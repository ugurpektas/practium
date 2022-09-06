import React from "react";
import PropTypes from "prop-types";

const Button = ({
  type = "",
  text = "",
  onClick = () => {},
  className = "",
  disabled = false,
  width = "80",
}) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ minWidth: `${width}px` }}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;

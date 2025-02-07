import React from "react";

const Button = ({ text, className, icon }) => {
  return (
    <button className={className}>
      {icon && <img src={icon} alt="icon" className="button-icon" />}
      {text}
    </button>
  );
};

export default Button;

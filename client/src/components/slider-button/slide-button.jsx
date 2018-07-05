import React from 'react';

export const SliderButton = ({
  onClick,
  text,
}) => {
  return (
    <button onClick={onClick} className="rl-slider-button">
      <span className="button-text-wrapper">
        <span className="button-text">{text}</span>
      </span>
      <i className="fas fa-plus"/>
    </button>
  );
};

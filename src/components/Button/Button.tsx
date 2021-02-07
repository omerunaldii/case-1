import React, { ReactElement } from 'react';

interface ButtonProps {
  label?: string;
  child?: ReactElement,
  activeClass?: string,
  onClick: (e?: any) => void;
}

const Button = ({ label, child, activeClass, onClick }: ButtonProps) => {

  const getLabel = () => {
    return label ? label : 'Default';
  }

  const getClasses = () => {
    let classes = '';

    classes += activeClass ? activeClass : '';
    
    return classes;
  }
  
  const renderChild = () => {
    return child ? child : getLabel();
  }

  return (
    <button className={`btn ${getClasses()}`} onClick={onClick}>{renderChild()}</button>
  )
}

export default Button;

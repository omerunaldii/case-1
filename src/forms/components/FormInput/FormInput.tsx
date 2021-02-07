import React, { useState } from 'react';
import VALIDATION_STATUS from '../../../enums/validationstatus';

interface FormInputProps {
  label: string;
  name: string;
  type: 'text' | 'password' | 'tel';
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  status?: VALIDATION_STATUS;
  validator?: (val: string) => void;
}

const FormInput = ({ label, name, type, defaultValue, placeholder, error, status, validator }: FormInputProps) => {

  const [value, updateInputValue] = useState(defaultValue ? defaultValue : '');

  const handleChange = (val: string) => {
    updateInputValue(val);
    validator ? validator(val) : null;
  }

  const getClass = () => {
    switch (status) {
      case VALIDATION_STATUS.INVALID:
        return 'invalid'
      case VALIDATION_STATUS.VALID:
        return 'valid'
      default:
        return 'default';
    }
  }

  const renderError = () => {
    if (status == VALIDATION_STATUS.INVALID) {
      return error ? <small className="input-error">{error}</small> : 'DEFAULT_ERROR_TEXT'
    }

    return <></>
  }

  return (
    <div className={`forminput__wrapper ${ getClass() }`}>
      <span className="input-label">{label ? label : 'Label'}</span>
      <input className="form-input" type={type} name={name} value={value} placeholder={placeholder ? placeholder : ''} onChange={e => handleChange(e.target.value)}/>
      {renderError()}
    </div>
  )
}

export default FormInput;

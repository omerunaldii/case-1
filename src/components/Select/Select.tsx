import React, { useState } from 'react';
import { withApplicationState } from '../../providers';
import { ApplicationState } from '../../store';

interface SelectProps {
  state: ApplicationState;
  dispatch: ({ type }: { type: string; payload?: any; }) => void,
  data: any[];
  selectDefaultFromGlobal: boolean;
  onSelectionChange: (e: string) => void;
}

const Select = ({ data, selectDefaultFromGlobal, onSelectionChange, state, dispatch }: SelectProps) => {
  const [value, updateSelectValue] = useState(selectDefaultFromGlobal 
    ? data.filter(item => item.value === state.language)[0].value 
    : data[0].value);

  const handleChange = (target: any) => {
    updateSelectValue(target.label);
    onSelectionChange(target.value);
  }

  return (
    <select className="select__wrapper" onChange={e => handleChange(e.target)} value={value}>
      {
        data.map((item, key) => {
          return <option key={key} value={item.value}>{item.label}</option>
        })
      }
    </select>
  )
}

export default withApplicationState(Select);

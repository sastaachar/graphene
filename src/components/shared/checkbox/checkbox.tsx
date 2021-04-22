import React, { MouseEventHandler } from 'react';
import './checkbox.scss';

interface CheckboxProps {
  isChecked: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  let classNameInput = 'checkbox-input';
  if (props.isChecked) classNameInput += ' checkbox-on';
  return <div className={classNameInput} onClick={props.onClick}></div>;
};

export default Checkbox;

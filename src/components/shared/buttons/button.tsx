import React, { CSSProperties } from 'react';

interface ButtonProps {
  buttonStyle: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const styles: CSSProperties = { backgroundColor: `var(--btn--${props.buttonStyle})` };

  return <button style={styles}>Click me</button>;
};

export default Button;

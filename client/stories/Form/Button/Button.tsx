import React, { FC } from "react";
import "./button.css";
interface ButtonMainProps {
  variant?: "Primary" | "Secondary" | "Tertiary";
  children?: any;
  size?: "Small" | "Medium" | "Large";
  label?: string;
}

const ButtonMain: FC<ButtonMainProps> = ({
  variant,
  size,
  label,
  ...props
}) => {
  return (
    <>
      <div className={`button-main ${variant} ${size} `} {...props}>
        {label}
      </div>
    </>
  );
};

export default ButtonMain;

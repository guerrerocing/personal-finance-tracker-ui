import React from "react";
import { Input } from "@nextui-org/react";

interface RegisterFormProps {
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

const RegisterForm = ({ children, onFormChange }: RegisterFormProps) => {
  return (
    <form className="flex flex-col gap-4 h-[300px]">
      <Input
        isRequired
        label="Username"
        placeholder="Enter your username"
        type="text"
        id="username"
        name="username"
        onChange={onFormChange}
      />
      <Input
        isRequired
        label="Password"
        placeholder="Enter your password"
        type="password"
        id="password"
        name="password"
        onChange={onFormChange}
      />
      <Input
        isRequired
        label="Re-enter Password"
        placeholder="Re-enter Password"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        onChange={onFormChange}
      />
      {children}
    </form>
  );
};

export default RegisterForm;

import React from "react";
import { Input } from "@nextui-org/react";

interface LoginFormProps {
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}
const LoginForm = ({ children, onFormChange }: LoginFormProps) => {
  return (
    <form className="flex flex-col gap-4">
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
      {children}
    </form>
  );
};

export default LoginForm;

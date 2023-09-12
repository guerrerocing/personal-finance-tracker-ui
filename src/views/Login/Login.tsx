import React, { useState } from "react";
import { Tabs, Tab, Link, Button, Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

import authService from "../../services/authService";
import { AxiosError } from "axios";

interface RegistrationForm {
  username: string;
  password: string;
  confirmPassword: string;
}
interface LoginFormInterface {
  username: string;
  password: string;
}
interface ErrorResponse {
  message: string;
}

const Login = () => {
  const history = useNavigate();
  const [selected, setSelected] = React.useState("login");

  const [loginFormData, setLoginFormData] = useState<LoginFormInterface>({
    username: "",
    password: "",
  });

  const [registerFormData, setRegisterFormData] = useState<RegistrationForm>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleRegisterFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateUsername = (username: string): boolean => {
    return username.length >= 3;
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleLogin = async () => {
    try {
      const response = await authService.login({
        username: loginFormData.username,
        password: loginFormData.password,
      });
      authService.saveToken(response.token);
      // Redirect
      history("/dashboard");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (typeof err.message === "string") {
        setError(err.message); // Handle custom error messages here
      } else {
        setError("An unknown error occurred"); // Fallback error message
      }
    }
  };

  const handleRegistration = async () => {
    if (registerFormData.password !== registerFormData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Basic validation checks
    if (!validateUsername(registerFormData.username)) {
      setError("Invalid username. It should contain at least 3 characters.");
      return;
    }

    if (!validatePassword(registerFormData.password)) {
      setError("Invalid password. It should be at least 6 characters long.");
      return;
    }

    try {
      const response = await authService.register({
        username: registerFormData.username,
        password: registerFormData.password,
      });
      authService.saveToken(response.token);
      // Redirect
      history("/dashboard");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (typeof err.message === "string") {
        setError(err.message); // Handle custom error messages here
      } else {
        setError("An unknown error occurred"); // Fallback error message
      }
    }
  };

  return (
    <div className="w-full">
      <Card className="mx-auto mt-[96px] max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            /* @ts-expect-error  expected*/
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <LoginForm onFormChange={handleLoginFormChange}>
                {error && (
                  <p className="text-center text-small text-danger">{error}</p>
                )}
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </div>
              </LoginForm>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <RegisterForm onFormChange={handleRegisterFormChange}>
                {error && (
                  <p className="text-center text-small text-danger">{error}</p>
                )}
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    onClick={handleRegistration}
                    type="button"
                  >
                    Sign up
                  </Button>
                </div>
              </RegisterForm>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;

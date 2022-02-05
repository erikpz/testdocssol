import React, { useState } from "react";
import { Button, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled(Box)(({ theme }: any) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const FormContainer = styled(Box)(({ theme }: any) => ({
  /* backgroundColor: "lightgreen", */
}));
const FormField = styled(Box)(({ theme }: any) => ({
  display: "flex",
  alignItems: "center",
  margin: "25px 0",
}));

export const LoginPage = () => {
  const [loginerror, setloginerror] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleLogin = async (data: any) => {
    const { username, password } = data;
    try {
      const authService = AuthService.getInstance();
      const res = await authService.login(username, password);
      localStorage.setItem("token", res.data.Body.Token);
      navigate("/");
    } catch (err) {
      setloginerror(true);
    }
  };

  return (
    <LoginContainer>
      <FormContainer>
        <Typography variant="h4" align="center">
          Inicio de Sesión
        </Typography>
        <FormField>
          <Typography sx={{ width: 120 }}>Usuario:</Typography>
          <TextField
            {...register("username", { required: true })}
            error={!!errors.username}
          />
        </FormField>
        <FormField>
          <Typography sx={{ width: 120 }}>Password:</Typography>
          <TextField
            {...register("password", { required: true })}
            error={!!errors.password}
          />
        </FormField>
        <Button
          variant="outlined"
          sx={{ display: "block", m: "auto" }}
          onClick={handleSubmit(handleLogin)}
        >
          Ok
        </Button>
        {loginerror && (
          <Typography align="center" sx={{ m: 5, color: "tomato" }}>
            Error en el login
          </Typography>
        )}
      </FormContainer>
    </LoginContainer>
  );
};

import React, { useState } from "react";
import {
  styled,
  Box,
  Typography,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { UserService } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const CreateContainer = styled(Box)(({ theme }: any) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Form = styled(Box)(({ theme }: any) => ({
  /* backgroundColor: "lightblue", */
}));

const FormField = styled(Box)(({ theme }: any) => ({
  display: "flex",
  alignItems: "center",
  margin: "15px 0",
}));

const fields = [
  {
    label: "Nombre",
    regs: "Name",
  },
  {
    label: "Apellido P.",
    regs: "FatherLastName",
  },
  {
    label: "Apellido M.",
    regs: "MotherLastName",
  },
  {
    label: "Email",
    regs: "Email",
  },
  {
    label: "Telefono",
    regs: "PhoneNumber",
  },
  {
    label: "Usuario",
    regs: "UserName",
  },
  {
    label: "Password",
    regs: "Password",
  },
  {
    label: "Confirm password",
    regs: "ConfirmPassword",
  },
];

export const CreateUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [createError, setcreateError] = useState<any>(null);
  const [modal, setmodal] = useState<any>(false);
  const handleOpen = () => setmodal(true);
  const handleClose = () => setmodal(false);

  const handleCreate = async (data: any) => {
    console.log(data);
    try {
      const userService = UserService.getInstance();
      const response = await userService.createUser(data);
      console.log(response);
      if (response.data.IsOK) {
        navigate("/");
      } else {
        handleOpen();
        setcreateError(response.data.Messages);
      }
    } catch (err) {
      console.log(err);
      setcreateError(true);
    }
  };
  return (
    <CreateContainer>
      <Form>
        <Typography variant="h4" my={8}>
          Nuevo Usuario
        </Typography>
        {fields.map((f: any) => (
          <FormField key={f.regs}>
            <Typography sx={{ width: 120 }}>{f.label}:</Typography>
            <TextField {...register(f.regs)} error={!!errors[f.regs]} />
          </FormField>
        ))}
        <Button
          sx={{ display: "block", mx: "auto", mt: 5 }}
          variant="outlined"
          onClick={handleSubmit(handleCreate)}
        >
          Guardar
        </Button>
        {createError && (
          <Modal open={modal} onClose={handleClose}>
            <Box
              sx={{
                bgcolor: "white",
                width: 300,
                m: "200px auto",
                p: 3,
                borderRadius: 3,
              }}
            >
              <Typography sx={{ color: "tomato", mb:3 }} align="center">
                Hubo un error al crear el usuario
              </Typography>
              <Typography align="center">{`${createError}`}</Typography>
            </Box>
          </Modal>
        )}
      </Form>
    </CreateContainer>
  );
};

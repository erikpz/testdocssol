import React, { useState } from "react";
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { UserService } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const DashContainer = styled(Box)(({ theme }: any) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const GridContainer = styled(Box)(({ theme }: any) => ({
  /* backgroundColor: "lightgreen", */
  width: "90%",
  margin: "50px 0",
}));

export const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [usersList, setusersList] = useState<any>([]);

  const handleSearch = async (data: any) => {
    console.log(data);
    const { searchText } = data;
    const userService = UserService.getInstance();
    const res = await userService.search(searchText);
    setusersList([...res.data.Body]);
  };

  const handleNew = () => {
    navigate("create-user");
  };
  return (
    <DashContainer>
      <GridContainer>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, px: "16px" }}>
          <TextField
            placeholder="Buscar"
            error={!!errors.searchText}
            {...register("searchText", { required: true })}
          />
          <Button variant="outlined" onClick={handleSubmit(handleSearch)}>
            Ok
          </Button>
          <Button variant="outlined" sx={{ ml: "auto" }} onClick={handleNew}>
            Nuevo
          </Button>
        </Box>
        {usersList.length <= 0 ? (
          <Typography color="GrayText" align="center" my={5}>
            Haga una busqueda para mostrar la tabla de resultados
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>FatherLastName</TableCell>
                <TableCell>CreationDate</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>PhoneNumber</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((user: any) => (
                <TableRow key={user.Id}>
                  <TableCell>{user.Username}</TableCell>
                  <TableCell>{user.Name}</TableCell>
                  <TableCell>{user.FatherLastName}</TableCell>
                  <TableCell>{user.CreationDate}</TableCell>
                  <TableCell>{user.Email}</TableCell>
                  <TableCell>{user.PhoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </GridContainer>
    </DashContainer>
  );
};

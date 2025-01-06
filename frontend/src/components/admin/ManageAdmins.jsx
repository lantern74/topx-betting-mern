import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import useRegisterSubAdmin from "../../hooks/useRegisterSubAdmin";
import styles from "./ManageAdmins.module.scss";
import { api } from "../../utils/api";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useGetAllSubAdmins from "../../hooks/useGetAllSubAdmins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ManageAdmins = () => {
  const { t } = useTranslation();
  const [admins, setAdmins] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const { mutate, isLoading, error } = useRegisterSubAdmin();
  const [dialogError, setDialogError] = useState(null);
  const editUsernameRef = React.useRef();
  const editPasswordRef = React.useRef();
  const {
    data: subAdmins,
    isLoading: isSubAdminsLoading,
    error: subAdminsError,
  } = useGetAllSubAdmins();
  const [editOpen, setEditOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState({
    id: null,
    username: "",
    password: "",
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteAdminId, setDeleteAdminId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const queryClient = useQueryClient();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    if (subAdmins) {
      setAdmins(subAdmins);
    }
  }, [subAdmins]);

  const fetchAdmins = async () => {
    try {
      const response = await api.get("/admin/members");
      setAdmins(response.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Clear the input values when closing the dialog
    if (usernameRef.current) {
      usernameRef.current.value = "";
    }
    if (passwordRef.current) {
      passwordRef.current.value = "";
    }
    setDialogError(null);
  };

  const addMutation = useMutation({
    mutationFn: (newAdmin) => api.post("/admin/register-subadmin", newAdmin),
    onSuccess: () => {
      queryClient.invalidateQueries(["subadmins"]);
      handleCloseDialog();
      setSnackbarMessage(t("管理員新增成功"));
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    },
    onError: (error) => {
      if (error.response && error.response.status === 400) {
        setDialogError(t("用戶名已存在"));
      } else {
        setDialogError(error.message);
      }
    },
  });

  const handleAddAdmin = async () => {
    const newAdmin = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    addMutation.mutate(newAdmin);
  };

  const handleEditOpen = (admin) => {
    setEditAdmin({ id: admin._id, username: admin.username, password: "" });
    setEditOpen(true);
    // Set the initial values of the refs when the dialog opens
    setTimeout(() => {
      if (editUsernameRef.current) {
        editUsernameRef.current.value = admin.username;
      }
      if (editPasswordRef.current) {
        editPasswordRef.current.value = ""; // Or admin.password if you want to show the existing password
      }
    }, 0);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditAdmin({ id: null, username: "", password: "" });
  };

  const handleEditAdmin = async () => {
    try {
      await api.put(`/admin/subadmins/${editAdmin.id}`, {
        username: editUsernameRef.current.value,
        password: editPasswordRef.current.value,
      });
      queryClient.invalidateQueries(["subadmins"]);
      handleEditClose();
      setSnackbarMessage(t("管理員編輯成功"));
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Error updating admin:", err);
    }
  };

  const handleDeleteOpen = (id) => {
    setDeleteAdminId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteAdminId(null);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/subadmins/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["subadmins"]);
      handleDeleteClose();
      setSnackbarMessage(t("管理員刪除成功"));
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    },
    onError: (error) => {
      console.error("Error deleting admin:", error);
    },
  });

  const handleDeleteAdmin = async () => {
    deleteMutation.mutate(deleteAdminId);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        header: t("用戶名"),
        accessorKey: "username",
      },
      {
        header: t("角色"),
        accessorKey: "role",
      },
      {
        header: t("操作"),
        cell: (props) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title={t("編輯")}>
              <IconButton
                aria-label="edit"
                onClick={() => handleEditOpen(props.row.original)}
              >
                <EditIcon sx={{ fontSize: "1rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("刪除")}>
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteOpen(props.row.original._id)}
              >
                <DeleteIcon sx={{ fontSize: "1rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
        size: 100,
      },
    ],
    [t],
  );

  const table = useReactTable({
    data: admins,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={styles.manageAdminsContainer}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Typography
          variant="h4"
          component="h1"
          className={styles.manageAdminsTitle}
          style={{ color: "white" }}
          sx={{ mb: { xs: 2, sm: 0 } }}
        >
          {t("管理管理員")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          {t("新增管理員")}
        </Button>
      </Box>
      <Card style={{ backgroundColor: "#333", color: "white" }}>
        <CardContent>
          <ThemeProvider theme={darkTheme}>
            <div style={{ overflowX: "auto" }}>
              <TableContainer
                component={Paper}
                sx={{
                  margin: "0",
                  width: "100%",
                  "@media (max-width: 600px)": {
                    padding: "0px",
                    margin: "0px",
                    width: "100%",
                  },
                }}
              >
                <Table>
                  <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableCell
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                            style={{ cursor: "pointer" }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: " ⬆️",
                              desc: " ⬇️",
                            }[header.column.getIsSorted()]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableHead>
                  <TableBody>
                    {table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {t("上一頁")}
              </Button>
              <span>
                {t("第")} {table.getState().pagination.pageIndex + 1} {t("頁")}
                {" "}
                {t("共")} {table.getPageCount()} {t("頁")}
              </span>
              <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {t("下一頁")}
              </Button>
            </Box>
          </ThemeProvider>
          <ThemeProvider theme={darkTheme}>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>{t("新增管理員")}</DialogTitle>
              <DialogContent
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <TextField
                  autoFocus
                  sx={{ mt: 2 }}
                  label={t("用戶名")}
                  type="text"
                  fullWidth
                  name="username"
                  inputRef={usernameRef}
                  label={t("用戶名")}
                  type="text"
                  fullWidth
                  name="username"
                  autoComplete="off"
                />
                <TextField
                  inputRef={passwordRef}
                  label={t("密碼")}
                  type="password"
                  fullWidth
                  name="password"
                  autoComplete="new-password"
                />
                {dialogError && <p className="error-message">{dialogError}</p>}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>{t("取消")}</Button>
                <Button
                  onClick={handleAddAdmin}
                  color="primary"
                  disabled={addMutation.isLoading}
                >
                  {addMutation.isLoading ? "Loading..." : t("新增")}
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={editOpen}
              onClose={handleEditClose}
              sx={{ marginTop: "20px" }}
            >
              <DialogTitle>{t("編輯管理員")}</DialogTitle>
              <DialogContent
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <TextField
                  inputRef={editUsernameRef}
                  autoFocus
                  label={t("用戶名")}
                  type="text"
                  fullWidth
                  name="username"
                />
                <TextField
                  inputRef={editPasswordRef}
                  label={t("密碼")}
                  type="password"
                  fullWidth
                  name="password"
                  autoComplete="new-password"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEditClose}>{t("取消")}</Button>
                <Button onClick={handleEditAdmin} color="primary">
                  {t("儲存")}
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={deleteOpen} onClose={handleDeleteClose}>
              <DialogTitle>{t("刪除管理員")}</DialogTitle>
              <DialogContent>
                <Typography>{t("確定要刪除此管理員嗎？")}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteClose}>{t("取消")}</Button>
                <Button
                  onClick={handleDeleteAdmin}
                  color="error"
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? "Deleting..." : t("刪除")}
                </Button>
              </DialogActions>
            </Dialog>
          </ThemeProvider>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {subAdminsError && (
        <Typography variant="body2" color="error" mt={2}>
          {subAdminsError.message}
        </Typography>
      )}
    </div>
  );
};

export default ManageAdmins;

import { useState } from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useTheme,
  CssBaseline,
  Divider,
} from "@mui/material";
import MenuItemForm from "./MenuItemForm";
import MenuList from "./MenuList";
import useMenuItems from "../hooks/useMenuItems";
import CloseIcon from "@mui/icons-material/Close";

const MenuMainContainer = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } =
    useMenuItems();
  const [currentItem, setCurrentItem] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = (item = null) => {
    setCurrentItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentItem(null);
  };

  return (
    <Container component="main" sx={{ p: 4 }}>
      <CssBaseline />
      <Typography
        variant="h1"
        fontFamily="Poppins, sans-serif"
        fontWeight={600}
        textAlign="center"
        gutterBottom
        fontSize={"45px"}
        sx={{ color: theme.palette.primary.main }}
      >
        Restaurant Management System
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickOpen()}
          sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
        >
          Add Menu Item
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {currentItem ? "Edit Menu Item" : "Add Menu Item"}
          <IconButton onClick={handleClose} sx={{ ml: 2 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <MenuItemForm
            addMenuItem={addMenuItem}
            updateMenuItem={updateMenuItem}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            closeDialog={handleClose}
          />
        </DialogContent>
      </Dialog>
      <MenuList
        menuItems={menuItems}
        setCurrentItem={handleClickOpen}
        deleteMenuItem={deleteMenuItem}
      />
    </Container>
  );
};

export default MenuMainContainer;

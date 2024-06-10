import { useEffect, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import PropTypes from "prop-types";

const MenuItemForm = ({
  addMenuItem,
  updateMenuItem,
  currentItem,
  closeDialog,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    options: "",
    price: "",
    cost: "",
    stock: "",
  });

  useEffect(() => {
    if (currentItem) {
      setFormData(currentItem); // Populate the form with the current item data
    } else {
      // Clear the form if no currentItem is provided
      setFormData({
        name: "",
        category: "",
        options: "",
        price: "",
        cost: "",
        stock: "",
      });
    }
  }, [currentItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem) {
      updateMenuItem(currentItem.id, formData); // Update existing item, ensuring you pass the correct ID
    } else {
      addMenuItem(formData); // Add new item
    }
    closeDialog(); // Close the dialog after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Options"
            name="options"
            value={formData.options}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Cost"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {currentItem ? "Update" : "Add"} Menu Item
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

MenuItemForm.propTypes = {
  addMenuItem: PropTypes.func.isRequired,
  updateMenuItem: PropTypes.func.isRequired,
  currentItem: PropTypes.object,
  closeDialog: PropTypes.func.isRequired,
};

export default MenuItemForm;

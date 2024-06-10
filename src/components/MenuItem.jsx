// import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Tooltip,
  Box,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

const MenuItem = ({ item, setCurrentItem, deleteMenuItem }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "1rem auto",
        boxShadow: theme.shadows[5],
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[10],
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{
            textTransform: "capitalize",
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {item.name}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: "Poppins, sans-serif" }}
          >
            <strong>Category:</strong> {item.category}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: "Poppins, sans-serif" }}
          >
            <strong>Options:</strong> {item.options}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: "Poppins, sans-serif" }}
          >
            <strong>Price:</strong> ₱{item.price}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: "Poppins, sans-serif" }}
          >
            <strong>Cost:</strong> ₱{item.cost}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: "Poppins, sans-serif" }}
          >
            <strong>Stock:</strong> {item.stock}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Tooltip title="Edit Item">
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => setCurrentItem(item)}
            sx={{
              backgroundColor: theme.palette.success.main,
              "&:hover": {
                backgroundColor: theme.palette.success.dark,
              },
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Edit
          </Button>
        </Tooltip>
        <Tooltip title="Delete Item">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => deleteMenuItem(item.id)}
            sx={{
              backgroundColor: theme.palette.error.main,
              "&:hover": {
                backgroundColor: theme.palette.error.dark,
              },
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Delete
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  setCurrentItem: PropTypes.func.isRequired,
  deleteMenuItem: PropTypes.func.isRequired,
};

export default MenuItem;

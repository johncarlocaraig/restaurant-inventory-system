import { useState } from "react";
import {
  Container,
  Grid,
  Box,
  Pagination,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";

const MenuList = ({ menuItems, setCurrentItem, deleteMenuItem }) => {
  const itemsPerPage = 6; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  // Handle sort criteria change
  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
    setCurrentPage(1); // Reset to the first page when the sort criteria changes
  };

  // Handle sort order change
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1); // Reset to the first page when the sort order changes
  };

  // Filter and sort menu items based on the search term and sort criteria
  const filteredItems = menuItems
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "name") {
        if (a.name < b.name) return sortOrder === "asc" ? -1 : 1;
        if (a.name > b.name) return sortOrder === "asc" ? 1 : -1;
        return 0;
      }
      if (sortCriteria === "price") {
        return sortOrder === "asc"
          ? a.price - b.price
          : b.price - a.price;
      }
      return 0;
    });

  // Calculate the indices of the items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          label="Search Menu Items"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "500px", mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortCriteria}
              onChange={handleSortCriteriaChange}
              label="Sort By"
            >
              <MuiMenuItem value="name">Name</MuiMenuItem>
              <MuiMenuItem value="price">Price</MuiMenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortOrderChange}
              label="Order"
            >
              <MuiMenuItem value="asc">Ascending</MuiMenuItem>
              <MuiMenuItem value="desc">Descending</MuiMenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {searchTerm ? (
          currentItems.length > 0 ? (
            <Grid container spacing={2}>
              {currentItems.map((item) => (
                <Grid item key={item.id} xs={12} sm={4} md={4} lg={4}>
                  <MenuItem
                    item={item}
                    setCurrentItem={setCurrentItem}
                    deleteMenuItem={deleteMenuItem}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid item md={12} lg={12} xs={12}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontFamily: "poppins",
                  fontWeight: 600,
                  color: "red",
                  fontSize: "25px",
                }}
              >
                No Results Found!
              </Typography>
            </Grid>
          )
        ) : (
          <Grid container spacing={2}>
            {currentItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={4} md={4} lg={4}>
                <MenuItem
                  item={item}
                  setCurrentItem={setCurrentItem}
                  deleteMenuItem={deleteMenuItem}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {totalPages > 0 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCurrentItem: PropTypes.func.isRequired,
  deleteMenuItem: PropTypes.func.isRequired,
};

export default MenuList;

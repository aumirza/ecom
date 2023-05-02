import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  TablePagination,
  TableContainer,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CategoriesTable } from "../components/CategoriesTable";

// const TableCell = styled(TableCell)(({ theme }) => ({
//   color: theme.palette.common.white,
// }));

export const Categories = () => {
  const navigate = useNavigate();

  const navigateToAddCategory = () => {
    navigate("/categories/add");
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [emptyRows, setEmptyRows] = useState(0);

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:5000/categories");
    const data = await response.json();
    return data;
  };

  const categoriesQuery = useQuery(["categories"], fetchCategories, {
    onSuccess: (data) => {
      setCategories(data.categories);
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createSortHandler = (property) => (event) => {
    handleSort(property);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    if (!categoriesQuery.data?.categories) return;

    const categories = categoriesQuery.data.categories
      .sort((a, b) => {
        if (order === "asc") {
          return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
          return a[orderBy] > b[orderBy] ? -1 : 1;
        }
      })
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    setCategories(categories);
  }, [order, orderBy, page, rowsPerPage]);

  useEffect(() => {
    setEmptyRows(
      rowsPerPage -
        Math.min(rowsPerPage, categories.length - page * rowsPerPage)
    );
  }, [page, rowsPerPage, categories]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundOpacity: 0.6,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 2,
          px: 2,
        }}
      >
        <Typography variant="h4" component="div">
          Categories
          <Box
            component="span"
            sx={{ ml: 1, "&:hover": { background: "colors.primary" } }}
            onClick={navigateToAddCategory}
          >
            <Add />
          </Box>
        </Typography>
        {categoriesQuery.isLoading ? (
          <Typography variant="h6" component="div">
            Loading...
          </Typography>
        ) : (
          ""
        )}
      </Box>
      {categoriesQuery.isSuccess && categories.length ? (
        <CategoriesTable
          categories={categories}
          emptyRows={emptyRows}
          order={order}
          orderBy={orderBy}
          createSort={createSortHandler}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 2,
            px: 2,
          }}
        >
          <Typography variant="h6" component="div">
            No categories found
          </Typography>
        </Box>
      )}

      {categories ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </TableContainer>
  );
};

import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Product",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
];

export const CategoriesTable = ({
  emptyRows,
  orderBy,
  order,
  categories,
  createSort,
}) => {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/categories/${id}/edit`);
  };
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                sx={{ fontWeight: "bold", fontSize: "large" }}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSort(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id + category.name}>
            <TableCell
              component="th"
              onClick={() => handleNavigate(category.id)}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: 30, height: 30, pr: 2 }}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                    src={category.image}
                    alt={category.name}
                  />
                </Box>
                <Typography variant="body2">{category.name}</Typography>
              </Box>
            </TableCell>
            <TableCell>{category.description}</TableCell>
          </TableRow>
        ))}
        {emptyRows > 0 && (
          <TableRow
            sx={{
              height: 62.8 * emptyRows,
            }}
          >
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

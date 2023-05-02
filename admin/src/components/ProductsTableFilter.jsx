import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Slider,
  Typography,
} from "@mui/material";
import { Close, FilterList } from "@mui/icons-material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0.5) + " " + theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: theme.spacing(0.5),
}));

const FilterButton = ({ onClick, children }) => {
  return (
    <StyledBox>
      <Typography variant="body2" component="div">
        {children}
      </Typography>
      <Close
        sx={{ "&:hover": { cursor: "pointer" }, color: "white", ml: 1 }}
        onClick={onClick}
      />
    </StyledBox>
  );
};

export const ProductsTableFilter = ({
  products,
  setFilteredProducts,
  filters,
  setFilters,
}) => {
  const minPrice = Math.min(...products.map((product) => product.price));
  const maxPrice = Math.max(...products.map((product) => product.price));

  const minStock = Math.min(...products.map((product) => product.quantity));
  const maxStock = Math.max(...products.map((product) => product.quantity));

  const allCategories = [
    ...new Set(products.map((product) => product.category.name)),
  ];

  const [showFilter, setShowFilter] = useState(false);

  const [priceFilter, setPriceFilter] = useState(filters.priceFilter);
  const [stockFilter, setStockFilter] = useState(filters.stockFilter);
  const [categoryFilter, setCategoryFilter] = useState(filters.categoryFilter);

  const [priceFilterApplied, setPriceFilterApplied] = useState(null);
  const [stockFilterApplied, setStockFilterApplied] = useState(null);
  const [categoryFilterApplied, setCategoryFilterApplied] = useState(null);

  const handlePriceChange = (event, newValue) => {
    const [minPrice, maxPrice] = newValue;
    setPriceFilter({ minPrice, maxPrice });
  };

  const handleStockChange = (event, newValue) => {
    const [minStock, maxStock] = newValue;
    setStockFilter({ minStock, maxStock });
  };

  const handleCategoryChange = (event) => {
    if (event.target.checked) {
      setCategoryFilter([...categoryFilter, event.target.name]);
    } else {
      setCategoryFilter(
        categoryFilter.filter((category) => category !== event.target.name)
      );
    }
  };

  const clearPriceFilter = () => {
    setPriceFilter({ minPrice, maxPrice });
  };

  const clearStockFilter = () => {
    setStockFilter({ minStock, maxStock });
  };

  const clearCategoryFilter = () => {
    setCategoryFilter([]);
  };

  useEffect(() => {
    setPriceFilterApplied(
      priceFilter.minPrice !== 0 &&
        priceFilter.maxPrice !== 0 &&
        (priceFilter.minPrice !== minPrice || priceFilter.maxPrice !== maxPrice)
    );
  }, [priceFilter, minPrice, maxPrice]);

  useEffect(() => {
    setStockFilterApplied(
      stockFilter.minStock !== 0 &&
        stockFilter.maxStock !== 0 &&
        (stockFilter.minStock !== minStock || stockFilter.maxStock !== maxStock)
    );
  }, [stockFilter, minStock, maxStock]);

  useEffect(() => {
    setCategoryFilterApplied(categoryFilter.length > 0);
  }, [categoryFilter]);

  useEffect(() => {
    setFilters({
      priceFilter,
      stockFilter,
      categoryFilter,
    });
  }, [priceFilter, stockFilter, categoryFilter, setFilters]);

  useEffect(() => {
    if (!products) return;

    if (!priceFilterApplied && !stockFilterApplied && !categoryFilterApplied) {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(
      products.filter((product) => {
        return (
          (priceFilterApplied
            ? product.price >= priceFilter.minPrice &&
              product.price <= priceFilter.maxPrice
            : true) &&
          (stockFilterApplied
            ? product.stock >= stockFilter.minStock &&
              product.stock <= stockFilter.maxStock
            : true) &&
          (categoryFilterApplied
            ? categoryFilter.includes(product.category)
            : true)
        );
      })
    );
  }, [
    products,
    setFilteredProducts,
    priceFilterApplied,
    stockFilterApplied,
    categoryFilterApplied,
    priceFilter,
    stockFilter,
    categoryFilter,
  ]);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {priceFilterApplied || stockFilterApplied || categoryFilterApplied ? (
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "auto auto auto",
              alignItems: "center",
            }}
          >
            {priceFilterApplied && (
              <FilterButton onClick={clearPriceFilter}>
                <b>Price:</b> {filters.priceFilter.minPrice} -
                {filters.priceFilter.maxPrice}
              </FilterButton>
            )}
            {stockFilterApplied && (
              <FilterButton onClick={clearStockFilter}>
                <b>Stock: </b>
                {filters.stockFilter.minStock} - {filters.stockFilter.maxStock}
              </FilterButton>
            )}
            {categoryFilterApplied && (
              <FilterButton onClick={clearCategoryFilter}>
                <b>Categories:</b> {filters.categoryFilter.join(", ")}
              </FilterButton>
            )}
          </Box>
        ) : (
          <Typography variant="body2" component="div">
            No filters applied
          </Typography>
        )}
        <FilterList
          onClick={() => setShowFilter(!showFilter)}
          sx={{ cursor: "pointer", ml: 1 }}
        />
      </Box>

      {showFilter && (
        <Box
          sx={{
            position: "absolute",
            width: 150,
            py: 1,
            backgroundColor: "white",
            top: 0,
            right: 30,
            zIndex: 1,
            border: "1px solid",
            borderColor: "grey.500",
            borderRadius: 1,
          }}
        >
          <Typography sx={{ ml: 1 }} variant="body1" component="div">
            Filters
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ px: 2 }}>
            <Box>
              <Typography variant="body2" component="div">
                Price
              </Typography>
              <Divider />
              <Slider
                value={
                  priceFilterApplied
                    ? [priceFilter.minPrice, priceFilter.maxPrice]
                    : [minPrice, maxPrice]
                }
                size="small"
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={minPrice}
                max={maxPrice}
              />
            </Box>
            <Box>
              <Typography variant="body2" component="div">
                Stock
              </Typography>
              <Divider />
              <Slider
                value={
                  stockFilterApplied
                    ? [stockFilter.minStock, stockFilter.maxStock]
                    : [minStock, maxStock]
                }
                size="small"
                onChange={handleStockChange}
                valueLabelDisplay="auto"
                min={minStock}
                max={maxStock}
              />
            </Box>
            <Box>
              <Typography variant="body2" component="div">
                Categories
              </Typography>
              <Divider />
              {allCategories.map((category) => (
                <FormControlLabel
                  key={category}
                  name={category}
                  onChange={handleCategoryChange}
                  size="small"
                  control={
                    <Checkbox
                      checked={categoryFilter.includes(category)}
                      sx={{ py: 0 }}
                      size="small"
                    />
                  }
                  label={category}
                />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

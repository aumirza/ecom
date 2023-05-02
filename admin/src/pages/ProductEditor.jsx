import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const ProductEditor = () => {
  const { id } = useParams();

  const fetchProduct = async () => {
    const res = await fetch(`http://localhost:5000/products/${id}`);
    const data = await res.json();
    return data;
  };

  const productQuery = useQuery(["product", id], fetchProduct, {
    enabled: !!id,
    onSuccess: (data) => {
      const { name, price, description, image, categoryId, quantity } =
        data.product;
      setName(name);
      setPrice(price);
      setDescription(description);
      setImage(image);
      setCategory(categoryId);
      setCountInStock(quantity);
    },
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/categories");
    const data = await res.json();
    return data;
  };

  const fetchCategoryQuery = useQuery(["categories"], fetchCategories, {
    refetchOnWindowFocus: false,
  });

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", file);
    formData.append("categoryId", category);
    formData.append("quantity", countInStock);

    const res = await fetch(
      "http://localhost:5000/" + (id ? `products/${id}` : "products"),
      {
        method: id ? "PUT" : "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? "Edit Product" : "Add Product"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* file input */}
            <label htmlFor="coverImage">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                id="coverImage"
                style={{ display: "none" }}
                alt=""
              />
              <Box
                sx={{
                  width: "200px",
                  height: "200px",
                  border: "1px solid",
                  borderRadius: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
              >
                {image ? (
                  <img
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      //   objectFit: "cover",
                      //   borderRadius: "1rem",
                    }}
                    src={image}
                    alt={name}
                  />
                ) : (
                  "Upload Image"
                )}
              </Box>
            </label>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <FormControl variant="outlined">
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
                {fetchCategoryQuery.data?.categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Count In Stock"
              variant="outlined"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Box>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          {id ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Box>
  );
};

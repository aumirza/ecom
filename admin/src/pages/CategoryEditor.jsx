import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const CategoryEditor = () => {
  const { id } = useParams();

  const fetchCategory = async () => {
    const res = await fetch(`http://localhost:5000/categories/${id}`);
    const data = await res.json();
    return data;
  };

  useQuery(["category", id], fetchCategory, {
    enabled: !!id,
    onSuccess: (data) => {
      const { name, description, image } = data.category;
      setName(name);
      setDescription(description);
      setImage(image);
    },
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", file);

    const res = await fetch(
      "http://localhost:5000/" + (id ? `categories/${id}` : "categories"),
      {
        method: id ? "PUT" : "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  };

  const categoryMutation = useMutation(["category", id], handleAddProduct);
  const handleSubmit = (e) => {
    e.preventDefault();
    categoryMutation.mutate();
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
        {id ? "Edit Category" : "Add Category"}
      </Typography>

      <Snackbar
        open={categoryMutation.isError}
        autoHideDuration={500}
        onClose={() => categoryMutation.reset()}
        message="Error"
      />

      <Snackbar
        open={categoryMutation.isSuccess}
        autoHideDuration={500}
        onClose={categoryMutation.reset}
        message="Success"
      >
        <Alert severity="success">Success</Alert>
      </Snackbar>

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
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          {categoryMutation.isLoading ? "Loading..." : id ? "Update" : "Add"}
        </Button>
      </form>
    </Box>
  );
};

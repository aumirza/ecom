"use client";

import { Box } from "@mantine/core";
import React, { ChangeEvent } from "react";

interface props {
  id?: string;
  name?: string;
  value: string | null;
  onChange: (imageFile: File | null, imagePreview: string | null) => void;
}

export default function ImageInput({ id, name, value, onChange }: props) {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (!e.target.files || e.target.files.length === 0) {
      onChange(null, null);
      return;
    }
    const file = e.target.files[0];
    onChange(file, URL.createObjectURL(file));
  };

  return (
    <label htmlFor={id}>
      <input
        id={id}
        name={name}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        alt=""
        onChange={handleImageChange}
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
        {value ? (
          <img
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              //   objectFit: "cover",
              //   borderRadius: "1rem",
            }}
            src={value}
          />
        ) : (
          "Upload Image"
        )}
      </Box>
    </label>
  );
}

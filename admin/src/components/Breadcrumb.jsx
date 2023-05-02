import { Home } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const BreadCrumb = () => {
  const location = useLocation();
  const [path, setPath] = useState([]);

  const handleLocationChange = (location) => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    setPath(pathnames);
  };

  useEffect(() => {
    handleLocationChange(location);
  }, [location]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Home sx={{ mr: 1, color: "white" }} />

      <Typography variant="body1" color="white">
        <span> / </span>
        {path.map((name, index) => (
          <span key={index}>
            {name}
            {index < path.length - 1 && <span> / </span>}
          </span>
        ))}
      </Typography>
    </Box>
  );
};

import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "../components/Layout";
import { Auth } from "../pages/Auth";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { Profile } from "../pages/Profile";
import { Settings } from "../pages/Settings";
import { theme } from "../styles";
import { ProductEditor } from "../pages/ProductEditor";
import { Categories } from "../pages/Categories";
import { CategoryEditor } from "../pages/CategoryEditor";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="" element={<Layout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<ProductEditor />} />
        {/* <Route path="/products/:id" element={<Products />} /> */}
        <Route path="/products/:id/edit" element={<ProductEditor />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/add" element={<CategoryEditor />} />
        <Route path="/categories/:id/edit" element={<CategoryEditor />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

function WrappedApp() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default WrappedApp;

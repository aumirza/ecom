"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";

import {
  Box,
  Button,
  Flex,
  LoadingOverlay,
  Paper,
  Select,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import ImageInput from "./ImageInput";
import { notifications } from "@mantine/notifications";
import { BiCheckCircle, BiCross } from "react-icons/bi";
import { MdLabel } from "react-icons/md";

const handleAddProduct = async (values: any, id: string) => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) =>
    formData.append(key, value as any)
  );
  const res = await fetch(
    "http://localhost:5000/" + (id ? `products/${id}` : "products"),
    {
      method: id ? "PUT" : "POST",
      body: formData,
    }
  );
  const data = await res.json();
  return data.product;
};

const fetchCategoriesPlucked = async () => {
  const res = await fetch("http://localhost:5000/categories?plucked=true");
  const data = await res.json();
  return data.categories;
};

const addCategory = async (name: string) => {
  const res = await fetch("http://localhost:5000/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  return data.category;
};

const fetchProduct = async (id: string) => {
  const res = await fetch(`http://localhost:5000/products/${id}`);
  const data = await res.json();
  return data.product;
};

export const ProductEditor = ({ id }: { id?: string }) => {
  const queryClient = useQueryClient();

  const productQuery = useQuery(
    ["product", id],
    () => fetchProduct(id as string),
    { enabled: !!id }
  );

  const formik = useFormik({
    initialValues: {
      name: productQuery.data?.name,
      price: productQuery.data?.price,
      description: productQuery.data?.description,
      imagePreview: productQuery.data?.image,
      category: productQuery.data?.categoryId,
      quantity: productQuery.data?.quantity,
      imageFile: null,
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      const formValues = {
        ...values,
        image: values.imageFile,
        categoryId: values.category,
      };
      await addProductMutation.mutateAsync({ formValues, id });
      setSubmitting(false);
    },
  });

  const addCategoryMutation = useMutation(["categories", "add"], addCategory, {
    onSuccess(category) {
      // queryClient.setQueryData(["categories", "plucked"], (old: any) => {
      //   console.log(old);
      //   return [...old.categories, category];
      // });
      queryClient.invalidateQueries(["categories", "plucked"]);
      notifications.show({
        title: "Success",
        message: "Category added",
        color: "green",
        icon: <BiCheckCircle size="1.8rem" />,
      });
      formik.setFieldValue("category", category.id);
    },
    onError(error) {
      notifications.show({
        title: "Error",
        message: "Category not added",
        color: "red",
        icon: <BiCross size="1.8rem" />,
      });
    },
  });

  const addProductMutation = useMutation(
    ["products", "add"],
    (values: any) => handleAddProduct(values, id as string),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(["products"]);
        notifications.show({
          title: "Success",
          message: "Product added",
          color: "green",
          icon: <BiCheckCircle size="1.8rem" />,
        });
      },
      onError(error) {
        notifications.show({
          title: "Error",
          message: "Product not added",
          color: "red",
          icon: <BiCross size="1.8rem" />,
        });
      },
    }
  );

  const categoryCreateHandler = (query: string) => {
    addCategoryMutation.mutate(query);
    return query;
  };

  const categoriesQuery = useQuery(
    ["categories", "plucked"],
    fetchCategoriesPlucked,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Paper p="md">
      <Flex
        sx={{
          justifyContent: "Center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text size="2rem" component="h1" weight={500}>
          {id ? "Edit Product" : "Add Product"}
        </Text>
      </Flex>

      <Box sx={{ position: "relative" }}>
        <LoadingOverlay
          visible={Boolean(
            (id && !productQuery.data && productQuery.isFetching) ||
              formik.isSubmitting
          )}
          overlayBlur={2}
        />

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageInput
                name="image"
                id="image"
                value={formik.values.imagePreview}
                onChange={(imageFile) => {
                  formik.setFieldValue("imageFile", imageFile);
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
              }}
            >
              <TextInput
                name="name"
                id="name"
                label="Name"
                placeholder="Example Product"
                withAsterisk
                value={formik.values.name}
                onChange={formik.handleChange}
              />

              <TextInput
                label="Price"
                name="price"
                id="price"
                withAsterisk
                placeholder="20.00"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
              />

              <Textarea
                name="description"
                id="description"
                label="Description"
                withAsterisk
                placeholder="A short or long description of the product"
                value={formik.values.description}
                onChange={formik.handleChange}
              />

              <Select
                label="Category"
                name="category"
                id="category"
                placeholder="Select category"
                icon={<MdLabel size={20} />}
                nothingFound="No options"
                data={
                  categoriesQuery.data && categoriesQuery.data.length > 0
                    ? categoriesQuery.data?.map((category: any) => ({
                        label: category.name,
                        value: category.id,
                      }))
                    : []
                }
                value={formik.values.category}
                searchable
                withAsterisk
                getCreateLabel={(value) => `Create category "${value}"`}
                // shouldCreate={(query) => query.length > 0}
                creatable
                onCreate={categoryCreateHandler}
                onChange={(value) =>
                  formik.setFieldValue("category", value ?? "")
                }
              />

              <TextInput
                label="Count In Stock"
                name="quantity"
                id="quantity"
                type="number"
                placeholder="10"
                withAsterisk
                value={formik.values.quantity}
                onChange={formik.handleChange}
              />
            </Box>
          </Box>
          <Flex sx={{ justifyContent: "end", alignItems: "center" }} mt="lg">
            <Button disabled={formik.isSubmitting} type="submit">
              {id ? "Update Product" : "Add Product"}
            </Button>
          </Flex>
        </form>
      </Box>
    </Paper>
  );
};

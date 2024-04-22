import React, { FormEvent, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import FormData from "form-data";

import {
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";
import CategoryAddModal from "../../Components/CategoryAddModal";
import ProductAddModel from "../../Components/ProductAddModel";
import LoadingIndicator from "../../ui-components/LoadingIndicator";
import CategoryEditButton from "../../Components/CategoryEditButton";
import ProductEditButton from "../../Components/ProductEditButton";
import CategoryFilter from "../../Components/CategoryFilter";
import ProductFilter from "../../Components/ProductFilter";
async function fetchData(url: any, setData: any, setLoading: any) {
  setLoading(true);
  try {
    const response = await fetch(`${url}`);
    const data = await response.json();
    if (!response.ok) {
      setLoading(false);
      throw new Error("Something went wrong, Plz try again");
    } else setData(data);
    setLoading(false);
  } catch (error) {
    throw new Error("Something went wrong, Plz try again");
  }
}
const Store = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryformData, setcategoryFormData] = useState({
    name: "",
    slug: "",
    image: null,
  });
  const [productformData, setproductFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const {
    isOpen: categoryisOpen,
    onOpen: categoryonOpen,
    onClose: categoryonClose,
  } = useDisclosure();
  const {
    isOpen: productisOpen,
    onOpen: productonOpen,
    onClose: productonClose,
  } = useDisclosure();
  const [productData, setProductData] = useState([]);
  const [showAddcategory, setShowAddCategory] = useState({
    categoryModal: false,
    producModal: false,
  });
  useEffect(() => {
    fetchData("/api/v1/category", setCategoryData, setLoading);
    fetchData("/api/v1/product", setProductData, setLoading);
  }, []);
  
  async function handleAddCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", categoryformData.name);
    formDataToSend.append("slug", categoryformData.slug);
    formDataToSend.append("image", categoryformData.image);
    setLoading(true);
    try {
      const response = await fetch("/api/v1/category", {
        method: "POST",
        body: formDataToSend as any,
      });

      if (response.ok) {
        fetchData("/api/v1/category", setCategoryData, setLoading);
        categoryonClose();
        setLoading(false);
        console.log("Form data submitted successfully");
      } else {
        setLoading(false);
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  }
  async function handleAddProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", productformData.title);
    formDataToSend.append("description", productformData.description);
    formDataToSend.append("category", productformData.category);
    formDataToSend.append("price", productformData.price);
    formDataToSend.append("image", productformData.image);
    try {
      const response = await fetch("/api/v1/product", {
        method: "POST",
        body: formDataToSend as any,
      });
      const data = await response.json();
      if (response.ok) {
        fetchData("/api/v1/product", setProductData, setLoading);
        productonClose();
        setLoading(false);
        console.log("Form data submitted successfully");
      } else {
        //console.log(response);
        alert(data.msg);
        setLoading(false);
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  }
  function handleFilterCategory(query: any) {
    let url = "/api/v1/category";

    if (query.name || query.slug) {
      url += "?";
      if (query.name) {
        url += `name=${query.name}&`;
      }
      if (query.slug) {
        url += `slug=${query.slug}&`;
      }
      url = url.slice(0, -1);
    }

    return fetchData(url, setCategoryData, setLoading);
  }
  function handleFilterProduct(query: any) {
    let url = "/api/v1/product";
    if (query.title || query.price) {
      url += "?";
      if (query.title) {
        url += `title=${query.title}&`;
      }
      if (query.price) {
        url += `price=${query.price}&`;
      }

      url = url.slice(0, -1);
    }
    return fetchData(url, setProductData, setLoading);
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-[70%] mx-auto">
        <div className="relative top-14 z-50">
          {loading ? <LoadingIndicator /> : null}
        </div>
        <Tabs isFitted variant="unstyled">
          <TabList mb="1rem">
            <Tab _selected={{ color: "white", bg: "#1ec3cd" }}>Category</Tab>
            <Tab _selected={{ color: "white", bg: "#1ec3cd" }}>Products</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="flex gap-5 my-5">
                <button
                  className="px-8 py-2 bg-[#1ec3cd] text-white mt-1 font-bold"
                  onClick={() =>
                    fetchData("/api/v1/category", setCategoryData, setLoading)
                  }
                >
                  Refresh
                </button>
                <CategoryFilter handleFilterCategory={handleFilterCategory} />
                <button
                  className="px-8 py-2 bg-[#1ec3cd] text-white mt-1 font-bold"
                  onClick={() => {
                    setShowAddCategory({
                      ...showAddcategory,

                      categoryModal: !showAddcategory.categoryModal,
                    });
                    return categoryonOpen();
                  }}
                >
                  Add
                </button>
              </div>
              {showAddcategory.categoryModal && (
                <CategoryAddModal
                  isOpen={categoryisOpen}
                  onOpen={categoryonClose}
                  onClose={categoryonClose}
                  title={"Add Category"}
                  handleAddCategory={handleAddCategory}
                >
                  <div className="flex flex-col gap-4 my-5">
                    <form onSubmit={handleAddCategory}>
                      <label htmlFor="name">
                        Name
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter Name"
                          value={categoryformData.name}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            setcategoryFormData((prevFormData) => ({
                              ...prevFormData,
                              [name]: value,
                            }));
                          }}
                          className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </label>
                      <label htmlFor="slug">
                        Slug
                        <input
                          id="slug"
                          name="slug"
                          type="text"
                          placeholder="Enter slug"
                          value={categoryformData.slug}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            setcategoryFormData((prevFormData) => ({
                              ...prevFormData,
                              [name]: value,
                            }));
                          }}
                          className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </label>
                      <label htmlFor="image">
                        Image
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={(e: any) => {
                            const file = e.target.files[0];
                            setcategoryFormData((prevFormData) => ({
                              ...prevFormData,
                              image: file,
                            }));
                          }}
                          className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </label>
                      <button
                        type="submit"
                        className="px-8 py-2 bg-[#1ec3cd] text-white mt-1 font-bold"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </CategoryAddModal>
              )}
              <ProductAddModel
                isOpen={productisOpen}
                onOpen={productonOpen}
                onClose={productonClose}
                title={"Add Product"}
              >
                {loading ? (
                  <div>
                    <LoadingIndicator />
                  </div>
                ) : null}
                <div className="flex flex-col gap-4 my-5">
                  <form onSubmit={handleAddProduct}>
                    <label htmlFor="name">
                      Title
                      <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter title"
                        value={productformData.title}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setproductFormData((prevFormData) => ({
                            ...prevFormData,
                            [name]: value,
                          }));
                        }}
                        className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </label>
                    <label htmlFor="description">
                      Description
                      <input
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Enter description"
                        value={productformData.description}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setproductFormData((prevFormData) => ({
                            ...prevFormData,
                            [name]: value,
                          }));
                        }}
                        className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </label>
                    <label htmlFor="description">
                      category
                      <select
                        id="category"
                        name="category"
                        value={productformData.category}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setproductFormData((prevFormData) => ({
                            ...prevFormData,
                            [name]: value,
                          }));
                        }}
                        className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {categoryData.map((category: any) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label htmlFor="price">
                      Price
                      <input
                        id="price"
                        name="price"
                        type="text"
                        placeholder="Enter price"
                        value={productformData.price}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setproductFormData((prevFormData) => ({
                            ...prevFormData,
                            [name]: value,
                          }));
                        }}
                        className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </label>
                    <label htmlFor="image">
                      Image
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(e: any) => {
                          const file = e.target.files[0];
                          setproductFormData((prevFormData) => ({
                            ...prevFormData,
                            image: file,
                          }));
                        }}
                        className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </label>
                    <button
                      type="submit"
                      className="px-8 py-2 bg-[#1ec3cd] text-white mt-1 font-bold"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </ProductAddModel>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Image</Th>
                    <Th>Name</Th>
                    <Th>Slug</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {categoryData.length > 0 ? (
                    categoryData.map((el: any, i) => (
                      <Tr key={i}>
                        <Td>
                          {el.image ? (
                            <img
                              src={el.image}
                              alt="Category"
                              className="h-14 w-16"
                            />
                          ) : (
                            "No Image"
                          )}
                        </Td>
                        <Td>{el.name}</Td>
                        <Td>{el.slug}</Td>
                        <Td>
                          <Flex gap={2} alignItems={"center"}>
                            <CategoryEditButton
                              id={el._id}
                              name={el.name}
                              slug={el.slug}
                              image={el.image}
                            />

                            <button
                              className="font-bold"
                              onClick={async () => {
                                setLoading(true);
                                try {
                                  const response = await fetch(
                                    `/api/v1/category/${el._id}`,
                                    {
                                      method: "DELETE",
                                      headers: {
                                        "Content-Type": "application/json",
                                        // Add any other headers if needed
                                      },
                                      // Optionally, include a request body if needed
                                      body: JSON.stringify({}),
                                    }
                                  );

                                  if (response.ok) {
                                    console.log("DELETE request successful");
                                    // Handle success
                                    setLoading(false);
                                    fetchData(
                                      "/api/v1/category",
                                      setCategoryData,
                                      setLoading
                                    );
                                  } else {
                                    console.error("Failed to delete resource");
                                    setLoading(false);
                                    // Handle failure
                                  }
                                } catch (error) {
                                  console.error(
                                    "Error deleting resource:",
                                    error
                                  );
                                  // Handle error
                                }
                              }}
                            >
                              Delete
                            </button>
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <h1>No Data found</h1>
                  )}
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <div className="flex gap-5 my-5">
                <button
                  className="px-8 py-2 bg-[#1ec3cd] text-white mt-1 font-bold"
                  onClick={() =>
                    fetchData("/api/v1/product", setProductData, setLoading)
                  }
                >
                  Refresh
                </button>
                <ProductFilter handleFilterCategory={handleFilterProduct} />
                <button
                  className="px-8 py-2 bg-[#1ec3cd] text-white mt-1 font-bold"
                  onClick={() => {
                    setShowAddCategory({
                      ...showAddcategory,

                      producModal: !showAddcategory.producModal,
                    });
                    return productonOpen();
                  }}
                >
                  Add
                </button>
              </div>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Image</Th>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th>Price</Th>
                    <Th>Category</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {productData.length > 0 ? (
                    productData.map((el: any, i) => (
                      <Tr key={i}>
                        <Td>
                          {el.image ? (
                            <img
                              src={el.image}
                              alt="Category"
                              className="h-14 w-16"
                            />
                          ) : (
                            "No Image"
                          )}
                        </Td>
                        <Td>{el.title}</Td>
                        <Td>{el.description}</Td>
                        <Td>{el.price}</Td>
                        <Td>{el.category.name}</Td>
                        <Td>
                          <Flex gap={2} alignItems={"center"}>
                            <ProductEditButton
                              id={el._id}
                              title={el.title}
                              image={el.image}
                              price={el.price}
                              description={el.description}
                              categoryArray={categoryData}
                              category={el.category._id}
                            />

                            <button
                              className="font-bold"
                              onClick={async () => {
                                setLoading(true);
                                try {
                                  const response = await fetch(
                                    `/api/v1/product/${el._id}`,
                                    {
                                      method: "DELETE",
                                      headers: {
                                        "Content-Type": "application/json",
                                        // Add any other headers if needed
                                      },

                                      body: JSON.stringify({}),
                                    }
                                  );

                                  if (response.ok) {
                                    console.log("DELETE request successful");
                                    // Handle success
                                    setLoading(false);
                                    fetchData(
                                      "/api/v1/product",
                                      setProductData,
                                      setLoading
                                    );
                                  } else {
                                    console.error("Failed to delete resource");
                                    setLoading(false);
                                    // Handle failure
                                  }
                                } catch (error) {
                                  console.error(
                                    "Error deleting resource:",
                                    error
                                  );
                                  // Handle error
                                }
                              }}
                            >
                              Delete
                            </button>
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <h1>No Data found</h1>
                  )}
                </Tbody>
              </Table>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Store;

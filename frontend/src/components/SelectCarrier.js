import React from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/core";
import { Select, FormControl, FormLabel, Button, Input } from "@chakra-ui/core";

const carrierOptions = [
  { name: "Travelers", value: "travelers" },
  { name: "Geico", value: "geico" },
  { name: "Progressive", value: "progressive" },
  { name: "Next Gen Leads", value: "nextgenleads" }
];

export default () => {
  const [formData, setFormData] = React.useState({
    carrier: "",
    email: "",
    password: ""
  });
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [isExtracting, setIsExtracting] = React.useState(false);
  const toast = useToast();
  const handleSubmit = e => {
    e.preventDefault();
    setIsExtracting(true);

    axios
      .post(`${process.env.API_KEY}/extract/data`, formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(res => {
        const url = window.URL.createObjectURL(
          new Blob([JSON.stringify(res.data)])
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${formData.carrier}.json`);
        document.body.appendChild(link);
        link.click();
        toast({
          title: "Download successfull",
          description: "The required data downloaded successfully. 😁",
          status: "success",
          duration: 4000
        });
        e.target.reset();
      })
      .catch(e => {
        toast({
          title: "Download fail",
          description: `${e.response.data.message || " ☹️"}☹️`,
          status: "error",
          duration: 4000
        });
      })
      .finally(() => {
        setIsExtracting(false);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <Select
          id="carrier"
          name="carrier"
          placeholder="Select option"
          marginTop="1rem"
          onChange={handleChange}
          value={formData.carrier}
          required
        >
          {carrierOptions.map(({ name, value }) => (
            <option value={value} key={value}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isRequired>
        <Input
          id="email"
          name="email"
          placeholder="example@example.cpm"
          onChange={handleChange}
          marginTop="1rem"
          value={formData.email}
          required
        />
      </FormControl>
      <FormControl isRequired>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          marginTop="1rem"
          value={formData.password}
          required
        />
      </FormControl>

      <Button
        type="submit"
        variantColor="blue"
        width="100%"
        marginTop="1rem"
        isDisabled={isExtracting}
        isLoading={isExtracting}
        loadingText="Extracting your data 🔍"
      >
        Next
      </Button>
    </form>
  );
};

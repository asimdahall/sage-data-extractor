import React from "react";
import {
  ModalBody,
  Select,
  FormControl,
  FormLabel,
  Button,
  Input
} from "@chakra-ui/core";

const carrierOptions = [{ name: "Travelers", value: "travelers" }];

export default ({ handleChange, formData }) => {
  return (
    <form>
      <FormControl isRequired>
        <Input
          type="text"
          id="email"
          name="email"
          placeholder="example@example.cpm"
          onChange={handleChange}
          marginTop="1rem"
          value={formData.email}
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
        />
      </FormControl>
      <Button variantColor="green" width="100%" marginTop="1rem">
        Get Your Data
      </Button>
    </form>
  );
};

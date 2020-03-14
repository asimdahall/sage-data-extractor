import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  CSSReset
} from "@chakra-ui/core";
import { ThemeProvider } from "@chakra-ui/core";
import SelectCarrier from "./components/SelectCarrier";

export default () => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  return (
    <ThemeProvider>
      <CSSReset />
      <Modal isOpen={isModalOpen} onClose={() => {}}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Extract data</ModalHeader>
            <ModalBody
              style={{
                minHeight: "10rem",
                padding: "2rem"
              }}
            >
              <SelectCarrier />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </ThemeProvider>
  );
};

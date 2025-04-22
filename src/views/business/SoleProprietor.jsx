import React from "react";
import {
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadcrumbNav";

function SoleProprietor() {
  return (
    <>
      <BreadcrumbNav 
        items={[
          { label: 'Sole Proprietor', path: '#', isCurrentPage: true }
        ]}
      />

      <Heading mb={6}>Sole Proprietor Registration</Heading>
    </>
  );
}

export default SoleProprietor;

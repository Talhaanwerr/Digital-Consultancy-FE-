import React from "react";
import {
  Heading,
} from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadcrumbNav";

function PrivateLimited() {
  return (
    <>
      <BreadcrumbNav 
        items={[
          { label: 'Private Limited Company', path: '#', isCurrentPage: true }
        ]}
      />

      <Heading mb={6}>Private Limited Company Registration</Heading>
    </>
  );
}

export default PrivateLimited;

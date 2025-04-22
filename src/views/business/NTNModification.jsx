import React from "react";
import {
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadcrumbNav";

function NTNModification() {
  return (
    <>
      <BreadcrumbNav 
        items={[
          { label: 'NTN Modification', path: '#', isCurrentPage: true }
        ]}
      />

      <Heading mb={6}>Addition / Deletion of Business to NTN</Heading>
    </>
  );
}

export default NTNModification;

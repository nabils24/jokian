// import library yang dibutuhkan
import React from "react";
// import { Outlet } from "react-router-dom";
// import SidebarAdmin from "../SidebarAdmin";
// import { Box, Grid, GridItem } from "@chakra-ui/react";
import NavbarAdmin from "./Navbar/NavbarAdmin";
import NavbarKasir from "./Navbar/NavbarKasir";
import NavbarManajer from "./Navbar/NavbarManajer";

// buat komponen Layout
export default function Layout() {
  const userRole = JSON.parse(localStorage.getItem("user"));
  const array = ['ADMIN',"KASIR","MANAJER"]
  const pages = [<NavbarAdmin />, <NavbarKasir />,<NavbarManajer/>]
  return (
    // <Box w={"100vw"} maxW="100%" bgColor={"white"}>
    //   <Grid
    //     templateColumns={{ md: "15rem auto" }}
    //     minH={"100vh"}
    //     bgColor={"white"}
    //   >
    //     <GridItem position={"relative"}>
    <div>
      {
        pages[array.indexOf(userRole.toUpperCase())]
      }
    </div>
    //     </GridItem>

    //   </Grid>
    // </Box>
  );
}

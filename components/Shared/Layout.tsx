import React from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import Footer from "@components/Shared/Footer";
import Navbar from "@components/Shared/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Next.js App with TypeScript and Material-UI</title>
        <meta
          name="description"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vitae consectetur interdum, nisl nisi aliquam eros, eget egestas nisl nisi eget."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <Container
          component="main"
          fixed
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Container>
        <Footer />
      </Box>
    </React.Fragment>
  );
}

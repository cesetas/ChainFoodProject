import React from "react";
import Link from "next/link";
import { Button, Typography } from "@mui/material";

const Notfound = () => {
  return (
    <>
      <Typography variant="h1">Requested page not found!</Typography>
      <br />
      <Button>
        <Link href="/">Back to homepage</Link>
      </Button>
    </>
  );
};

export default Notfound;

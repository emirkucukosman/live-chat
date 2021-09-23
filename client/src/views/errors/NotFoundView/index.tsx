import React from "react";
import { Box, Typography } from "@material-ui/core";

const NotFoundView = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
      <Typography variant="h5">404 | Not Found</Typography>
    </Box>
  );
};

export default NotFoundView;

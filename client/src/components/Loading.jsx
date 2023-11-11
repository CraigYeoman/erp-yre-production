import { Box } from "@mui/material";
import '../loading.css'

const Loading = () => {

  return (
    <Box className="loading-area">
      <Box className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Box>
    </Box>
  );
};

export default Loading;

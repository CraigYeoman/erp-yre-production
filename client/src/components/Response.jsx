import { Typography, Box, useTheme, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Response = ({
  response,
  responseText,
  selectFunction,
  item,
  path,
  responseError,
  responseTextError,
  schema,
}) => {
  const theme = useTheme();

  return (
    <Box>
      {response && (
        <Box>
          <Typography
            variant="h4"
            color={theme.palette.secondary[100]}
            fontWeight="bold"
            sx={{ mt: "15px" }}
          >
            {responseText.msg}{" "}
            <Link
              component={RouterLink}
              color="inherit"
              onClick={() => selectFunction(responseText[item]._id, schema)}
              to={`/${path}/${responseText[item]._id}`}
            >
              {responseText[item].name ||
                responseText[item].first_name ||
                responseText[item].work_order_number}
            </Link>{" "}
          </Typography>
        </Box>
      )}
      {responseError && (
        <Box>
          <Typography
            variant="h4"
            color={theme.palette.secondary[100]}
            fontWeight="bold"
            sx={{ mt: "15px" }}
          >
            {responseTextError[item].name ||
              responseText[item].first_name ||
              responseText[item].work_order_number}{" "}
            Not created
          </Typography>
          {responseTextError.errors.map((error) => {
            const { msg, param, value } = error;
            return (
              <p key={error.param}>
                {msg} in {param} value {value}
              </p>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Response;

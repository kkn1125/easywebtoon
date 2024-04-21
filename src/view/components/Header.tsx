import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import AnchorTemporaryDrawer from "./AnchorTemporaryDrawer";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ background: "#555", px: 2 }}>
        <Toolbar>
          <AnchorTemporaryDrawer />
          <Box>
            <Stack
              component={Link}
              to='/'
              direction='row'
              alignItems='center'
              gap={1}
              sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
              <Box
                component='img'
                src='/logo/logo-fill.png'
                sx={{
                  width: 45,
                  height: 45,
                }}
              />
            </Stack>
          </Box>

          {/* <Button color='inherit'>Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

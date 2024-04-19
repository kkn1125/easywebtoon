import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import AnchorTemporaryDrawer from "./AnchorTemporaryDrawer";
import { EasyWebtoon } from "../../easywebtoon/easy.webtoon";

export default function ButtonAppBar({
  easywebtoon,
}: {
  easywebtoon?: EasyWebtoon;
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ background: "#555" }}>
        <Toolbar>
          <AnchorTemporaryDrawer easywebtoon={easywebtoon} />
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
            <Typography variant='h6' fontWeight={700}>
              EWT
            </Typography>
          </Stack>
          {/* <Button color='inherit'>Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

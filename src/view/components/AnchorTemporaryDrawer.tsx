import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import {
  KeyboardEvent,
  MouseEvent,
  useContext,
  useMemo,
  useState,
} from "react";
import { EasyWebtoonContext } from "../contexts/EasyWebtoonProvider";
import ToonItem from "./ToonItem";

export default function AnchorTemporaryDrawer() {
  const { easywebtoon } = useContext(EasyWebtoonContext);
  const [state, setState] = useState(false);

  const toons = useMemo(() => {
    return easywebtoon.dataModule.storage.data;
  }, [easywebtoon.dataModule.storage.data]);

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  return (
    <Box>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 300 }}
          role='presentation'
          onClick={(e: MouseEvent) => {
            const target = e.target as HTMLButtonElement;
            if (!target.classList.contains("tool-btn")) {
              setState(false);
            } else {
              setState(true);
            }
          }}
          onKeyDown={toggleDrawer(false)}>
          <List>
            <ListItem>
              <Button
                className='tool-btn'
                variant='contained'
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => {
                  easywebtoon.dataModule.addToon();
                }}>
                추가
              </Button>
            </ListItem>
            <Divider />
            {toons.map((toon) => (
              <ToonItem key={toon.id} toon={toon} />
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

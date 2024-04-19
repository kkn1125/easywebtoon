import LayersIcon from "@mui/icons-material/Layers";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { KeyboardEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { EasyWebtoon } from "../../easywebtoon/easy.webtoon";
import { Toon } from "../../easywebtoon/models/toon";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Anchor = "top" | "left" | "bottom" | "right";

export default function AnchorTemporaryDrawer({
  easywebtoon,
}: {
  easywebtoon?: EasyWebtoon;
}) {
  const [state, setState] = useState({
    left: false,
  });

  const [toons, setToons] = useState<Toon[]>([]);
  const [currentToon, setCurrentToon] = useState<string>();

  useEffect(() => {
    if (easywebtoon) {
      setToons(easywebtoon.dataModule.storage.data);
      setCurrentToon(easywebtoon.dataModule.currentToon.id);
    }
  }, [easywebtoon]);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role='presentation'
      onClick={(e: MouseEvent) => {
        const target = e.target;
        if (
          !(
            target instanceof HTMLButtonElement &&
            target.className === "tool-btn"
          )
        ) {
          toggleDrawer(anchor, false);
        }
      }}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <ListItem>
          <Button
            className='tool-btn'
            variant='contained'
            startIcon={<AddCircleOutlineIcon />}
            onClick={(e: MouseEvent) => {
              easywebtoon?.dataModule.addToon();
              if (easywebtoon) {
                setToons(() => easywebtoon.dataModule.storage.data);
              }
            }}>
            추가
          </Button>
        </ListItem>
        <Divider />
        {toons.map(({ id, title }, index) => (
          <ListItem key={id} disablePadding>
            <ListItemButton>
              {currentToon === id && (
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
              )}
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        onClick={toggleDrawer("left", true)}
        sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}>
        {list("left")}
      </Drawer>
    </Box>
  );
}

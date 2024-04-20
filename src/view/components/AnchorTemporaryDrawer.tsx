import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
import { KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { EasyWebtoon } from "../../easywebtoon/easy.webtoon";
import { Toon } from "../../easywebtoon/models/toon";

export default function AnchorTemporaryDrawer({
  easywebtoon,
}: {
  easywebtoon?: EasyWebtoon;
}) {
  const [state, setState] = useState(false);

  const [toons, setToons] = useState<Toon[]>([]);
  const [currentToon, setCurrentToon] = useState<string>();

  useEffect(() => {
    if (easywebtoon) {
      setToons([...easywebtoon.dataModule.storage.data]);
      setCurrentToon(easywebtoon.dataModule.currentToon.id);
    }
  }, [easywebtoon]);

  function handleSelectToon(id: string) {
    easywebtoon?.emmit("select-toon", { id });
  }

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
          sx={{ width: 250 }}
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
                  easywebtoon?.dataModule.addToon();
                  if (easywebtoon) {
                    setToons(() => [...easywebtoon.dataModule.storage.data]);
                  }
                }}>
                추가
              </Button>
            </ListItem>
            <Divider />
            {toons.map(({ id, title }) => (
              <ListItem
                key={id}
                disablePadding
                onClick={() => handleSelectToon(id)}>
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
      </Drawer>
    </Box>
  );
}

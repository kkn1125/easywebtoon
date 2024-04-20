import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { Toon } from "../../easywebtoon/models/toon";
import { EasyWebtoonContext } from "../contexts/EasyWebtoonProvider";

function ToonItem({ toon }: { toon: Toon }) {
  const { id, title } = toon;
  const [replaceTitle, setReplaceTitle] = useState(title);
  const { easywebtoon } = useContext(EasyWebtoonContext);
  const [editMode, setEditMode] = useState(false);

  function handleEditComplete() {
    setEditMode(false);
    handleChangeToonTitle(id, replaceTitle);
  }

  function handleEditMode() {
    setEditMode(true);
  }

  function handleChangeToonTitle(id: string, title: string) {
    easywebtoon.emmit("change-toon-title", { id, title });
  }

  function handleSelectToon(id: string) {
    easywebtoon.emmit("select-toon", { id });
  }

  function handleRemoveToon(id: string) {
    easywebtoon.emmit("remove-toon", { id });
  }

  return (
    <ListItem disablePadding>
      <ListItemButton>
        {easywebtoon.dataModule.currentToon.id === id && (
          <ListItemIcon>
            <DoneAllIcon />
          </ListItemIcon>
        )}
        {editMode ? (
          <TextField
            size='small'
            className='tool-btn'
            value={replaceTitle}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              const newTitle = e.target.value;
              setReplaceTitle(newTitle);
            }}
          />
        ) : (
          <ListItemText primary={title} onClick={() => handleSelectToon(id)} />
        )}
      </ListItemButton>

      {editMode ? (
        <IconButton className='tool-btn' onClick={() => handleEditComplete()}>
          <DownloadDoneIcon sx={{ pointerEvents: "none" }} />
        </IconButton>
      ) : (
        <IconButton className='tool-btn' onClick={() => handleEditMode()}>
          <BorderColorIcon sx={{ pointerEvents: "none" }} />
        </IconButton>
      )}
      <IconButton className='tool-btn' onClick={() => handleRemoveToon(id)}>
        <DeleteIcon sx={{ pointerEvents: "none" }} />
      </IconButton>
    </ListItem>
  );
}

export default ToonItem;

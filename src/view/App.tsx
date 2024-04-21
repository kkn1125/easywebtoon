import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import pkg from "../../package.json";
import AlertPopper from "./components/AlertPopper";
import Header from "./components/Header";
import { EasyWebtoonContext } from "./contexts/EasyWebtoonProvider";
import useAlert from "./hooks/useAlert";

function App() {
  const { easywebtoon } = useContext(EasyWebtoonContext);
  // const [easywebtoon, setEasywebtoon] = useState<EasyWebtoon>();
  const { addAlert, addInfoAlert, addErrorAlert } = useAlert();

  useEffect(() => {
    function handleFakeMouse(e: MouseEvent) {
      const cursor = document.getElementById("cursor");
      const x = e.clientX;
      const y = e.clientY;
      const target = e.target;
      const isCanvasHover =
        target && target instanceof HTMLElement && target.closest("canvas");
      if (!isCanvasHover) {
        if (cursor) {
          cursor.removeAttribute("drawmode");
          cursor.style.top = -9999999999999 + "px";
          cursor.style.left = -9999999999999 + "px";
        }
        return;
      }
      if (cursor) {
        cursor.setAttribute("drawmode", "");
        cursor.style.top = y + "px";
        cursor.style.left = x + "px";
      } else {
        const cursor = document.createElement("div");
        cursor.id = "cursor";
        document.body.append(cursor);
      }
    }
    function handleFakeTouch(e: TouchEvent) {
      const cursor = document.getElementById("cursor");
      e.stopPropagation();
      const { clientX, clientY } = e.touches?.[0] || { clientX: 0, clientY: 0 };
      const x = clientX;
      const y = clientY;
      const target = e.target;
      const isCanvasHover =
        target && target instanceof HTMLElement && target.closest("canvas");
      if (!isCanvasHover) {
        if (cursor) {
          cursor.removeAttribute("drawmode");
          cursor.style.top = -9999999999999 + "px";
          cursor.style.left = -9999999999999 + "px";
        }
        return;
      }
      if (cursor) {
        cursor.setAttribute("drawmode", "");
        cursor.style.top = y + "px";
        cursor.style.left = x + "px";
      } else {
        const cursor = document.createElement("div");
        cursor.id = "cursor";
        document.body.append(cursor);
      }
    }
    function handleFakeTouchStart(e: TouchEvent) {
      const cursor = document.getElementById("cursor");
      const { clientX, clientY } = e.touches?.[0] || { clientX: 0, clientY: 0 };
      const x = clientX;
      const y = clientY;
      const target = e.target;
      const isCanvasHover =
        target && target instanceof HTMLElement && target.closest("canvas");
      if (!isCanvasHover) {
        if (cursor) {
          cursor.removeAttribute("drawmode");
          cursor.style.top = -9999999999999 + "px";
          cursor.style.left = -9999999999999 + "px";
        }
        return;
      }
      if (cursor) {
        cursor.setAttribute("drawmode", "");
        cursor.style.top = y + "px";
        cursor.style.left = x + "px";
      } else {
        const cursor = document.createElement("div");
        cursor.id = "cursor";
        document.body.append(cursor);
      }
    }
    window.addEventListener("mousemove", handleFakeMouse);
    window.addEventListener("touchstart", handleFakeTouchStart);
    window.addEventListener("touchmove", handleFakeTouch);
    return () => {
      window.removeEventListener("mousemove", handleFakeMouse);
      window.removeEventListener("touchstart", handleFakeTouchStart);
      window.removeEventListener("touchmove", handleFakeTouch);
    };
  }, []);

  useEffect(() => {
    const pageTool = document.getElementById("page-tool");
    if (pageTool) easywebtoon.setGroupPageTool(pageTool);
    const drawTool = document.getElementById("draw-tool");
    if (drawTool) easywebtoon.setGroupDrawTool(drawTool);
    const guideTool = document.getElementById("guide-tool");
    if (guideTool) easywebtoon.setGroupGuideTool(guideTool);
    const sequenceTool = document.getElementById("sequence-tool");
    if (sequenceTool) easywebtoon.setGroupSequenceTool(sequenceTool);
    const exportTool = document.getElementById("export-tool");
    if (exportTool) easywebtoon.setGroupExportTool(exportTool);

    easywebtoon.on("app-loaded", ({ message }) => {
      addAlert("text", message);
    });

    easywebtoon.run();

    /* easywebtoon event listeners */
    easywebtoon.on("create-toon", ({ message }) => {
      addInfoAlert(message);
    });
    easywebtoon.on("setCurrentToon", ({ message }) => {
      addInfoAlert(message);
    });
    easywebtoon.on("save", ({ message }) => {
      addInfoAlert(message);
    });
    easywebtoon.on("load", ({ message }) => {
      addInfoAlert(message);
    });
    easywebtoon.on("export-gif", ({ message }) => {
      addInfoAlert(message);
    });
    easywebtoon.on("gif-repeat", ({ message }) => {
      addInfoAlert(message);
    });
    easywebtoon.on("change-toon-title", ({ message }) => {
      addInfoAlert(message);
    });
    easywebtoon.on("remove-toon", ({ message }) => {
      addErrorAlert(message);
    });

    window.addEventListener("beforeunload", () => {
      return "페이지를 나가시겠습니까?";
    });

    return () => {
      easywebtoon.destroy();
    };
  }, [addAlert, addErrorAlert, addInfoAlert, easywebtoon]);

  return (
    <Stack sx={{ height: "inherit" }}>
      <Container
        id='container'
        maxWidth='md'
        sx={{ flex: 1, p: "0 !important", backgroundColor: "#ccc" }}>
        <Box>
          <Header />
        </Box>
        <Box mt={2} />
        <Stack alignItems='space-between' gap={1} sx={{ px: 2 }}>
          <Stack
            id='export-tool'
            direction='row'
            justifyContent='space-between'
            alignItems='stretch'
            flexWrap='wrap'
            gap={1}></Stack>
          <Stack
            id='page-tool'
            direction='row'
            justifyContent='center'
            alignItems='stretch'
            gap={1}></Stack>
        </Stack>

        <Box mb={2} />

        <Stack direction='row'>
          <Box
            id='wrap'
            sx={{
              display: "inline-flex",
              mx: "auto",
              position: "relative",
              border: "1px solid #ccc",
              background: (theme) => theme.palette.background.paper,
              "& canvas:not(:last-child)": {
                position: "absolute",
                opacity: "0.5",
              },
            }}
          />
        </Stack>

        <Box mt={2} />

        <Stack id='tools' gap={1} alignItems='space-between' sx={{ px: 2 }}>
          <Stack
            id='guide-tool'
            direction='row'
            gap={1}
            justifyContent='center'
            flexWrap='wrap'></Stack>
          <Stack
            id='draw-tool'
            direction='row'
            gap={1}
            justifyContent='center'
            flexWrap='wrap'></Stack>
          <Stack
            id='sequence-tool'
            direction='row'
            gap={1}
            justifyContent='center'
            alignItems='stretch'
            flexWrap='wrap'
            sx={{
              lineHeight: 1.8,
              '[data-tool="totall"]::before': {
                content: '" / "',
              },
            }}></Stack>
        </Stack>
        <Stack
          direction='row'
          gap={1}
          sx={{
            fontWeight: 700,
            position: "fixed",
            bottom: 10 + 56,
            right: 10,
          }}>
          <Chip size='small' label={" v " + pkg.version} color='info' />
        </Stack>
      </Container>
      <Container maxWidth='md' sx={{ p: "0 !important" }}>
        <AlertPopper />
        <Box sx={{ backgroundColor: "#555", p: 2 }}>
          <Typography align='center' color='background.default'>
            Copyright 2024. DEVKIMSON All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Stack>
  );
}

export default App;

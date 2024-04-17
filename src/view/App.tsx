import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import { EasyWebtoon } from "../easywebtoon/easy.webtoon";

function App() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    function handleFakeMouse(e: MouseEvent) {
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
    window.addEventListener("mousemove", handleFakeMouse);
    return () => {
      window.removeEventListener("mousemove", handleFakeMouse);
    };
  }, []);

  useEffect(() => {
    const easywebtoon = new EasyWebtoon();

    const pageTool = document.getElementById("page-tool");
    if (pageTool) easywebtoon.setGroupPageTool(pageTool);
    const drawTool = document.getElementById("draw-tool");
    if (drawTool) easywebtoon.setGroupDrawTool(drawTool);
    const sequenceTool = document.getElementById("sequence-tool");
    if (sequenceTool) easywebtoon.setGroupSequenceTool(sequenceTool);
    const exportTool = document.getElementById("export-tool");
    if (exportTool) easywebtoon.setGroupExportTool(exportTool);

    easywebtoon.run();

    return () => {
      easywebtoon.destroy();
    };
  }, []);

  return (
    <>
      <Box mt={2} />
      <Stack alignItems='center' gap={1}>
        <Stack
          id='export-tool'
          direction='row'
          alignItems='stretch'
          gap={1}></Stack>
        <Stack
          id='page-tool'
          direction='row'
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
      <Stack id='tools' gap={1} alignItems='center'>
        <Stack id='draw-tool' direction='row' gap={1}></Stack>
        <Stack
          id='sequence-tool'
          direction='row'
          gap={1}
          alignItems='stretch'
          sx={{
            lineHeight: 1.8,
            '[data-tool="totall"]::before': {
              content: '" / "',
            },
          }}></Stack>
      </Stack>
    </>
  );
}

export default App;

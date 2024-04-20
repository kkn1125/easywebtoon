import { Box, keyframes } from "@mui/material";
import { useEffect, useState } from "react";

function Timer({ max }: { max: number }) {
  const [_time, setTime] = useState(max);
  const passEx = keyframes`
  0%{width: 100%;}
  100%{width: 0%;}
  `;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime((time) => {
        if (time <= 0) {
          clearInterval(timer);
        }
        return time - 1;
      });
    }, 1000);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        top: 0,
        left: 0,
        position: "absolute",
        height: "2px",
      }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "inherit",
          overflow: "hidden",
          animation: `${passEx} ${(max - 0.5) * 1000}ms linear both`,
          whiteSpace: "nowrap",
          "&::before": {
            position: "absolute",
            content: '""',
            top: 0,
            left: 0,
            width: {
              xs: 200 + 112,
              md: 300 + 112,
            },
            height: "inherit",
            background: "inherit",
            backdropFilter: "brightness(0.8)",
            // background: `linear-gradient(to right,
            //   red,
            //   orange,
            //   yellow,
            //   green,
            //   blue,
            //   indigo,
            //   violet)`,
          },
        }}
      />
    </Box>
  );
}

export default Timer;

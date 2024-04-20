import { Box, Button, Stack, Typography, keyframes } from "@mui/material";
import useAlert from "../hooks/useAlert";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useEffect } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import FlagIcon from "@mui/icons-material/Flag";

const alertAutoQueue: { id: string; timeout: number }[] = [];

function AlertPopper() {
  const { alerts, removeAlert } = useAlert();
  const visibleEx = keyframes`
  0%{opacity: 0;transform: translateY(-10px);padding: 8px; margin-top: 8px;}
  5%{opacity: 1;transform: translateY(0px);padding: 8px; margin-top: 8px;}
  95%{opacity: 1;transform: translateY(0px);padding: 8px; margin-top: 8px;}
  100%{opacity: 0;transform: translateY(0px);max-height: 0px;padding: 0px;margin-top: 0px}
  `;

  useEffect(() => {
    const limitAlerts = 4;
    const totalLength =
      alerts.length > limitAlerts ? limitAlerts : alerts.length;

    let i = 0;

    while (totalLength > i) {
      const alert = alerts[i];
      if (alert) {
        if (alert.autoClose) {
          const timeout = window.setTimeout(
            function (id: string) {
              const index = alertAutoQueue.findIndex(
                (queue) => queue.id === id
              );
              if (alertAutoQueue[index] !== undefined) {
                const timeout = alertAutoQueue[index].timeout;
                removeAlert(id);
                alertAutoQueue.splice(index, 1);
                clearTimeout(timeout);
              }
            },
            (alert.closeTime || 5) * 1000,
            alert.id
          );
          alertAutoQueue.push({ id: alert.id, timeout });
        }
      }
      i += 1;
    }
  }, [alerts, removeAlert]);

  function handleCloseAlert(id: string) {
    const index = alertAutoQueue.findIndex((queue) => queue.id === id);
    if (alertAutoQueue[index] !== undefined) {
      const timeout = alertAutoQueue[index].timeout;
      removeAlert(id);
      alertAutoQueue.splice(index, 1);
      clearTimeout(timeout);
    }
  }

  const alertIcon = useCallback((color: string) => {
    if (color === "text") {
      return <ErrorOutlineIcon color='inherit' />;
    } else if (color === "info") {
      return <InfoIcon color='inherit' />;
    } else if (color === "warning") {
      return <WarningIcon color='inherit' />;
    } else if (color === "primary") {
      return <FlagIcon color='inherit' />;
    } else if (color === "error") {
      return <NewReleasesIcon color='inherit' />;
    }
  }, []);

  return (
    <Stack
      sx={{
        position: "fixed",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
      }}>
      {alerts.toReversed().map((alert) => (
        <Stack
          direction='row'
          gap={1}
          key={alert.id}
          id={alert.id}
          sx={{
            textOverflow: "ellipsis",
            mt: 1,
            position: "relative",
            opacity: 0,
            transition: "150ms ease-in-out",
            transform: "translateY(-10px)",
            borderRadius: "0.2rem",
            background: (theme) => {
              if (alert.color === "text") {
                return theme.palette.text.primary.replace("0.87", "0.65");
              } else {
                return theme.palette[alert.color].main + "cc";
              }
            },
            maxHeight: 9999,
            p: 1,
            backdropFilter: "blur(3px)",
            overflow: "hidden",
            boxShadow: "0 0 0.8rem 0.1rem #56565656",
            animation: `${visibleEx} ${
              (alert.closeTime || 3) * 1000 - 300
            }ms ease-in-out both`,
            color: "background.default",
          }}>
          <Stack sx={{ mx: 1 }}>{alertIcon(alert.color)}</Stack>
          <Box
            sx={{
              minWidth: 200,
              maxWidth: 300,
              mt: 0.15,
            }}>
            <Typography
              fontSize={"0.85rem"}
              fontWeight={700}
              color='inherit'
              sx={{
                maxHeight: 80,
                textOverflow: "ellipsis",
                overflow: "auto",
                // wordBreak: "break-all",
                // whiteSpace: "nowrap",
                "&::-webkit-scrollbar": {
                  width: 3,
                  height: 3,
                },
                "&::-webkit-scrollbar-thumb": {
                  width: 3,
                  height: 3,
                  backgroundColor: "white",
                },
              }}>
              {alert.message}
            </Typography>
          </Box>
          <Box sx={{ mx: 1 }}>
            <Button
              variant='contained'
              color='error'
              sx={{
                minWidth: "auto",
                p: 0,
              }}
              onClick={() => handleCloseAlert(alert.id)}>
              <CloseIcon />
            </Button>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}

export default AlertPopper;

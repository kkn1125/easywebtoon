import { useCallback, useContext } from "react";
import { AlertContext, AlertDispatchContext } from "../contexts/AlertProvider";
import { v4 } from "uuid";

function useAlert() {
  const alerts = useContext(AlertContext);
  const alertDispatch = useContext(AlertDispatchContext);

  const addAlert = useCallback(
    (
      color: "primary" | "success" | "info" | "error" | "warning" | "text",
      message: string,
      autoClose: boolean = true,
      closeTime: number = 5
    ) => {
      return new Promise((resolve) => {
        const id = v4();
        alertDispatch({
          type: "alert/add",
          alert: { id, message, autoClose, closeTime, color },
          cb: resolve,
        } as Omit<AlertActionType, "id">);
      });
    },
    [alertDispatch]
  );

  const addDefaultAlert = useCallback(
    (message: string, autoClose?: boolean, closeTime?: number) =>
      addAlert("text", message, autoClose, closeTime),
    [addAlert]
  );

  const addSuccessAlert = useCallback(
    (message: string, autoClose?: boolean, closeTime?: number) =>
      addAlert("success", message, autoClose, closeTime),
    [addAlert]
  );
  const addPrimaryAlert = useCallback(
    (message: string, autoClose?: boolean, closeTime?: number) =>
      addAlert("primary", message, autoClose, closeTime),
    [addAlert]
  );
  const addInfoAlert = useCallback(
    (message: string, autoClose?: boolean, closeTime?: number) =>
      addAlert("info", message, autoClose, closeTime),
    [addAlert]
  );
  const addWarningAlert = useCallback(
    (message: string, autoClose?: boolean, closeTime?: number) =>
      addAlert("warning", message, autoClose, closeTime),
    [addAlert]
  );
  const addErrorAlert = useCallback(
    (message: string, autoClose?: boolean, closeTime?: number) =>
      addAlert("error", message, autoClose, closeTime),
    [addAlert]
  );

  const removeAlert = useCallback(
    (id: string) => {
      return new Promise((resolve) => {
        alertDispatch({
          type: "alert/remove",
          id,
          cb: resolve,
        });
      });
    },
    [alertDispatch]
  );

  return {
    alerts,
    addAlert,
    addDefaultAlert,
    addPrimaryAlert,
    addSuccessAlert,
    addInfoAlert,
    addWarningAlert,
    addErrorAlert,
    removeAlert,
  };
}

export default useAlert;

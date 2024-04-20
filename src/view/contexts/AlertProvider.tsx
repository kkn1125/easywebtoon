import { ReactElement, createContext, useReducer } from "react";

const initailValue: Alert[] = [];

const AlertAction = {
  Add: "alert/add",
  Remove: "alert/remove",
} as const;
type AlertAction = (typeof AlertAction)[keyof typeof AlertAction];

export const AlertContext = createContext(initailValue);
export const AlertDispatchContext = createContext((_: AlertActionType) => {});

const reducer = (state: Alert[], action: AlertActionType) => {
  switch (action.type) {
    case AlertAction.Add: {
      const alerts = [...state];
      if ("alert" in action && action.alert) {
        const newAlert: Alert = {
          id: action.alert.id,
          message: action.alert.message,
          autoClose: action.alert.autoClose ?? true,
          closeTime: action.alert.closeTime ?? 3,
          color: action.alert.color || "text",
        };
        alerts.push(newAlert);
        action.cb(newAlert, alerts);
      }
      return alerts;
    }
    case AlertAction.Remove: {
      let newAlerts = [...state];
      if ("id" in action && action.id) {
        newAlerts = state.filter((alert) => alert.id !== action.id);
        const removedAlert = state.findIndex((alert) => alert.id === action.id);
        action.cb(state[removedAlert], newAlerts);
      }
      return newAlerts;
    }
    default: {
      return state;
    }
  }
};

function AlertProvider({ children }: { children: ReactElement }) {
  const [state, dispatch] = useReducer(reducer, initailValue);
  return (
    <AlertDispatchContext.Provider value={dispatch}>
      <AlertContext.Provider value={state}>{children}</AlertContext.Provider>
    </AlertDispatchContext.Provider>
  );
}

export default AlertProvider;

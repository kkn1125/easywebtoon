declare type Point = {
  mode: "pen" | "erase" | "paint";
  x: number;
  y: number;
  thickness: number;
};

declare type Line = Point[];

declare type Page = Line[];

declare interface Alert {
  id: string;
  color: "primary" | "success" | "info" | "error" | "warning" | "text";
  message: string;
  autoClose?: boolean;
  closeTime?: number;
}

declare type AlertActionType = {
  type: AlertAction;
  alert?: Alert;
  id?: string;
  cb: (alert: Alert, alerts: Alert[]) => void;
};
declare type EasyWebtoonActionType = {
  type: EasyWebtoonAction;
  easywebtoon?: EasyWebtoon;
};

declare type OnEventNames =
  | `${"before" | "after"}-destroy`
  | "app-loaded"
  | "load"
  | "animator-initialized"
  | "create-toon"
  | "select-toon"
  | "remove-toon"
  | "change-toon-title"
  | "tool-initialized"
  | "setCurrentToon";

declare type EventResponseType = {
  message: ERROR_CODE;
};

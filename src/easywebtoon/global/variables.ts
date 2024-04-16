export const canvas = document.querySelector("#app") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

export const prevCanvas = document.querySelector(
  "#prev-canvas"
) as HTMLCanvasElement;
export const prevCtx = prevCanvas.getContext("2d") as CanvasRenderingContext2D;

export const nextCanvas = document.querySelector(
  "#next-canvas"
) as HTMLCanvasElement;
export const nextCtx = nextCanvas.getContext("2d") as CanvasRenderingContext2D;

export const penTool = document.querySelector(
  '[data-tool="pen"]'
) as HTMLButtonElement;
export const eraseTool = document.querySelector(
  '[data-tool="erase"]'
) as HTMLButtonElement;
export const allEraseTool = document.querySelector(
  '[data-tool="all-erase"]'
) as HTMLButtonElement;

export const saveBtn = document.querySelector(
  '[data-tool="save"]'
) as HTMLButtonElement;
export const loadBtn = document.querySelector(
  '[data-tool="load"]'
) as HTMLButtonElement;
export const clearBtn = document.querySelector(
  '[data-tool="clear"]'
) as HTMLButtonElement;
export const thicknessBar = document.querySelector(
  '[data-tool="thickness"]'
) as HTMLInputElement;

export const prevBtn = document.querySelector(
  '[data-tool="prev-page"]'
) as HTMLInputElement;
export const currentPage = document.querySelector(
  '[data-tool="page"]'
) as HTMLInputElement;
export const nextBtn = document.querySelector(
  '[data-tool="next-page"]'
) as HTMLInputElement;
export const deleteBtn = document.querySelector(
  '[data-tool="delete-page"]'
) as HTMLInputElement;

export const playBtn = document.querySelector(
  '[data-tool="play"]'
) as HTMLInputElement;
export const pauseBtn = document.querySelector(
  '[data-tool="pause"]'
) as HTMLInputElement;
export const fpsBar = document.querySelector(
  '[data-tool="fps"]'
) as HTMLInputElement;

export const gifRepeat = document.querySelector(
  '[data-tool="gif-repeat"]'
) as HTMLButtonElement;
export const useRepeatDelay = document.querySelector(
  '[data-tool="use-repeat-delay"]'
) as HTMLButtonElement;
export const repeatDelay = document.querySelector(
  '[data-tool="repeat-delay"]'
) as HTMLInputElement;

export const exportGifBtn = document.querySelector(
  '[data-tool="export-gif"]'
) as HTMLButtonElement;

export const totalPage = document.querySelector(
  '[data-value="total"]'
) as HTMLSpanElement;

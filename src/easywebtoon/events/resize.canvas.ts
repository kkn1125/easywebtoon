export function resizeCanvas(canvas: HTMLCanvasElement) {
  canvas.width = 640 || window.innerWidth;
  canvas.height = 320 || window.innerHeight;
}

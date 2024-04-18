import { Toon } from "../models/toon";
import { FastClick } from "fastclick";

export class AnimatorModule {
  playQueue: number[] = [];
  isPlaying: boolean = false;
  fps: number = 20;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  prevCanvas: HTMLCanvasElement;
  prevCtx: CanvasRenderingContext2D;
  nextCanvas: HTMLCanvasElement;
  nextCtx: CanvasRenderingContext2D;

  constructor(fps: number) {
    this.fps = fps;

    this.canvas = document.createElement("canvas");
    this.canvas.id = "#app";
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.prevCanvas = document.createElement("canvas");
    this.prevCanvas.id = "#prev-canvas";
    this.prevCtx = this.prevCanvas.getContext("2d") as CanvasRenderingContext2D;

    this.nextCanvas = document.createElement("canvas");
    this.nextCanvas.id = "#next-canvas";
    this.nextCtx = this.nextCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.setupFastClick();
  }

  setupFastClick() {
    console.log("apply fastclick...");
    FastClick.attach(document.body);
    FastClick.attach(this.canvas);
  }

  setFPS(fps: number) {
    this.fps = fps;
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 캔버스 초기화
  }

  renderCanvas(
    page: Page,
    color: string = "#000000",
    scale: number,
    ctx: CanvasRenderingContext2D
  ) {
    page.forEach((path) => {
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = color;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      ctx.beginPath();
      path.forEach((point, index) => {
        if (point.mode === "erase") {
          ctx.strokeStyle = "#ffffff";
        }
        ctx.lineWidth = point.thickness;
        if (index === 0) {
          ctx.moveTo(point.x * scale, point.y * scale);
        } else {
          ctx.lineTo(point.x * scale, point.y * scale);
        }
      });
      ctx.stroke();
    });
  }

  clearPlayQueue() {
    this.playQueue = [];
  }

  async renderFrame(page: Page, scale: number, ctx: CanvasRenderingContext2D) {
    let resolver: (value: HTMLImageElement) => void;
    const promise = new Promise((resolve) => (resolver = resolve));
    const color = "#000000";
    const imageFrame = document.createElement("img");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    page.forEach((path) => {
      ctx.lineJoin = "round";
      ctx.lineCap = "butt";
      ctx.strokeStyle = color;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      ctx.beginPath();
      path.forEach((point, index) => {
        if (point.mode === "erase") {
          ctx.strokeStyle = "#ffffff";
        }
        ctx.lineWidth = point.thickness;
        if (index === 0) {
          ctx.moveTo(point.x * scale, point.y * scale);
        } else {
          ctx.lineTo(point.x * scale, point.y * scale);
        }
      });
      ctx.stroke();
    });

    imageFrame.src = this.canvas.toDataURL("image/jpg");

    imageFrame.width = this.canvas.width;
    imageFrame.height = this.canvas.height;
    imageFrame.onload = () => {
      resolver(imageFrame);
    };

    return promise;
  }

  async playSequences(current: Toon, ctx: CanvasRenderingContext2D) {
    this.isPlaying = true;
    this.playQueue.push(1);
    for (const sequence of current.document.pages) {
      this.clearCanvas(ctx);
      this.renderCanvas(sequence, "#000000", current.document.scale, ctx);
      await this.sleep(1000 / this.fps);
      if (this.playQueue.length !== 1) {
        console.log("cancel");
        return;
      }
    }
    this.isPlaying = false;
  }

  // private frame(sequence: Page, ctx: CanvasRenderingContext2D) {
  //   this.renderCanvas(sequence, "#000000", ctx);
  // }

  private sleep(time: number) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, time)
    );
  }
}

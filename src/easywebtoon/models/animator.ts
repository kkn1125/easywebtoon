import { canvas } from "../global/variables";
import { Toon } from "./toon";

export class Animator {
  playQueue: number[] = [];
  isPlaying: boolean = false;
  fps: number = 20;

  constructor(fps: number) {
    this.fps = fps;
  }

  setFPS(fps: number) {
    this.fps = fps;
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
  }

  renderCanvas(
    page: Page,
    color: string = "#000000",
    ctx: CanvasRenderingContext2D
  ) {
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
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    });
  }

  clearPlayQueue() {
    this.playQueue = [];
  }

  async renderFrame(page: Page, ctx: CanvasRenderingContext2D) {
    let resolver: (value: HTMLImageElement) => void;
    const promise = new Promise((resolve) => (resolver = resolve));
    const color = "#000000";
    const imageFrame = document.createElement("img");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    });

    imageFrame.src = canvas.toDataURL("image/jpg");

    imageFrame.width = canvas.width;
    imageFrame.height = canvas.height;
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
      this.renderCanvas(sequence, "#000000", ctx);
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

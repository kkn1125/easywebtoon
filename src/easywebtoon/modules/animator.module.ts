import { EasyWebtoon } from "../easy.webtoon";
import { ERROR_CODE } from "../models/error.code";
import { Toon } from "../models/toon";
// import { FastClick } from "fastclick";

export class AnimatorModule {
  private parent: EasyWebtoon;

  // status: number = 0;
  rendered: [boolean, boolean] = [false, false];

  playQueue: number[] = [];
  isPlaying: boolean = false;
  fps: number = 20;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  prevCanvas!: HTMLCanvasElement;
  prevCtx!: CanvasRenderingContext2D;
  nextCanvas!: HTMLCanvasElement;
  nextCtx!: CanvasRenderingContext2D;

  constructor(parent: EasyWebtoon, fps: number) {
    this.parent = parent;
    this.fps = fps;
  }

  initialize() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "app";
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = true;

    this.prevCanvas = document.createElement("canvas");
    this.prevCanvas.id = "prev-canvas";
    this.prevCtx = this.prevCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.prevCtx.imageSmoothingEnabled = true;

    this.nextCanvas = document.createElement("canvas");
    this.nextCanvas.id = "next-canvas";
    this.nextCtx = this.nextCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.nextCtx.imageSmoothingEnabled = true;

    // this.status = 1;
    this.parent.eventListeners["animator-initialized"]?.forEach((cb) => {
      cb({ message: ERROR_CODE["am001"] });
    });
  }

  setFPS(fps: number) {
    this.fps = fps;
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 캔버스 초기화
  }

  // paint(
  //   // animator: AnimatorModule,
  //   { x, y }: { x: number; y: number },
  //   color: string = "#ffffffff"
  // ) {
  //   const imageData = this.ctx.getImageData(
  //     0,
  //     0,
  //     this.canvas.width,
  //     this.canvas.height
  //   );

  //   const visited: boolean[][] = Array(imageData.height)
  //     .fill(null)
  //     .map(() => Array(imageData.width).fill(false));

  //   function getColor(x: number, y: number) {
  //     const poX = (imageData.width * y + x) * 4;
  //     const toHex = (x: number) => x.toString(16).padStart(2, "0");
  //     const r = imageData.data[poX];
  //     const g = imageData.data[poX + 1];
  //     const b = imageData.data[poX + 2];
  //     const a = imageData.data[poX + 3];
  //     return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;
  //   }

  //   function setPixel(x: number, y: number, color: string) {
  //     const poX = (imageData.width * y + x) * 4;
  //     const colorInt = parseInt(color.slice(1), 16);
  //     imageData.data[poX] = (colorInt >> 24) & 255;
  //     imageData.data[poX + 1] = (colorInt >> 16) & 255;
  //     imageData.data[poX + 2] = (colorInt >> 8) & 255;
  //     imageData.data[poX + 3] = colorInt & 255;
  //   }

  //   const targetColor = getColor(x, y);
  //   if (targetColor === color) return []; // 이미 같은 색이면 아무것도 하지 않음
  //   const stack = [{ x, y }];
  //   const dots: { x: number; y: number }[] = [];
  //   while (stack.length > 0) {
  //     const { x, y } = stack.pop()!;

  //     if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height)
  //       continue;
  //     if (visited[y][x]) continue;

  //     dots.push({ x, y });
  //     const currentColor = getColor(x, y);
  //     if (currentColor === targetColor) {
  //       setPixel(x, y, color);
  //       visited[y][x] = true;
  //       // stack.push({ x: x + 1, y: y + 1 });
  //       // stack.push({ x: x + 1, y: y - 1 });
  //       // stack.push({ x: x - 1, y: y + 1 });
  //       // stack.push({ x: x - 1, y: y - 1 });

  //       stack.push({ x: x + 1, y: y });
  //       stack.push({ x: x - 1, y: y });
  //       stack.push({ x: x, y: y + 1 });
  //       stack.push({ x: x, y: y - 1 });
  //     } else if (!currentColor.endsWith("ff")) {
  //       setPixel(x, y, color);
  //       visited[y][x] = true;
  //       // stack.push({ x: x + 1, y: y + 1 });
  //       // stack.push({ x: x + 1, y: y - 1 });
  //       // stack.push({ x: x - 1, y: y + 1 });
  //       // stack.push({ x: x - 1, y: y - 1 });

  //       stack.push({ x: x + 1, y: y });
  //       stack.push({ x: x - 1, y: y });
  //       stack.push({ x: x, y: y + 1 });
  //       stack.push({ x: x, y: y - 1 });
  //     }
  //   }

  //   // this.ctx.putImageData(imageData, 0, 0);
  //   return dots;
  // }

  renderCanvas(
    page: Page,
    color: string = "#000000ff",
    scale: number,
    ctx: CanvasRenderingContext2D
  ) {
    page.forEach((path) => {
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = color;
      ctx.globalAlpha = 1;

      ctx.beginPath();
      path.forEach((point, index) => {
        // if (point.mode === "paint") {
        //   const { x, y } = point;
        //   this.paint({ x, y }, color);
        // } else {
        //   if (point.mode === "erase") {
        //     ctx.strokeStyle = "#ffffff";
        //   }
        //   ctx.lineWidth = point.thickness;
        //   if (index === 0) {
        //     ctx.moveTo(point.x * scale, point.y * scale);
        //   } else {
        //     ctx.lineTo(point.x * scale, point.y * scale);
        //   }
        // }

        if (point.mode === "erase") {
          ctx.globalCompositeOperation = "destination-out";
          ctx.strokeStyle = "#ffffff";
        } else {
          ctx.globalCompositeOperation = "color";
          ctx.strokeStyle = color;
        }
        ctx.lineWidth = point.thickness;
        if (index === 0) {
          ctx.moveTo(point.x * scale, point.y * scale);
        } else {
          ctx.lineTo(point.x * scale, point.y * scale);
        }
      });
      if (path.length === 1) {
        const point = path[0];
        ctx.lineWidth = point.thickness;
        ctx.lineTo(point.x * scale, point.y * scale);
      }
      ctx.stroke();
    });
  }

  lastPathRenderCanvas(
    page: Page,
    color: string = "#000000ff",
    scale: number,
    ctx: CanvasRenderingContext2D
  ) {
    const path = page[page.length - 1];

    // page.forEach((path) => {
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.globalAlpha = 1;

    ctx.beginPath();
    path.forEach((point, index) => {
      // if (point.mode === "paint") {
      //   const { x, y } = point;
      //   this.paint({ x, y }, color);
      // } else {
      //   if (point.mode === "erase") {
      //     ctx.strokeStyle = "#ffffff";
      //   }
      //   ctx.lineWidth = point.thickness;
      //   if (index === 0) {
      //     ctx.moveTo(point.x * scale, point.y * scale);
      //   } else {
      //     ctx.lineTo(point.x * scale, point.y * scale);
      //   }
      // }

      if (point.mode === "erase") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "#ffffff";
      } else {
        ctx.globalCompositeOperation = "color";
        ctx.strokeStyle = color;
      }
      ctx.lineWidth = point.thickness;
      if (index === 0) {
        ctx.moveTo(point.x * scale, point.y * scale);
      } else {
        ctx.lineTo(point.x * scale, point.y * scale);
      }
    });
    if (path.length === 1) {
      const point = path[0];
      ctx.lineWidth = point.thickness;
      ctx.lineTo(point.x * scale, point.y * scale);
    }
    ctx.stroke();
    // });
  }

  clearPlayQueue() {
    this.playQueue = [];
  }

  renderFrame(page: Page, scale: number, ctx: CanvasRenderingContext2D) {
    return new Promise<HTMLImageElement>((resolve) => {
      const color = "#000000";

      /* global composite operation 초기화 해줘야함. */
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      for (const path of page) {
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.globalAlpha = 1;

        ctx.beginPath();
        for (let index = 0; index < path.length; index++) {
          const point = path[index];
          if (point.mode === "erase") {
            ctx.strokeStyle = "#ffffff";
          }
          ctx.lineWidth = point.thickness;
          if (index === 0) {
            ctx.moveTo(point.x * scale, point.y * scale);
          } else {
            ctx.lineTo(point.x * scale, point.y * scale);
          }
        }
        if (path.length === 1) {
          const point = path[0];
          ctx.lineWidth = point.thickness;
          ctx.lineTo(point.x * scale, point.y * scale);
        }
        ctx.stroke();
      }

      const imageFrame = document.createElement("img");
      imageFrame.src = this.canvas.toDataURL("image/png");
      imageFrame.width = this.canvas.width;
      imageFrame.height = this.canvas.height;
      imageFrame.onload = () => {
        resolve(imageFrame);
        imageFrame.remove();
      };
    });
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
        // console.log(this.playQueue)
        resolve(true);
      }, time)
    );
  }
}

import GIF from "gif.js";
import { EasyWebtoon } from "../easy.webtoon";
import { DEFAULT_ERASE_SIZE, DEFAULT_THICKNESS } from "../global/env";
import {
  allEraseTool,
  canvas,
  clearBtn,
  ctx,
  currentPage,
  deleteBtn,
  eraseTool,
  exportGifBtn,
  fpsBar,
  gifRepeat,
  loadBtn,
  nextBtn,
  nextCanvas,
  nextCtx,
  pauseBtn,
  penTool,
  playBtn,
  prevBtn,
  prevCanvas,
  prevCtx,
  repeatDelay,
  saveBtn,
  thicknessBar,
  totalPage,
  useRepeatDelay,
} from "../global/variables";
import { Animator } from "../models/animator";
// import { clearDrawing } from "../utils/clear.drawing";
import { DataModule } from "./data.module";

export class EventModule {
  private parent: EasyWebtoon;

  dataModule: DataModule;
  animator: Animator;

  lastTime: number = 0;
  lastPoint: Omit<Point, "thickness" | "mode"> | null = null;

  thickness: number = DEFAULT_THICKNESS;
  eraseSize: number = DEFAULT_ERASE_SIZE;

  lineWidth: number = this.thickness;

  isDrawing: boolean = false;

  mode: "pen" | "erase" = "pen";

  isPlaying: boolean = false;

  gifRepeatable: boolean = false;
  useRepeatDelay: boolean = false;
  repeatDelay: number = 20;

  playReady: number = 0;

  constructor(engine: EasyWebtoon) {
    this.parent = engine;

    this.init();

    const dataModule = new DataModule();
    const animator = new Animator(24);

    this.dataModule = dataModule;
    this.animator = animator;

    this.setLineWidth(+(thicknessBar.value = "" + this.thickness));
    this.resizeCanvas();
  }

  private init() {
    thicknessBar.addEventListener("change", this.updateThickness.bind(this));

    useRepeatDelay.addEventListener(
      "click",
      this.toggleUseRepeatDelay.bind(this)
    );
    repeatDelay.addEventListener("change", this.handleRepeatDelay.bind(this));
    gifRepeat.addEventListener("click", this.toggleRepeatable.bind(this));
    exportGifBtn.addEventListener("click", this.exportGif.bind(this));

    fpsBar.addEventListener("change", this.updateFPS.bind(this));
    playBtn.addEventListener("click", this.handlePlay.bind(this));
    // pauseBtn.addEventListener("click", this.handlePause.bind(this));

    canvas.addEventListener("mousedown", this.startDrawing.bind(this));
    canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
    canvas.addEventListener("mouseout", this.stopDrawing.bind(this)); // 캔버스 밖으로 마우스가 나갔을 때 드로잉 중지
    canvas.addEventListener("mousemove", this.draw.bind(this));

    penTool.addEventListener("click", this.changeTool.bind(this));
    eraseTool.addEventListener("click", this.changeTool.bind(this));
    allEraseTool.addEventListener("click", this.changeTool.bind(this));

    prevBtn.addEventListener("click", this.handlePrevBtn.bind(this));
    currentPage.addEventListener("change", this.handleCurrentPage.bind(this));
    nextBtn.addEventListener("click", this.handleNextBtn.bind(this));
    deleteBtn.addEventListener("click", this.handleDeleteBtn.bind(this));

    // TODO: 선행 이벤트
    window.addEventListener(
      "page-update",
      this.updatePageView.bind(this) as EventListener
    );
    window.addEventListener("resize", this.resizeCanvas.bind(this));
    window.addEventListener("keydown", this.handleKeydown.bind(this));
    window.addEventListener("click", this.handleClick.bind(this));
  }

  setLineWidth(value: number) {
    this.lineWidth = value;
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    this.animator.clearCanvas(ctx);
  }

  private handleDeleteBtn() {
    this.dataModule.currentToon.document.removePage();
    this.renderCanvas();
  }

  private handleClick(e: MouseEvent) {
    const target = e.target;
    if (target) {
      if (target === saveBtn) {
        this.dataModule.save();
      }
      if (target === loadBtn) {
        const loadedData = this.dataModule.load();
        this.dataModule.applyData(loadedData);
        this.renderCanvas();
      }
      if (target === clearBtn) {
        this.clearCanvas(ctx);
      }
    }
  }

  private updatePageView(e: CustomEvent) {
    const { page, total } = e.detail;
    currentPage.value = "" + (page + 1);
    totalPage.innerText = total;
  }

  private toggleUseRepeatDelay() {
    this.useRepeatDelay = !this.useRepeatDelay;
    if (this.useRepeatDelay) {
      useRepeatDelay.innerText = "use repeat delay";
      useRepeatDelay.setAttribute("use", "");
    } else {
      useRepeatDelay.innerText = "not use repeat delay";
      useRepeatDelay.removeAttribute("use");
    }
  }

  private handleRepeatDelay() {
    this.repeatDelay = +repeatDelay.value;
  }

  private toggleRepeatable() {
    this.gifRepeatable = !this.gifRepeatable;
    if (this.gifRepeatable) {
      gifRepeat.innerText = "repeat";
      gifRepeat.setAttribute("repeat", "");
      repeatDelay.classList.remove("hidden");
      useRepeatDelay.classList.remove("hidden");
    } else {
      gifRepeat.innerText = "no repeat";
      gifRepeat.removeAttribute("repeat");
      repeatDelay.classList.add("hidden");
      useRepeatDelay.classList.add("hidden");
    }
  }

  private handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowLeft":
        this.handlePrevBtn();
        break;
      case "ArrowRight":
        this.handleNextBtn();
        break;
      default:
        break;
    }
  }

  private async exportGif() {
    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: canvas.width,
      height: canvas.height,
      repeat: this.gifRepeatable ? 0 : -1,
    });
    const frames = this.dataModule.currentToon.document.getFrames();
    let current = 0;

    const progress = document.createElement("progress");

    progress.max = frames.length;

    document.body.appendChild(progress);

    for (const frame of frames) {
      const imageFrame = await this.animator.renderFrame(frame, ctx);
      current += 1;
      progress.value = current;
      if (this.useRepeatDelay && frames[frames.length - 1] === frame) {
        gif.addFrame(imageFrame, {
          delay: this.repeatDelay,
        });
      } else {
        gif.addFrame(imageFrame, {
          delay: 1000 / this.animator.fps,
        });
      }
    }
    gif.on("finished", function (blob) {
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = "result.gif";
      a.href = downloadUrl;
      a.click();
      URL.revokeObjectURL(downloadUrl);
      a.remove();
    });
    gif.render();
  }

  private async handlePlay() {
    clearTimeout(this.playReady);

    this.animator.clearCanvas(prevCtx);
    this.animator.clearCanvas(nextCtx);

    console.log("playing...", this.isPlaying);
    if (!this.isPlaying) {
      this.isPlaying = true;
      playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
        <path fill-rule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clip-rule="evenodd" />
      </svg>`;
      await this.animator.playSequences(this.dataModule.currentToon, ctx);
      console.log("done!");

      this.playReady = window.setTimeout(() => {
        this.animator.clearPlayQueue();
        this.isPlaying = false;
        playBtn.innerHTML = `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4">
          <path
            fill-rule="evenodd"
            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
            clip-rule="evenodd" />
        </svg>`;
        this.renderCanvas();
      }, 500);
    } else {
      this.animator.clearPlayQueue();
      this.isPlaying = false;
      playBtn.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4">
        <path
          fill-rule="evenodd"
          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
          clip-rule="evenodd" />
      </svg>`;
      this.renderCanvas();
    }
  }

  // private handlePause() {
  //   //
  // }

  private updateFPS() {
    this.animator.setFPS(+fpsBar.value);
    this.animator;
  }

  private resizeCanvas() {
    canvas.width = 640 || window.innerWidth;
    canvas.height = 320 || window.innerHeight;

    prevCanvas.width = 640 || window.innerWidth;
    prevCanvas.height = 320 || window.innerHeight;

    nextCanvas.width = 640 || window.innerWidth;
    nextCanvas.height = 320 || window.innerHeight;

    this.renderCanvas();
  }

  private changeTool(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;
    const tool = target.dataset.tool;
    if (tool === "pen") {
      this.mode = "pen";
      this.setLineWidth(this.thickness);
    } else if (tool === "erase") {
      this.mode = "erase";
      this.setLineWidth(this.eraseSize);
    } else if (tool === "all-erase") {
      this.dataModule.currentToon.document.clearPage();
      this.renderCanvas();
    }
    thicknessBar.value = "" + this.lineWidth;
  }

  private handlePrevBtn() {
    let value = +currentPage.value - 1;

    if (value < 1) {
      value = 1;
    }

    currentPage.value = "" + value;

    this.clearCanvas(prevCtx);
    this.dataModule.currentToon.document.prev();
    this.renderCanvas();
  }

  private handleCurrentPage() {
    console.log("change");
    this.clearCanvas(ctx);
    this.dataModule.currentToon.document.setCurrentPage(
      (+currentPage.value || 1) - 1
    );
    this.renderCanvas();
  }

  private handleNextBtn() {
    currentPage.value = "" + (+currentPage.value + 1);
    this.clearCanvas(nextCtx);
    this.dataModule.currentToon.document.next();
    this.renderCanvas();
  }

  private updateThickness() {
    const thickness = +thicknessBar.value;

    if (this.mode === "pen") {
      this.setLineWidth((this.thickness = thickness));
    } else if (this.mode === "erase") {
      this.setLineWidth((this.eraseSize = thickness));
    }
  }

  private startDrawing(e: MouseEvent) {
    const x = e.offsetX;
    const y = e.offsetY;
    const point = { x, y };

    this.isDrawing = true;
    this.lastTime = Date.now();
    this.lastPoint = point;
    this.dataModule.currentToon.document.startLine();
  }

  private stopDrawing() {
    this.isDrawing = false;
    this.lastPoint = null;
    // 빈 라인 배열 정리
    const isNoLine = this.dataModule.currentToon.document.isNoLine();
    if (isNoLine) return;
    const lastLine = this.dataModule.currentToon.document.getLastLine();
    if (lastLine.length === 0) {
      this.dataModule.currentToon.document.removeEmptyLine();
    }
  }

  draw(e: MouseEvent) {
    if (!this.isDrawing) return;
    const x = e.offsetX;
    const y = e.offsetY;
    const point = { x, y };
    const thickness = this.lineWidth;
    const mode = this.mode;
    this.lastPoint = point;
    this.dataModule.currentToon.document
      .getLastLine()
      .push({ mode, x, y, thickness });
    this.renderCanvas();
  }

  renderCanvas() {
    const current = this.dataModule.currentToon;
    if (current) {
      const prevPage = current.document.getPrevPage();
      const nextPage = current.document.getNextPage();
      const page = current.document.getPage();
      this.animator.clearCanvas(prevCtx);
      this.animator.clearCanvas(nextCtx);
      this.animator.clearCanvas(ctx);
      if (prevPage) {
        this.animator.renderCanvas(prevPage, "#8188f0", prevCtx);
      }
      if (nextPage) {
        this.animator.renderCanvas(nextPage, "#72b063", nextCtx);
      }
      if (page) {
        this.animator.renderCanvas(page, "#000000", ctx);
      }
    }
  }
}

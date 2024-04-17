import GIF from "gif.js";
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
import { DataModule } from "./data.module";
import { Animator } from "../models/animator";

export class EventModule {
  // dataModule!: DataModule;
  // animator!: Animator;
  modules!: {
    animator: Animator;
    dataModule: DataModule;
  };

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

  initialize() {
    this.setupListener();
    this.setLineWidth(+(thicknessBar.value = "" + this.thickness));
    this.resizeCanvas();
    this.modules.dataModule.currentToon.document.requestPageUpdate();
  }

  use<T extends DataModule | Animator>(module: T) {
    function lowerCase(word: string) {
      return word[0].toLowerCase() + word.slice(1);
    }
    if (!this.modules) {
      Object.assign(this, { modules: {} });
    }
    this.modules[lowerCase(module.constructor.name)] = module;
  }

  private setupListener() {
    // useRepeatDelay.addEventListener(
    //   "click",
    //   this.toggleUseRepeatDelay.bind(this)
    // );
    // thicknessBar.addEventListener("change", this.updateThickness.bind(this));
    // repeatDelay.addEventListener("change", this.handleRepeatDelay.bind(this));
    // fpsBar.addEventListener("change", this.updateFPS.bind(this));
    // currentPage.addEventListener("change", this.handleCurrentPage.bind(this));

    // gifRepeat.addEventListener("click", this.toggleRepeatable.bind(this));
    // exportGifBtn.addEventListener("click", this.exportGif.bind(this));

    // playBtn.addEventListener("click", this.handlePlay.bind(this));
    // pauseBtn.addEventListener("click", this.handlePause.bind(this));
    // penTool.addEventListener("click", this.changeTool.bind(this));
    // eraseTool.addEventListener("click", this.changeTool.bind(this));
    // allEraseTool.addEventListener("click", this.changeTool.bind(this));

    // prevBtn.addEventListener("click", this.handlePrevBtn.bind(this));
    // nextBtn.addEventListener("click", this.handleNextBtn.bind(this));
    // deleteBtn.addEventListener("click", this.handleDeleteBtn.bind(this));

    /* mouse event */
    canvas.addEventListener("mousedown", this.startDrawing.bind(this));
    canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
    canvas.addEventListener("mouseout", this.stopDrawing.bind(this)); // 캔버스 밖으로 마우스가 나갔을 때 드로잉 중지
    canvas.addEventListener("mousemove", this.draw.bind(this));

    // TODO: 선행 이벤트
    window.addEventListener(
      "page-update",
      this.updatePageView.bind(this) as EventListener
    );
    window.addEventListener("change", this.handleChange.bind(this));
    window.addEventListener("resize", this.resizeCanvas.bind(this));
    window.addEventListener("keydown", this.handleKeydown.bind(this));
    window.addEventListener("click", this.handleClick.bind(this));
  }

  setLineWidth(value: number) {
    this.lineWidth = value;
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    this.modules.animator.clearCanvas(ctx);
  }

  private handleChange(e: Event) {
    // thicknessBar.addEventListener("change", this.updateThickness.bind(this));
    // repeatDelay.addEventListener("change", this.handleRepeatDelay.bind(this));
    // fpsBar.addEventListener("change", this.updateFPS.bind(this));
    // currentPage.addEventListener("change", this.handleCurrentPage.bind(this));
    const target = e.target as HTMLInputElement;

    if (target.dataset.tool === "thickness") {
      this.updateThickness(target);
    }
    if (target.dataset.tool === "repeat-delay") {
      this.handleRepeatDelay(target);
    }
    if (target.dataset.tool === "fps") {
      this.updateFPS(target);
    }
    if (target.dataset.tool === "page") {
      this.handleCurrentPage(target);
    }
  }

  private handleDeleteBtn() {
    this.modules.dataModule.currentToon.document.removePage();
    this.renderCanvas();
  }

  private handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const closest = (el: HTMLElement, dataset: string, value: string) =>
      el.closest(`[data-${dataset}="${value}"]`);

    if (target) {
      if (closest(target, "tool", "save")) {
        this.modules.dataModule.save();
      }
      if (closest(target, "tool", "load")) {
        const loadedData = this.modules.dataModule.load();
        this.modules.dataModule.applyData(loadedData);
        this.renderCanvas();
      }
      if (closest(target, "tool", "clear")) {
        this.clearCanvas(ctx);
      }
      if (closest(target, "tool", "delete-page")) {
        this.handleDeleteBtn();
      }
      if (closest(target, "tool", "play")) {
        this.handlePlay();
      }
      if (closest(target, "tool", "prev-page")) {
        this.handlePrevBtn();
      }
      if (closest(target, "tool", "next-page")) {
        this.handleNextBtn();
      }
      if (closest(target, "tool", "pen")) {
        this.changeTool("pen");
      }
      if (closest(target, "tool", "erase")) {
        this.changeTool("erase");
      }
      if (closest(target, "tool", "all-erase")) {
        this.changeTool("all-erase");
      }
      if (closest(target, "tool", "gif-repeat")) {
        this.toggleRepeatable(target);
      }
      if (closest(target, "tool", "use-repeat-delay")) {
        this.toggleUseRepeatDelay();
      }
      if (closest(target, "tool", "export-gif")) {
        this.exportGif();
      }
    }
  }

  private updatePageView(e: CustomEvent) {
    const currentPages =
      document.querySelectorAll<HTMLInputElement>('[data-tool="page"]');
    const totalPages = document.querySelectorAll<HTMLInputElement>(
      '[data-value="total"]'
    );
    const { page, total } = e.detail;
    currentPages.forEach((currentPage) => {
      currentPage.value = "" + (page + 1);
    });
    totalPages.forEach((totalPage) => {
      totalPage.innerText = total;
    });
  }

  private toggleUseRepeatDelay() {
    const useRepeatDelay = document.querySelectorAll<HTMLElement>(
      `[data-tool="use-repeat-delay"]`
    );
    this.useRepeatDelay = !this.useRepeatDelay;
    useRepeatDelay.forEach((el) => {
      if (this.useRepeatDelay) {
        el.innerText = "use repeat delay";
        el.setAttribute("use", "");
      } else {
        el.innerText = "not use repeat delay";
        el.removeAttribute("use");
      }
    });
  }

  // private handleRepeatDelay() {
  //   this.repeatDelay = +repeatDelay.value;
  // }
  private handleRepeatDelay(target: HTMLInputElement) {
    this.repeatDelay = +target.value;
  }

  private toggleRepeatable(target: HTMLElement) {
    const targets = document.querySelectorAll<HTMLButtonElement>(
      '[data-tool="gif-repeat"]'
    );
    const repeatDelay = document.querySelectorAll('[data-tool="repeat-delay"]');
    const useRepeatDelay = document.querySelectorAll(
      '[data-tool="use-repeat-delay"]'
    );
    this.gifRepeatable = !this.gifRepeatable;
    targets.forEach((target) => {
      if (this.gifRepeatable) {
        target.innerText = "repeat";
        target.setAttribute("repeat", "");
      } else {
        target.innerText = "no repeat";
        target.removeAttribute("repeat");
      }
    });
    if (this.gifRepeatable) {
      // target.innerText = "repeat";
      // target.setAttribute("repeat", "");
      repeatDelay.forEach((el) => {
        el.removeAttribute("hidden");
        el.classList.remove("hidden");
      });
      useRepeatDelay.forEach((el) => {
        el.removeAttribute("hidden");
        el.classList.remove("hidden");
      });
    } else {
      // target.innerText = "no repeat";
      // target.removeAttribute("repeat");
      repeatDelay.forEach((el) => {
        el.setAttribute("hidden", "true");
        el.classList.add("hidden");
      });
      useRepeatDelay.forEach((el) => {
        el.setAttribute("hidden", "true");
        el.classList.add("hidden");
      });
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
    const update = this.renderCanvas.bind(this);
    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: canvas.width,
      height: canvas.height,
      repeat: this.gifRepeatable ? 0 : -1,
    });
    const frames = this.modules.dataModule.currentToon.document.getFrames();
    let current = 0;

    const percentage = document.createElement("div");
    percentage.innerText = "0%";
    const progress = document.createElement("progress");
    percentage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 101;
    `;
    progress.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      width: 30vw;
    `;

    progress.max = frames.length;

    document.body.appendChild(progress);
    document.body.appendChild(percentage);

    for (const frame of frames) {
      const imageFrame = await this.modules.animator.renderFrame(frame, ctx);
      current += 1;
      percentage.innerText =
        "" +
        parseFloat(
          (((progress.value = current) / frames.length) * 100).toFixed(2)
        ) +
        "%";
      if (this.useRepeatDelay && frames[frames.length - 1] === frame) {
        gif.addFrame(imageFrame, {
          delay: this.repeatDelay,
        });
      } else {
        gif.addFrame(imageFrame, {
          delay: 1000 / this.modules.animator.fps,
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
      progress?.remove();
      percentage?.remove();
      update();
    });
    gif.render();
  }

  private async handlePlay() {
    clearTimeout(this.playReady);

    this.modules.animator.clearCanvas(prevCtx);
    this.modules.animator.clearCanvas(nextCtx);

    console.log("playing...", this.isPlaying);
    if (!this.isPlaying) {
      this.isPlaying = true;
      playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
        <path fill-rule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clip-rule="evenodd" />
      </svg>`;
      await this.modules.animator.playSequences(
        this.modules.dataModule.currentToon,
        ctx
      );
      console.log("done!");

      this.playReady = window.setTimeout(() => {
        this.modules.animator.clearPlayQueue();
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
      this.modules.animator.clearPlayQueue();
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

  // private updateFPS() {
  //   this.modules.animator.setFPS(+fpsBar.value);
  //   this.modules.animator;
  // }
  private updateFPS(target: HTMLInputElement) {
    this.modules.animator.setFPS(+target.value);
    this.modules.animator;
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

  private changeTool(tool: string) {
    // const target = e.target as HTMLButtonElement;
    // const tool = target.dataset.tool;
    if (tool === "pen") {
      this.mode = "pen";
      this.setLineWidth(this.thickness);
    } else if (tool === "erase") {
      this.mode = "erase";
      this.setLineWidth(this.eraseSize);
    } else if (tool === "all-erase") {
      this.modules.dataModule.currentToon.document.clearPage();
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
    this.modules.dataModule.currentToon.document.prev();
    this.renderCanvas();
  }

  // private handleCurrentPage() {
  //   console.log("change");
  //   this.clearCanvas(ctx);
  //   this.modules.dataModule.currentToon.document.setCurrentPage(
  //     (+currentPage.value || 1) - 1
  //   );
  //   this.renderCanvas();
  // }
  private handleCurrentPage(target: HTMLInputElement) {
    console.log("change");
    this.clearCanvas(ctx);
    this.modules.dataModule.currentToon.document.setCurrentPage(
      (+target.value || 1) - 1
    );
    this.renderCanvas();
  }

  private handleNextBtn() {
    const pages =
      document.querySelectorAll<HTMLInputElement>('[data-tool="page"]');
    pages.forEach((page) => {
      page.value = "" + (+page.value + 1);
      this.clearCanvas(nextCtx);
      this.modules.dataModule.currentToon.document.next();
      this.renderCanvas();
    });
  }

  // private updateThickness() {
  //   const thickness = +thicknessBar.value;

  //   if (this.mode === "pen") {
  //     this.setLineWidth((this.thickness = thickness));
  //   } else if (this.mode === "erase") {
  //     this.setLineWidth((this.eraseSize = thickness));
  //   }
  // }
  private updateThickness(target: HTMLInputElement) {
    const thickness = +target.value;

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
    this.modules.dataModule.currentToon.document.startLine();
  }

  private stopDrawing() {
    this.isDrawing = false;
    this.lastPoint = null;
    // 빈 라인 배열 정리
    const isNoLine = this.modules.dataModule.currentToon.document.isNoLine();
    if (isNoLine) return;
    const lastLine = this.modules.dataModule.currentToon.document.getLastLine();
    if (lastLine.length === 0) {
      this.modules.dataModule.currentToon.document.removeEmptyLine();
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
    this.modules.dataModule.currentToon.document
      .getLastLine()
      .push({ mode, x, y, thickness });
    this.renderCanvas();
  }

  renderCanvas() {
    const current = this.modules.dataModule.currentToon;
    if (current) {
      const prevPage = current.document.getPrevPage();
      const nextPage = current.document.getNextPage();
      const page = current.document.getPage();
      this.modules.animator.clearCanvas(prevCtx);
      this.modules.animator.clearCanvas(nextCtx);
      this.modules.animator.clearCanvas(ctx);
      if (prevPage) {
        this.modules.animator.renderCanvas(prevPage, "#8188f0", prevCtx);
      }
      if (nextPage) {
        this.modules.animator.renderCanvas(nextPage, "#72b063", nextCtx);
      }
      if (page) {
        this.modules.animator.renderCanvas(page, "#000000", ctx);
      }
    }
  }
}

import GIF from "gif.js";
import { EasyWebtoon } from "../easy.webtoon";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DEFAULT_ERASE_SIZE,
  DEFAULT_REPEAT_DELAY,
  DEFAULT_THICKNESS,
} from "../global/env";
import { AnimatorModule } from "./animator.module";
import { DataModule } from "./data.module";
import { IModule } from "./imodule";
import { ToolModule } from "./tool.module";
import { DrawTools } from "./tools/draw.tool";
import { ExportTools } from "./tools/export.tool";
import { GuideTools } from "./tools/guide.tool";
import { PageTools } from "./tools/page.tool";
import { SequenceTools } from "./tools/sequence.tool";

type EventModuleType = {
  toolModule: ToolModule;
  animatorModule: AnimatorModule;
  dataModule: DataModule;
};

type CustomEventType = {
  type:
    | (
        | PageTools
        | DrawTools
        | GuideTools
        | SequenceTools
        | ExportTools
      )["dataType"]
    | OnEventNames;
  data: object;
};

export class EventModule extends IModule<EventModuleType> {
  private parent: EasyWebtoon;

  lastTime: number = 0;
  lastPoint: Omit<Point, "thickness" | "mode"> | null = null;

  thickness: number = DEFAULT_THICKNESS;
  eraseSize: number = DEFAULT_ERASE_SIZE;

  lineWidth: number = this.thickness;

  isDrawing: boolean = false;

  mode: "pen" | "erase" = "pen";

  isPlaying: boolean = false;

  gifRepeatable: boolean = false;
  showBothSideLines: boolean = true;
  useRepeatDelay: boolean = false;
  repeatDelay: number = DEFAULT_REPEAT_DELAY;

  playReady: number = 0;

  eventList: { name: string; event: EventListener }[] = [];

  isMobile: [boolean, boolean] = [false, false];

  deadzone: boolean = false;

  constructor(parent: EasyWebtoon) {
    super();
    this.parent = parent;
  }

  setupCanvas() {
    const canvas = this.modules.animatorModule.canvas;
    const prevCanvas = this.modules.animatorModule.prevCanvas;
    const nextCanvas = this.modules.animatorModule.nextCanvas;
    const wrap = document.getElementById("wrap");
    if (wrap) {
      wrap.append(nextCanvas, prevCanvas, canvas);
    }
  }

  initialize() {
    const thicknessBar = document.querySelector<HTMLInputElement>(
      '[data-tool="thickness"]'
    ) as HTMLInputElement;
    if (!thicknessBar) throw "No thickness Element.";
    this.setupListener();
    this.setLineWidth(+(thicknessBar.value = "" + this.thickness));
    this.resizeCanvas();
    this.modules.dataModule.currentToon.document.requestPageUpdate();
  }

  destroy() {
    for (const { name, event } of this.eventList) {
      window.removeEventListener(name, event);
    }
    this.eventList = [];
    this.parent.eventListeners["destroy"]?.forEach((cb) => {
      cb();
    });
  }

  private setupListener() {
    this.eventList.push(
      {
        name: this.parent.EMMIT_TYPE,
        event: this.handleCommandEasyWebtoon.bind(this) as EventListener,
      },
      {
        name: "touchstart",
        event: this.startDrawingTouch.bind(this) as EventListener,
      },
      {
        name: "mousedown",
        event: this.startDrawing.bind(this) as EventListener,
      },
      { name: "mouseup", event: this.stopDrawing.bind(this) as EventListener },
      // { name: "mouseout", event: this.stopDrawing.bind(this) as EventListener },
      { name: "mousemove", event: this.draw.bind(this) as EventListener },
      {
        name: "touchmove",
        event: this.drawMobile.bind(this) as EventListener,
      },
      {
        name: "page-update",
        event: this.updatePageView.bind(this) as EventListener,
      },
      { name: "input", event: this.handleChange.bind(this) as EventListener },
      { name: "resize", event: this.resizeCanvas.bind(this) as EventListener },
      {
        name: "keydown",
        event: this.handleKeydown.bind(this) as EventListener,
      },
      { name: "click", event: this.handleClick.bind(this) as EventListener }
    );
    for (const { name, event } of this.eventList) {
      window.addEventListener(name, event);
    }
  }

  setLineWidth(value: number) {
    this.lineWidth = value;
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    this.modules.animatorModule.clearCanvas(ctx);
  }

  /* 추후 사용 예정 */
  private handleCommandEasyWebtoon(e: CustomEvent<CustomEventType>) {
    if (e.detail) {
      switch (e.detail.type) {
        case "pen": {
          this.changeTool("pen");
          break;
        }
        case "all-erase": {
          this.changeTool("all-erase");
          break;
        }
        case "erase": {
          this.changeTool("erase");
          break;
        }
        case "create-toon": {
          this.modules.dataModule.addToon();
          break;
        }
        case "select-toon": {
          const toon = this.modules.dataModule.findToonById(e.detail.data.id);
          if (toon) {
            this.modules.dataModule.setCurrent(toon);
            this.renderCanvas();
          }
          break;
        }
        default: {
          console.log("no type");
          break;
        }
      }
    }
  }

  private handleChange(e: Event) {
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

    if (this.isPlaying) return;

    if (target) {
      /* localStorage functions */
      if (closest(target, "tool", "save")) {
        this.modules.dataModule.save();
      }
      if (closest(target, "tool", "load")) {
        const loadedData = this.modules.dataModule.load();
        this.modules.dataModule.applyData(loadedData);
        this.renderCanvas();
      }

      /* page functions */
      if (closest(target, "tool", "create-page-before")) {
        this.modules.dataModule.currentToon.document.addPageBefore();
        this.renderCanvas();
      }
      if (closest(target, "tool", "create-page-after")) {
        this.modules.dataModule.currentToon.document.addPageAfter();
        this.renderCanvas();
      }
      if (closest(target, "tool", "copy-page")) {
        this.modules.dataModule.copyPage();
      }
      if (closest(target, "tool", "clear-copy-page")) {
        console.log("clear copy");
        this.modules.dataModule.clearCopyPage();
      }
      if (closest(target, "tool", "paste-page")) {
        this.modules.dataModule.pastePage();
        this.renderCanvas();
      }
      if (closest(target, "tool", "delete-page")) {
        this.handleDeleteBtn();
      }

      /* sequence tool functions */
      if (closest(target, "tool", "play")) {
        this.handlePlay();
      }
      if (closest(target, "tool", "prev-page")) {
        this.handlePrevBtn();
      }
      if (closest(target, "tool", "next-page")) {
        this.handleNextBtn();
      }

      /* draw tool functions */
      if (closest(target, "tool", "clear")) {
        this.clearCanvas(this.modules.animatorModule.ctx);
      }
      if (closest(target, "tool", "undo")) {
        this.changeTool("undo");
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

      /* guide tool functions */
      if (closest(target, "tool", "both-side-lines")) {
        this.toggleGuideBothSideLines();
      }

      /* export functions */
      if (closest(target, "tool", "gif-repeat")) {
        this.toggleRepeatable();
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
      '[data-tool="total"]'
    );
    const { page, total } = e.detail;
    currentPages.forEach((currentPage) => {
      currentPage.value = "" + (page + 1);
    });
    totalPages.forEach((totalPage) => {
      totalPage.innerText = total;
    });
  }

  private toggleGuideBothSideLines() {
    const bothSideLine = document.querySelectorAll<HTMLElement>(
      `[data-tool="both-side-lines"]`
    );
    bothSideLine.forEach((el) => {
      this.showBothSideLines = !this.showBothSideLines;
      if (this.showBothSideLines) {
        el.setAttribute("active", "");
      } else {
        el.removeAttribute("active");
      }
    });
    this.renderCanvas();
  }

  private toggleUseRepeatDelay() {
    const useRepeatDelay = document.querySelectorAll<HTMLElement>(
      `[data-tool="use-repeat-delay"]`
    );
    this.useRepeatDelay = !this.useRepeatDelay;
    useRepeatDelay.forEach((el) => {
      if (this.useRepeatDelay) {
        el.innerText = "지연 시간 사용";
        el.setAttribute("active", "");
      } else {
        el.innerText = "지연 시간 사용";
        el.removeAttribute("active");
      }
    });
  }

  private handleRepeatDelay(target: HTMLInputElement) {
    this.repeatDelay = +target.value;
  }

  private toggleRepeatable() {
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
        target.innerText = "GIF 재생 반복";
        target.setAttribute("active", "");
      } else {
        target.innerText = "GIF 재생 반복";
        target.removeAttribute("active");
      }
    });
    if (this.gifRepeatable) {
      repeatDelay.forEach((el) => {
        el.removeAttribute("hidden");
        el.classList.remove("hidden");
      });
      useRepeatDelay.forEach((el) => {
        el.removeAttribute("hidden");
        el.classList.remove("hidden");
      });
    } else {
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
    if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      this.modules.dataModule.copyPage();
      return;
    }
    if (e.ctrlKey && e.key === "v") {
      e.preventDefault();
      this.modules.dataModule.pastePage();
      this.renderCanvas();
      return;
    }
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        this.handlePrevBtn();
        break;
      case "ArrowRight":
        e.preventDefault();
        this.handleNextBtn();
        break;
      default:
        break;
    }
  }

  private async exportGif() {
    // const update = this.renderCanvas.bind(this);
    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: this.modules.animatorModule.canvas.width,
      height: this.modules.animatorModule.canvas.height,
      repeat: this.gifRepeatable ? 0 : -1,
    });
    const frames = this.modules.dataModule.currentToon.document.getFrames();
    let current = 0;

    const percentage = document.createElement("div");
    percentage.innerText = "0%";
    const progress = document.createElement("div");
    const progressBar = document.createElement("span");
    const progressValue = document.createElement("span");

    progress.classList.add("progress");
    progressBar.classList.add("progress-bar");
    progressValue.classList.add("progress-value");

    progressBar.append(progressValue);
    progress.append(progressBar);

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

    // progress.max = frames.length;

    document.body.appendChild(progress);
    document.body.appendChild(percentage);

    for (const frame of frames) {
      const imageFrame = await this.modules.animatorModule.renderFrame(
        frame,
        this.modules.dataModule.currentToon.document.scale,
        this.modules.animatorModule.ctx
      );
      current += 1;
      const value =
        "" + parseFloat(((current / frames.length) * 100).toFixed(2)) + "%";
      progressValue.style.width = value;
      percentage.innerText = value;
      if (this.useRepeatDelay && frames[frames.length - 1] === frame) {
        gif.addFrame(imageFrame, {
          delay: this.repeatDelay * 1000,
        });
      } else {
        gif.addFrame(imageFrame, {
          delay: 1000 / this.modules.animatorModule.fps,
        });
      }
    }

    gif.on("finished", (blob) => {
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = "result.gif";
      a.href = downloadUrl;
      a.click();
      URL.revokeObjectURL(downloadUrl);
      a.remove();
      percentage?.remove();
      progress?.remove();
      this.renderCanvas();
      this.parent.eventListeners["export-gif"]?.forEach((cb) => {
        cb();
      });
    });
    gif.render();
  }

  private async handlePlay() {
    const playBtns = Array.from(
      document.querySelectorAll<HTMLButtonElement>('[data-tool="play"]')
    );

    clearTimeout(this.playReady);

    this.modules.animatorModule.clearCanvas(
      this.modules.animatorModule.prevCtx
    );
    this.modules.animatorModule.clearCanvas(
      this.modules.animatorModule.nextCtx
    );

    console.log("playing...", this.isPlaying);

    if (!this.isPlaying) {
      this.isPlaying = true;

      playBtns.forEach((playBtn) => {
        playBtn.setAttribute("active", "");
        playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
        <path fill-rule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clip-rule="evenodd" />
        </svg>`;
      });
      await this.modules.animatorModule.playSequences(
        this.modules.dataModule.currentToon,
        this.modules.animatorModule.ctx
      );
      console.log("done!");

      this.playReady = window.setTimeout(() => {
        this.modules.animatorModule.clearPlayQueue();
        this.isPlaying = false;
        playBtns.forEach((playBtn) => {
          playBtn.removeAttribute("active");
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
        });
        this.renderCanvas();
      }, 500);
    } else {
      this.modules.animatorModule.clearPlayQueue();
      this.isPlaying = false;
      playBtns.forEach((playBtn) => {
        playBtn.removeAttribute("active");
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
      });
      this.renderCanvas();
    }
  }

  private updateFPS(target: HTMLInputElement) {
    this.modules.animatorModule.setFPS(+target.value);
  }

  private resizeCanvas() {
    this.modules.animatorModule.canvas.width =
      CANVAS_WIDTH || window.innerWidth;
    this.modules.animatorModule.canvas.height =
      CANVAS_HEIGHT || window.innerHeight;

    this.modules.animatorModule.prevCanvas.width =
      CANVAS_WIDTH || window.innerWidth;
    this.modules.animatorModule.prevCanvas.height =
      CANVAS_HEIGHT || window.innerHeight;

    this.modules.animatorModule.nextCanvas.width =
      CANVAS_WIDTH || window.innerWidth;
    this.modules.animatorModule.nextCanvas.height =
      CANVAS_HEIGHT || window.innerHeight;

    const width =
      this.modules.animatorModule.canvas.getBoundingClientRect().width;
    const scale = CANVAS_WIDTH / width;
    this.modules.dataModule.currentToon.document.setScale(scale);

    this.renderCanvas();
  }

  private changeTool(tool: DrawTools["dataType"]) {
    function clearActivates() {
      const selectables = document.querySelectorAll(
        `[data-tool="pen"],[data-tool="erase"]`
      );
      selectables.forEach((el) => el.removeAttribute("active"));
    }

    if (tool === "pen") {
      clearActivates();
      const pens = document.querySelectorAll('[data-tool="pen"]');
      pens.forEach((el) => el.setAttribute("active", ""));
      this.mode = "pen";
      this.setLineWidth(this.thickness);
    } else if (tool === "erase") {
      clearActivates();
      const erases = document.querySelectorAll('[data-tool="erase"]');
      erases.forEach((el) => el.setAttribute("active", ""));
      this.mode = "erase";
      this.setLineWidth(this.eraseSize);
    } else if (tool === "all-erase") {
      this.modules.dataModule.currentToon.document.clearPage();
      this.renderCanvas();
    } else if (tool === "undo") {
      const page = this.modules.dataModule.currentToon.document.getPage();
      page.splice(page.length - 1);
      this.renderCanvas();
    }
    const thicknessBar = document.querySelector<HTMLInputElement>(
      '[data-tool="thickness"]'
    ) as HTMLInputElement;
    if (!thicknessBar) throw "No thickness Element.";
    thicknessBar.value = "" + this.lineWidth;
  }

  private handlePrevBtn() {
    const currentPages =
      document.querySelectorAll<HTMLInputElement>('[data-tool="page"]');

    currentPages.forEach((currentPage) => {
      let value = +currentPage.value - 1;
      if (value < 1) value = 1;
      currentPage.value = "" + value;
    });

    this.clearCanvas(this.modules.animatorModule.prevCtx);
    this.modules.dataModule.currentToon.document.prev();
    this.renderCanvas();
  }

  private handleCurrentPage(target: HTMLInputElement) {
    console.log("change");
    this.clearCanvas(this.modules.animatorModule.ctx);
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
      this.clearCanvas(this.modules.animatorModule.nextCtx);
      this.modules.dataModule.currentToon.document.next();
      this.renderCanvas();
    });
  }

  private updateThickness(target: HTMLInputElement) {
    document
      .querySelectorAll<HTMLInputElement>('[data-tool="thickness"]')
      .forEach((item) => {
        const thickness = +target.value;
        if (this.mode === "pen") {
          this.setLineWidth((this.thickness = thickness));
        } else if (this.mode === "erase") {
          this.setLineWidth((this.eraseSize = thickness));
        }
        item.value = "" + thickness;
      });
  }

  private startDrawing(e: MouseEvent) {
    if (this.isMobile[0]) return;

    // console.log("pc", this.isMobile, e);

    const target = e.target;

    if (target && !(target instanceof HTMLCanvasElement)) return;
    if (!this.isMobile[0]) {
      this.isMobile[1] = true;
    }
    e.preventDefault();

    const x = e.offsetX;
    const y = e.offsetY;
    const point = { x, y };

    this.isDrawing = true;
    this.lastTime = Date.now();
    this.lastPoint = point;
    this.modules.dataModule.currentToon.document.startLine();
  }

  private startDrawingTouch(e: TouchEvent) {
    if (this.isMobile[1]) return;

    const target = e.target;

    if (target && !(target instanceof HTMLCanvasElement)) return;
    // e.preventDefault();
    this.isMobile[0] = true;

    const width =
      this.modules.animatorModule.canvas.getBoundingClientRect().width;

    const offsetY =
      this.modules.animatorModule.canvas.getBoundingClientRect().top;

    const scale = CANVAS_WIDTH / width;
    this.modules.dataModule.currentToon.document.setScale(scale);

    const { clientX, clientY } = e.touches[0];

    const x = clientX;
    const y = clientY - offsetY;
    const point = { x, y };
    this.lastPoint = point;

    this.isDrawing = true;
    this.lastTime = Date.now();
    this.modules.dataModule.currentToon.document.startLine();

    this.deadzone = true;
    let dead = 0;
    function clear() {
      clearInterval(dead);
    }

    dead = window.setInterval(() => {
      // console.log("dotting...");
      window.dispatchEvent(new TouchEvent("touchmove"));
      if (!this.deadzone) {
        // console.log("dotting end");
        clear();
      }
    });
  }

  private stopDrawing(_e: MouseEvent) {
    if (
      (this.modules.dataModule.currentToon.document.getLastLine() ?? [])
        .length === 0
    ) {
      const thickness = this.lineWidth;
      const mode = this.mode;
      this.modules.dataModule.currentToon.document.getLastLine()?.push({
        mode,
        x: this.lastPoint?.x || 0,
        y: this.lastPoint?.y || 0,
        thickness,
      });
    }

    this.isDrawing = false;
    this.lastPoint = null;
    // 빈 라인 배열 정리
    const isNoLine = this.modules.dataModule.currentToon.document.isNoLine();
    if (isNoLine) return;
    const lastLine = this.modules.dataModule.currentToon.document.getLastLine();
    if (lastLine.length === 0) {
      this.modules.dataModule.currentToon.document.removeEmptyLine();
    }
    this.isMobile[0] = false;
    this.isMobile[1] = false;
    this.renderCanvas();
  }

  draw(e: MouseEvent) {
    if (this.isMobile[0]) return;
    if (!this.isDrawing) return;
    e.preventDefault();
    const width =
      this.modules.animatorModule.canvas.getBoundingClientRect().width;
    const scale = CANVAS_WIDTH / width;
    this.modules.dataModule.currentToon.document.setScale(scale);

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

  drawMobile(e: TouchEvent) {
    if (this.isMobile[1]) return;
    if (!this.isDrawing) return;

    // e.preventDefault();

    this.deadzone = false;

    const width =
      this.modules.animatorModule.canvas.getBoundingClientRect().width;

    const offsetY =
      this.modules.animatorModule.canvas.getBoundingClientRect().top;

    const scale = CANVAS_WIDTH / width;
    this.modules.dataModule.currentToon.document.setScale(scale);

    for (const { clientX, clientY } of e.touches) {
      const x = clientX;
      const y = clientY - offsetY;
      const point = { x, y };

      this.lastPoint = point;
      const thickness = this.lineWidth;
      const mode = this.mode;

      this.modules.dataModule.currentToon.document
        .getLastLine()
        .push({ mode, x, y, thickness });
      this.renderCanvas();
    }
  }

  renderCanvas() {
    const current = this.modules.dataModule.currentToon;
    if (current) {
      const prevPage = current.document.getPrevPage();
      const nextPage = current.document.getNextPage();
      const page = current.document.getPage();
      this.modules.animatorModule.clearCanvas(
        this.modules.animatorModule.prevCtx
      );
      this.modules.animatorModule.clearCanvas(
        this.modules.animatorModule.nextCtx
      );
      this.modules.animatorModule.clearCanvas(this.modules.animatorModule.ctx);
      if (this.showBothSideLines && prevPage) {
        this.modules.animatorModule.renderCanvas(
          prevPage,
          "#8188f0",
          this.modules.dataModule.currentToon.document.scale,
          this.modules.animatorModule.prevCtx
        );
      }
      if (this.showBothSideLines && nextPage) {
        this.modules.animatorModule.renderCanvas(
          nextPage,
          "#72b063",
          this.modules.dataModule.currentToon.document.scale,
          this.modules.animatorModule.nextCtx
        );
      }
      if (page) {
        this.modules.animatorModule.renderCanvas(
          page,
          "#000000",
          this.modules.dataModule.currentToon.document.scale,
          this.modules.animatorModule.ctx
        );
      }
    }
  }
}

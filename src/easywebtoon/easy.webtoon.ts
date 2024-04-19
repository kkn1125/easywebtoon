import { runQueue } from "./global/variables";
import { AnimatorModule } from "./modules/animator.module";
import { DataModule } from "./modules/data.module";
import { EventModule } from "./modules/event.module";
import { ToolModule } from "./modules/tool.module";

export class EasyWebtoon {
  eventModule: EventModule;
  dataModule: DataModule;
  animatorModule: AnimatorModule;
  toolModule: ToolModule;

  constructor() {
    const animatorModule = new AnimatorModule(20);
    const dataModule = new DataModule();
    const eventModule = new EventModule();
    const toolModule = new ToolModule();

    eventModule.use(toolModule);
    eventModule.use(animatorModule);
    eventModule.use(dataModule);

    this.toolModule = toolModule;
    this.animatorModule = animatorModule;
    this.dataModule = dataModule;
    this.eventModule = eventModule;
  }

  setGroupPageTool(target: HTMLElement) {
    this.toolModule.setGroup("pageTools", target);
  }

  setGroupDrawTool(target: HTMLElement) {
    this.toolModule.setGroup("drawTools", target);
  }

  setGroupGuideTool(target: HTMLElement) {
    this.toolModule.setGroup("guideTools", target);
  }

  setGroupSequenceTool(target: HTMLElement) {
    this.toolModule.setGroup("sequenceTools", target);
  }

  setGroupExportTool(target: HTMLElement) {
    this.toolModule.setGroup("exportTools", target);
  }

  run() {
    if (runQueue.length > 0) return;

    this.toolModule.render();
    this.dataModule.initialize();
    this.eventModule.setupCanvas();
    this.eventModule.initialize();

    console.log("running...");
    runQueue.push(1);
  }

  destroy() {
    runQueue.splice(0);
    const wrap = document.getElementById("wrap") as HTMLElement;
    const pageTool = document.getElementById("page-tool") as HTMLElement;
    const drawTool = document.getElementById("draw-tool") as HTMLElement;
    const guideTool = document.getElementById("guide-tool") as HTMLElement;
    const sequenceTool = document.getElementById(
      "sequence-tool"
    ) as HTMLElement;
    const exportTool = document.getElementById("export-tool") as HTMLElement;

    wrap.innerHTML = "";
    pageTool.innerHTML = "";
    drawTool.innerHTML = "";
    guideTool.innerHTML = "";
    sequenceTool.innerHTML = "";
    exportTool.innerHTML = "";

    this.eventModule.destroy();
  }
}

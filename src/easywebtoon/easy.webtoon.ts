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
    // console.log(this.toolModule.useTools)
  }

  setGroupPageTool(target: HTMLElement) {
    this.toolModule.setGroup("pageTools", target);
    // this.toolModule.useTools.pageTools.forEach((tool) => {
    //   target.append(tool);
    // });
  }

  setGroupDrawTool(target: HTMLElement) {
    this.toolModule.setGroup("drawTools", target);
    // this.toolModule.useTools.drawTools.forEach((tool) => {
    //   target.append(tool);
    // });
  }

  setGroupSequenceTool(target: HTMLElement) {
    this.toolModule.setGroup("sequenceTools", target);
    // this.toolModule.useTools.sequenceTools.forEach((tool) => {
    //   target.append(tool);
    // });
  }

  setGroupExportTool(target: HTMLElement) {
    this.toolModule.setGroup("exportTools", target);
    // this.toolModule.useTools.exportTool.forEach((tool) => {
    //   target.append(tool);
    // });
  }

  run() {
    if (runQueue.length > 0) return;

    this.toolModule.render();
    this.dataModule.initialize();
    this.eventModule.setupCanvas();
    this.eventModule.initialize();

    // this.eventModule.renderCanvas();
    console.log("running...");
    runQueue.push(1);
  }

  destroy() {
    runQueue.splice(0);
    const wrap = document.getElementById("wrap") as HTMLElement;
    const pageTool = document.getElementById("page-tool") as HTMLElement;
    const drawTool = document.getElementById("draw-tool") as HTMLElement;
    const sequenceTool = document.getElementById(
      "sequence-tool"
    ) as HTMLElement;
    const exportTool = document.getElementById("export-tool") as HTMLElement;

    wrap.innerHTML = "";
    pageTool.innerHTML = "";
    drawTool.innerHTML = "";
    sequenceTool.innerHTML = "";
    exportTool.innerHTML = "";

    this.eventModule.destroy();
  }
}

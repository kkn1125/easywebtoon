import { runQueue } from "./global/variables";
import { AnimatorModule } from "./modules/animator.module";
import { DataModule } from "./modules/data.module";
import { EventModule } from "./modules/event.module";
import { ToolModule } from "./modules/tool.module";
import { PartialTools } from "./modules/tools";
// import { PartialTools } from "./modules/tools";
import type { DrawTools } from "./modules/tools/draw.tool";
import type { ExportTools } from "./modules/tools/export.tool";
import type { GuideTools } from "./modules/tools/guide.tool";
import type { PageTools } from "./modules/tools/page.tool";
import type { SequenceTools } from "./modules/tools/sequence.tool";

export class EasyWebtoon {
  // private EMMIT_TYPE: string = "easywebtoon-command";

  eventModule: EventModule;
  dataModule: DataModule;
  animatorModule: AnimatorModule;
  toolModule: ToolModule;

  // /* 외부에서 콜백 사용 위함 */
  eventListeners: PartialTools = {};

  /* 이후 명령으로 조정할 수 있도록 사용 예정 */
  // emmit(
  //   commandType: (
  //     | DrawTools
  //     | ExportTools
  //     | GuideTools
  //     | PageTools
  //     | SequenceTools
  //   )["dataType"],
  //   data: any
  // ) {
  //   window.dispatchEvent(
  //     new CustomEvent(this.EMMIT_TYPE, {
  //       detail: {
  //         type: commandType,
  //         data,
  //       },
  //     })
  //   );
  // }

  constructor() {
    const animatorModule = new AnimatorModule(this, 20);
    const dataModule = new DataModule(this);
    const eventModule = new EventModule(this);
    const toolModule = new ToolModule(this);

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

    this.animatorModule.initialize();
    this.toolModule.render();
    this.dataModule.initialize();
    this.eventModule.setupCanvas();
    this.eventModule.initialize();

    console.log("running...");
    runQueue.push(1);

    this.eventListeners["app-loaded"]?.forEach((cb) => {
      cb();
    });
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

  on(
    type:
      | (
          | PageTools
          | DrawTools
          | GuideTools
          | SequenceTools
          | ExportTools
        )["dataType"]
      | OnEventNames,
    cb: () => void
  ) {
    if (!(type in this.eventListeners) && !this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }
    this.eventListeners[type]?.push(cb);
  }
}

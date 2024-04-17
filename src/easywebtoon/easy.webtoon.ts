import { resizeCanvas } from "./events/resize.canvas";
import { canvas } from "./global/variables";
import { Animator } from "./models/animator";
import { DataModule } from "./modules/data.module";
import { EventModule } from "./modules/event.module";
import { ToolModule } from "./modules/tool.module";

resizeCanvas(canvas);
window.addEventListener("resize", resizeCanvas.bind(this, canvas));

export class EasyWebtoon {
  eventModule: EventModule;
  dataModule: DataModule;
  animator: Animator;
  toolModule: ToolModule;

  constructor() {
    const animator = new Animator(20);
    const dataModule = new DataModule();
    const eventModule = new EventModule();
    const toolModule = new ToolModule();

    eventModule.use(animator);
    eventModule.use(dataModule);

    this.toolModule = toolModule;
    this.animator = animator;
    this.dataModule = dataModule;
    this.eventModule = eventModule;

    for (const el of toolModule.useTools.pageTools) {
      document.body.append(el);
    }
    for (const el of toolModule.useTools.sequenceTools) {
      document.body.append(el);
    }
    for (const el of toolModule.useTools.exportTool) {
      document.body.append(el);
    }
  }

  run() {
    this.dataModule.initialize();
    this.eventModule.initialize();
    // this.eventModule.renderCanvas();
    console.log("running...");
  }
}

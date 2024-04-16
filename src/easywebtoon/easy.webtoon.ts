import { resizeCanvas } from "./events/resize.canvas";
import { canvas } from "./global/variables";
import { Animator } from "./models/animator";
import { DataModule } from "./modules/data.module";
import { EventModule } from "./modules/event.module";

resizeCanvas(canvas);
window.addEventListener("resize", resizeCanvas.bind(this, canvas));

export class EasyWebtoon {
  eventModule: EventModule;

  constructor() {
    const eventModule = new EventModule(this);
    this.eventModule = eventModule;
  }

  run() {
    // this.eventModule.renderCanvas();
    console.log("running...");
  }
}

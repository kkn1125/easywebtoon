import { EasyWebtoon } from "../easy.webtoon";
import { ERROR_CODE } from "../models/error.code";
import { UseTools } from "./tools";
import { DrawTools } from "./tools/draw.tool";
import { ExportTools } from "./tools/export.tool";
import { GuideTools } from "./tools/guide.tool";
import { PageTools } from "./tools/page.tool";
import { SequenceTools } from "./tools/sequence.tool";

export class ToolModule {
  private parent: EasyWebtoon;

  group: {
    pageTools: HTMLElement | null;
    drawTools: HTMLElement | null;
    guideTools: HTMLElement | null;
    sequenceTools: HTMLElement | null;
    exportTools: HTMLElement | null;
  } = {
    pageTools: null,
    drawTools: null,
    guideTools: null,
    sequenceTools: null,
    exportTools: null,
  };

  pageTools = PageTools;
  drawTools = DrawTools;
  guideTools = GuideTools;
  sequenceTools = SequenceTools;
  exportTools = ExportTools;

  useTools = JSON.parse(JSON.stringify(UseTools)) as typeof UseTools;

  constructor(parent: EasyWebtoon) {
    this.parent = parent;

    const convertEls = (
      datas: PageTools | DrawTools | GuideTools | SequenceTools | ExportTools
    ) => {
      const el = this.createDataTool(datas.tagName, datas.dataType, []);

      if ("hidden" in datas && datas.hidden) {
        if (el instanceof HTMLDivElement) {
          const child = el.children[0] as HTMLInputElement;
          if (child) {
            child.hidden = datas.hidden;
            child.classList.add("hidden");
          }
        } else {
          el.hidden = datas.hidden;
          el.classList.add("hidden");
        }
      }

      if ("innerHTML" in datas && datas.innerHTML) {
        const temp = document.createElement("div");
        temp.innerHTML = datas.innerHTML;

        el.append(...temp.childNodes);
      }
      if ("innerText" in datas && datas.innerText)
        el.innerText = datas.innerText;

      if ("type" in datas && datas.type)
        (el.children[0] as HTMLInputElement).type = datas.type;
      if ("value" in datas && datas.value)
        (el.children[0] as HTMLInputElement).value = "" + datas.value;

      if ("step" in datas && datas.step)
        (el.children[0] as HTMLInputElement).step = datas.step;

      if ("min" in datas && datas.min)
        (el.children[0] as HTMLInputElement).min = datas.min;

      if ("max" in datas && datas.max)
        (el.children[0] as HTMLInputElement).max = datas.max;

      if ("active" in datas && datas.active) {
        el.setAttribute("active", "");
      }

      return el;
    };

    this.useTools.pageTools.push(
      ...Object.values(this.pageTools).map(convertEls)
    );
    this.useTools.drawTools.push(
      ...Object.values(this.drawTools).map(convertEls)
    );
    this.useTools.guideTools.push(
      ...Object.values(this.guideTools).map(convertEls)
    );
    this.useTools.sequenceTools.push(
      ...Object.values(this.sequenceTools).map(convertEls)
    );
    this.useTools.exportTools.push(
      ...Object.values(this.exportTools).map(convertEls)
    );

    this.parent.eventListeners["tool-initialized"]?.forEach((cb) => {
      cb({ message: ERROR_CODE["t000"] });
    });
  }

  cursorUpdate(mode: string) {
    const tools = {
      pen: `<span id="cursor">
    <svg
      data-mode="pen"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      style="width: 20px; height: 20px">
      <path
        d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
    </svg>
  </span>`,
      erase: `<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" fill="currentColor"><defs><style>.cls-1{fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:1.91px;}</style></defs><path class="cls-1" d="M13.59,19l-2.82,2.83a2.33,2.33,0,0,1-1.63.67h0a2.31,2.31,0,0,1-1.63-.67L2.17,16.49a2.31,2.31,0,0,1-.67-1.63h0a2.33,2.33,0,0,1,.67-1.63L5,10.41Z"/><rect class="cls-1" x="7.45" y="4.17" width="12.59" height="12.15" transform="translate(-3.22 12.73) rotate(-45)"/></svg>`,
      paint: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" version="1.1" id="Layer_1" width="800px" height="800px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
      <g>
        <path d="M83.095,47.878c-0.001-0.001-0.003-0.002-0.004-0.003l-32.088-32.09l-0.001,0l0,0c-0.984-0.984-2.578-0.984-3.562,0   l-5.26,5.26L30.934,9.799c-0.903-0.943-2.166-1.535-3.571-1.534c-2.743-0.001-4.966,2.231-4.964,4.986   c0,1.426,0.603,2.703,1.558,3.612l11.203,11.205L7.883,55.344c0,0,0,0,0,0c-0.984,0.983-0.984,2.578,0,3.562l32.091,32.092   c0.984,0.984,2.579,0.984,3.562,0l0.001-0.001L83.095,51.44C84.078,50.456,84.078,48.861,83.095,47.878z M63.391,57.106H20.233   l29.003-29.004l21.579,21.58L63.391,57.106z"/>
        <path d="M91.073,73.735l-5.97-10.339c-0.031-0.058-0.061-0.117-0.098-0.171L84.99,63.2l-0.004,0.002   c-0.302-0.418-0.788-0.69-1.351-0.69c-0.508,0-0.952,0.231-1.256,0.588l-0.016-0.009l-0.059,0.103   c-0.086,0.116-0.162,0.239-0.217,0.375l-5.835,10.105c-1.144,1.535-1.829,3.432-1.829,5.493c0,5.09,4.124,9.217,9.216,9.217   c5.093,0,9.217-4.127,9.217-9.217C92.856,77.133,92.189,75.26,91.073,73.735z"/>
      </g>
      </svg>`,
    };
    const tool = tools[mode];
    const cursor = document.getElementById("cursor");
    if (cursor) {
      cursor.innerHTML = "";
      cursor.innerHTML = tool;
    }
  }

  setupCursor() {
    const cursor = document.createElement("span");
    cursor.id = "cursor";
    document.body.append(cursor);
    this.cursorUpdate("pen");
  }

  setGroup(name: keyof ToolModule["group"], group: HTMLElement) {
    this.group[name] = group;
  }

  createDataTool(
    tagName: "button" | "input" | "span",
    dataType: string,
    classNames: string[] = []
  ): HTMLInputElement | HTMLButtonElement | HTMLSpanElement {
    const wrap = document.createElement("div");
    const el = document.createElement(tagName);

    if (
      el instanceof HTMLButtonElement ||
      el instanceof HTMLInputElement ||
      el instanceof HTMLSpanElement
    ) {
      el.dataset.tool = dataType;
    } else {
      throw "Invalid element type: " + tagName;
    }

    if (classNames.filter((_) => _).length > 0) {
      el.classList.add(...classNames);
    }

    if (tagName === "input") {
      wrap.append(el);
      return wrap;
    } else {
      return el;
    }
  }

  render() {
    this.useTools.pageTools.forEach((tool) => {
      this.group.pageTools?.append(tool);
    });
    this.useTools.sequenceTools.forEach((tool) => {
      this.group.sequenceTools?.append(tool);
    });
    this.useTools.guideTools.forEach((tool) => {
      this.group.guideTools?.append(tool);
    });
    this.useTools.drawTools.forEach((tool) => {
      this.group.drawTools?.append(tool);
    });
    this.useTools.exportTools.forEach((tool) => {
      this.group.exportTools?.append(tool);
    });
  }

  /* 이후 사용자가 원하는 위치에 원하는 버튼 위치시키기 위함 */
  //@ts-ignore
  private getToolset(
    toolName: (PageTools | DrawTools | SequenceTools | ExportTools)["dataType"]
  ) {
    return Object.values(this.useTools)
      .flat(1)
      .find((btn) => btn.dataset.tool === toolName);
  }
}

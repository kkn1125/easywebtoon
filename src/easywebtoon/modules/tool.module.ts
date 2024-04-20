import { EasyWebtoon } from "../easy.webtoon";
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
      cb();
    });
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

import { DEFAULT_REPEAT_DELAY, DEFAULT_THICKNESS } from "../global/env";

interface CreateElType {
  tagName: "button" | "input" | "span";
  dataType:
    | `${"prev" | "next" | "copy" | "paste" | "create" | "delete"}-page`
    | "total"
    | "undo"
    | "page"
    | "fps"
    | "pen"
    | "erase"
    | "all-erase"
    | "thickness"
    | "export-gif"
    | "repeat-delay"
    | "use-repeat-delay"
    | "gif-repeat"
    | "save"
    | "paste"
    | "delete"
    | "copy"
    | "save"
    | "play"
    | "load";
  innerHTML?: string;
  innerText?: string;
  value?: number | string;
  min?: string;
  max?: string;
  step?: string;
  hidden?: boolean;
  type?: string;
}

type pageToolNames =
  | "createPage"
  | "copyPage"
  | "pastePage"
  | "deletePage"
  | "saveBtn"
  | "loadBtn";
type drawToolNames =
  | "undoTool"
  | "penTool"
  | "eraseTool"
  | "allEraseTool"
  | "thicknessTool"
  | "thicknessBarTool";
type sequenceToolNames =
  | "fpsTool"
  | "pageTool"
  | "prevPage"
  | "totalTool"
  | "nextPage"
  | "playBtn";
type exportToolNames =
  | "exportGif"
  | "gifRepeat"
  | "useRepeatDelay"
  | "repeatDelay";

/* page tool */
const createPage: CreateElType = {
  tagName: "button",
  dataType: "create-page",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 576 512"
  fill="currentColor">
  <path
    d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z" />
</svg>`,
};
const copyPage: CreateElType = {
  tagName: "button",
  dataType: "copy-page",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 448 512"
  fill="currentColor">
  <path
    d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" />
</svg>`,
};
const pastePage: CreateElType = {
  tagName: "button",
  dataType: "paste-page",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 512 512"
  fill="currentColor">
  <path
    d="M160 0c-23.7 0-44.4 12.9-55.4 32H48C21.5 32 0 53.5 0 80V400c0 26.5 21.5 48 48 48H192V176c0-44.2 35.8-80 80-80h48V80c0-26.5-21.5-48-48-48H215.4C204.4 12.9 183.7 0 160 0zM272 128c-26.5 0-48 21.5-48 48V448v16c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V243.9c0-12.7-5.1-24.9-14.1-33.9l-67.9-67.9c-9-9-21.2-14.1-33.9-14.1H320 272zM160 40a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
</svg>`,
};
const deletePage: CreateElType = {
  tagName: "button",
  dataType: "delete-page",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 576 512"
  fill="currentColor">
  <path
    d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM288 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm224 0c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16s7.2 16 16 16H496c8.8 0 16-7.2 16-16z" />
</svg>`,
};
const saveBtn: CreateElType = {
  tagName: "button",
  dataType: "save",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 448 512"
  fill="currentColor">
  <path
    d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
</svg>`,
};
const loadBtn: CreateElType = {
  tagName: "button",
  dataType: "load",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 512 512"
  fill="currentColor">
  <path
    d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
</svg>`,
};

/* draw tool */
const undoTool: CreateElType = {
  tagName: "button",
  dataType: "undo",
  innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" version="1.1" fill="currentColor">
  <title>undo</title>
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Arrow" transform="translate(-480.000000, 0.000000)" fill-rule="nonzero">
          <g id="undo" transform="translate(480.000000, 0.000000)">
              <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" fill-rule="nonzero">

</path>
              <path d="M6.04599,11.6767 C7.35323,9.47493 9.75524,8 12.5,8 C16.6421,8 20,11.3579 20,15.5 C20,16.0523 20.4477,16.5 21,16.5 C21.5523,16.5 22,16.0523 22,15.5 C22,10.2533 17.7467,6 12.5,6 C9.31864,6 6.50386,7.56337 4.78,9.96279 L4.24303,6.91751 C4.14713,6.37361 3.62847,6.01044 3.08458,6.10635 C2.54068,6.20225 2.17751,6.72091 2.27342,7.2648 L3.31531,13.1736 C3.36136,13.4348 3.50928,13.667 3.72654,13.8192 C4.0104,14.0179 4.38776,14.0542 4.70227,13.9445 L10.3826,12.9429 C10.9265,12.847 11.2897,12.3284 11.1938,11.7845 C11.0979,11.2406 10.5792,10.8774 10.0353,10.9733 L6.04599,11.6767 Z" fill="currentColor">

</path>
          </g>
      </g>
  </g>
</svg><span>undo</span>`,
};
const penTool: CreateElType = {
  tagName: "button",
  dataType: "pen",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor">
  <path
    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
</svg><span>pen</span>`,
};
const eraseTool: CreateElType = {
  tagName: "button",
  dataType: "erase",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor">
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg><span>erase</span>`,
};
const allEraseTool: CreateElType = {
  tagName: "button",
  dataType: "all-erase",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor">
  <path
    fill-rule="evenodd"
    d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm18 3H3.75v9a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V9Zm-15-3.75A.75.75 0 0 0 4.5 6v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75H5.25Zm1.5.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V6Zm3-.75A.75.75 0 0 0 9 6v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75H9.75Z"
    clip-rule="evenodd" />
</svg><span>all erase</span>`,
};
const thicknessTool: CreateElType = {
  tagName: "input",
  dataType: "thickness",
  type: "number",
  min: "0.1",
  max: "30",
  step: "0.1",
  value: DEFAULT_THICKNESS,
};
const thicknessBarTool: CreateElType = {
  tagName: "input",
  dataType: "thickness",
  type: "range",
  min: "0.1",
  max: "30",
  step: "0.1",
  value: DEFAULT_THICKNESS,
};

/* sequence control */
const fpsTool: CreateElType = {
  tagName: "input",
  type: "number",
  dataType: "fps",
  min: "20",
  max: "60",
  step: "1",
  value: "20",
};
const prevPage: CreateElType = {
  tagName: "button",
  dataType: "prev-page",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor">
  <path
    fill-rule="evenodd"
    d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
    clip-rule="evenodd" />
</svg>`,
};
const pageTool: CreateElType = {
  tagName: "input",
  type: "number",
  dataType: "page",
  min: "1",
  value: "1",
};
const totalTool: CreateElType = {
  tagName: "span",
  dataType: "total",
  innerText: "1",
};
const nextPage: CreateElType = {
  tagName: "button",
  dataType: "next-page",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor">
  <path
    fill-rule="evenodd"
    d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
    clip-rule="evenodd" />
</svg>`,
};
const playBtn: CreateElType = {
  tagName: "button",
  dataType: "play",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor">
  <path
    fill-rule="evenodd"
    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
    clip-rule="evenodd" />
</svg>`,
};

/* export tool */
const gifRepeat: CreateElType = {
  tagName: "button",
  dataType: "gif-repeat",
  innerText: `no repeat`,
};
const useRepeatDelay: CreateElType = {
  tagName: "button",
  dataType: "use-repeat-delay",
  innerText: `not use repeat delay`,
  hidden: true,
};
const repeatDelay: CreateElType = {
  tagName: "input",
  dataType: "repeat-delay",
  type: "number",
  min: "0",
  value: "" + DEFAULT_REPEAT_DELAY,
  hidden: true,
};
const exportGif: CreateElType = {
  tagName: "button",
  dataType: "export-gif",
  innerHTML: `export to <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor">
  <path
    fill-rule="evenodd"
    d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm9 4.5a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5Zm1.5 0a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H16.5v2.25H18a.75.75 0 0 1 0 1.5h-1.5v3a.75.75 0 0 1-1.5 0v-7.5ZM6.636 9.78c.404-.575.867-.78 1.25-.78s.846.205 1.25.78a.75.75 0 0 0 1.228-.863C9.738 8.027 8.853 7.5 7.886 7.5c-.966 0-1.852.527-2.478 1.417-.62.882-.908 2-.908 3.083 0 1.083.288 2.201.909 3.083.625.89 1.51 1.417 2.477 1.417.967 0 1.852-.527 2.478-1.417a.75.75 0 0 0 .136-.431V12a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5H9v1.648c-.37.44-.774.602-1.114.602-.383 0-.846-.205-1.25-.78C6.226 13.638 6 12.837 6 12c0-.837.226-1.638.636-2.22Z"
    clip-rule="evenodd" />
</svg>`,
};

export class ToolModule {
  group: {
    pageTools: HTMLElement | null;
    drawTools: HTMLElement | null;
    sequenceTools: HTMLElement | null;
    exportTools: HTMLElement | null;
  } = {
    pageTools: null,
    drawTools: null,
    sequenceTools: null,
    exportTools: null,
  };

  pageTools: Record<pageToolNames, CreateElType> = {
    createPage,
    copyPage,
    pastePage,
    deletePage,
    saveBtn,
    loadBtn,
  };
  drawTools: Record<drawToolNames, CreateElType> = {
    thicknessTool,
    thicknessBarTool,
    undoTool,
    penTool,
    eraseTool,
    allEraseTool,
  };
  sequenceTools: Record<sequenceToolNames, CreateElType> = {
    playBtn,
    prevPage,
    pageTool,
    totalTool,
    nextPage,
    fpsTool,
  };
  exportTools: Record<exportToolNames, CreateElType> = {
    gifRepeat,
    useRepeatDelay,
    repeatDelay,
    exportGif,
  };

  useTools: Record<
    "pageTools" | "drawTools" | "sequenceTools" | "exportTools",
    (HTMLButtonElement | HTMLInputElement | HTMLSpanElement)[]
  > = {
    pageTools: [],
    drawTools: [],
    sequenceTools: [],
    exportTools: [],
  };

  constructor() {
    const convertEls = (datas: CreateElType) => {
      const el = this.createDataTool(datas.tagName, datas.dataType, []);

      if (datas.hidden) {
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

      if (datas.innerHTML) {
        const temp = document.createElement("div");
        temp.innerHTML = datas.innerHTML;

        el.append(...temp.childNodes);
      }
      if (datas.innerText) el.innerText = datas.innerText;

      if (datas.type) (el.children[0] as HTMLInputElement).type = datas.type;
      if (datas.value)
        (el.children[0] as HTMLInputElement).value = "" + datas.value;

      if (datas.step) (el.children[0] as HTMLInputElement).step = datas.step;

      if (datas.min) (el.children[0] as HTMLInputElement).min = datas.min;

      if (datas.max) (el.children[0] as HTMLInputElement).max = datas.max;

      // if (datas.step) {
      //   if (datas.type === "range") {
      //     (el.children[1] as HTMLInputElement).step = datas.step;
      //   } else {
      //     (el.children[0] as HTMLInputElement).step = datas.step;
      //   }
      // }
      // if (datas.min) {
      //   if (datas.type === "range") {
      //     (el.children[1] as HTMLInputElement).min = datas.min;
      //   } else {
      //     (el.children[0] as HTMLInputElement).min = datas.min;
      //   }
      // }
      // if (datas.max) {
      //   if (datas.type === "range") {
      //     (el.children[1] as HTMLInputElement).max = datas.max;
      //   } else {
      //     (el.children[0] as HTMLInputElement).max = datas.max;
      //   }
      // }

      return el;
    };

    this.useTools.pageTools.push(
      ...Object.values(this.pageTools).map(convertEls)
    );
    this.useTools.drawTools.push(
      ...Object.values(this.drawTools).map(convertEls)
    );
    this.useTools.sequenceTools.push(
      ...Object.values(this.sequenceTools).map(convertEls)
    );
    this.useTools.exportTools.push(
      ...Object.values(this.exportTools).map(convertEls)
    );
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
    this.useTools.drawTools.forEach((tool) => {
      this.group.drawTools?.append(tool);
    });
    this.useTools.exportTools.forEach((tool) => {
      this.group.exportTools?.append(tool);
    });
  }
}

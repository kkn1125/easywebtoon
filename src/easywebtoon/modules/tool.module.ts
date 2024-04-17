interface CreateElType {
  tagName: "button" | "input";
  dataType:
    | `${"prev" | "next" | "copy" | "paste" | "create" | "delete"}-page`
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
  value?: string;
  min?: string;
  max?: string;
  hidden?: boolean;
}

type pageToolNames =
  | "createPage"
  | "copyPage"
  | "pastePage"
  | "deletePage"
  | "saveBtn"
  | "loadBtn";

type sequenceToolNames = "prevPage" | "nextPage" | "playBtn";
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
  fill="currentColor"
  class="w-4 h-4">
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
  fill="currentColor"
  class="w-4 h-4">
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
  fill="currentColor"
  class="w-4 h-4">
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
  fill="currentColor"
  class="w-4 h-4">
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
  fill="currentColor"
  class="w-4 h-4">
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
  fill="currentColor"
  class="w-4 h-4">
  <path
    d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
</svg>`,
};

/* sequence control */
const prevPage: CreateElType = {
  tagName: "button",
  dataType: "prev-page",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  class="w-4 h-4">
  <path
    fill-rule="evenodd"
    d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
    clip-rule="evenodd" />
</svg>`,
};
const nextPage: CreateElType = {
  tagName: "button",
  dataType: "next-page",
  innerHTML: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  class="w-4 h-4">
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
  fill="currentColor"
  class="w-4 h-4">
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
  min: "0",
  value: "20",
  hidden: true,
};
const exportGif: CreateElType = {
  tagName: "button",
  dataType: "export-gif",
  innerHTML: `export to <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  class="w-6 h-6">
  <path
    fill-rule="evenodd"
    d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm9 4.5a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5Zm1.5 0a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H16.5v2.25H18a.75.75 0 0 1 0 1.5h-1.5v3a.75.75 0 0 1-1.5 0v-7.5ZM6.636 9.78c.404-.575.867-.78 1.25-.78s.846.205 1.25.78a.75.75 0 0 0 1.228-.863C9.738 8.027 8.853 7.5 7.886 7.5c-.966 0-1.852.527-2.478 1.417-.62.882-.908 2-.908 3.083 0 1.083.288 2.201.909 3.083.625.89 1.51 1.417 2.477 1.417.967 0 1.852-.527 2.478-1.417a.75.75 0 0 0 .136-.431V12a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5H9v1.648c-.37.44-.774.602-1.114.602-.383 0-.846-.205-1.25-.78C6.226 13.638 6 12.837 6 12c0-.837.226-1.638.636-2.22Z"
    clip-rule="evenodd" />
</svg>`,
};

export class ToolModule {
  pageTools: Record<pageToolNames, CreateElType> = {
    createPage,
    copyPage,
    pastePage,
    deletePage,
    saveBtn,
    loadBtn,
  };
  sequenceTools: Record<sequenceToolNames, CreateElType> = {
    playBtn,
    prevPage,
    nextPage,
  };
  exportTool: Record<exportToolNames, CreateElType> = {
    gifRepeat,
    useRepeatDelay,
    repeatDelay,
    exportGif,
  };

  useTools: Record<
    "pageTools" | "sequenceTools" | "exportTool",
    (HTMLButtonElement | HTMLInputElement)[]
  > = {
    pageTools: [],
    sequenceTools: [],
    exportTool: [],
  };

  constructor() {
    const convertEls = (datas: CreateElType) => {
      const el = this.createDataTool(datas.tagName, datas.dataType, [
        datas.tagName === "button" ? "btn-info" : "",
      ]);

      if (datas.hidden) {
        el.hidden = datas.hidden;
        el.classList.add("hidden");
      }

      if (datas.innerHTML) el.innerHTML = datas.innerHTML;
      if (datas.innerText) el.innerText = datas.innerText;

      if (datas.value) (el as HTMLInputElement).value = datas.value;
      if (datas.min) (el as HTMLInputElement).min = datas.min;
      if (datas.max) (el as HTMLInputElement).max = datas.max;

      return el;
    };

    this.useTools.pageTools.push(
      ...Object.values(this.pageTools).map(convertEls)
    );
    this.useTools.sequenceTools.push(
      ...Object.values(this.sequenceTools).map(convertEls)
    );
    this.useTools.exportTool.push(
      ...Object.values(this.exportTool).map(convertEls)
    );
  }

  createDataTool(
    tagName: "button" | "input",
    dataType: string,
    classNames: string[] = []
  ): HTMLInputElement | HTMLButtonElement {
    let el = document.createElement(tagName);

    if (el instanceof HTMLButtonElement || el instanceof HTMLInputElement) {
      el.dataset.tool = dataType;
    } else {
      throw "Invalid element type: " + tagName;
    }

    if (classNames.filter((_) => _).length > 0) {
      el.classList.add(...classNames);
    }

    return el;
  }

  render(target: HTMLElement, el: HTMLElement) {
    target.append(el);
  }
}

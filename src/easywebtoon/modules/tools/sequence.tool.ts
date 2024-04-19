/* sequence control */
export const SequenceTools = {
  playBtn: {
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
  },
  prevPage: {
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
  },
  pageTool: {
    tagName: "input",
    type: "number",
    dataType: "page",
    min: "1",
    value: "1",
  },
  totalTool: {
    tagName: "span",
    dataType: "total",
    innerText: "1",
  },
  nextPage: {
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
  },
  fpsTool: {
    tagName: "input",
    type: "number",
    dataType: "fps",
    min: "20",
    max: "60",
    step: "1",
    value: "20",
  },
} as const;
export type SequenceTools = (typeof SequenceTools)[keyof typeof SequenceTools];

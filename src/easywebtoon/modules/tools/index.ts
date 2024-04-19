export const UseTools: {
  pageTools: (HTMLButtonElement | HTMLInputElement | HTMLSpanElement)[];
  drawTools: (HTMLButtonElement | HTMLInputElement | HTMLSpanElement)[];
  guideTools: (HTMLButtonElement | HTMLInputElement | HTMLSpanElement)[];
  sequenceTools: (HTMLButtonElement | HTMLInputElement | HTMLSpanElement)[];
  exportTools: (HTMLButtonElement | HTMLInputElement | HTMLSpanElement)[];
} = {
  pageTools: [],
  drawTools: [],
  guideTools: [],
  sequenceTools: [],
  exportTools: [],
} as const;
export type UseTools = (typeof UseTools)[keyof typeof UseTools];

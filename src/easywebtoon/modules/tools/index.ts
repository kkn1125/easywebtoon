import { DrawTools } from "./draw.tool";
import { ExportTools } from "./export.tool";
import { GuideTools } from "./guide.tool";
import { PageTools } from "./page.tool";
import { SequenceTools } from "./sequence.tool";

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
export type PartialTools = Partial<
  Record<
    | (
        | PageTools
        | DrawTools
        | GuideTools
        | SequenceTools
        | ExportTools
      )["dataType"]
    | OnEventNames,
    (() => void)[]
  >
>;

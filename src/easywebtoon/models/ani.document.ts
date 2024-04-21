import { v4 } from "uuid";

export class AniDocument {
  id: string = "";
  title: string = "";
  description: string = "";
  pages: Page[] = [];
  currentPage: number = 0;
  scale: number = 1;

  constructor();
  constructor(docu: AniDocument);
  constructor(title: string);
  constructor(title: string, description: string);
  constructor(titleOrDocu?: string | AniDocument, description?: string) {
    if (titleOrDocu === undefined) throw new Error("not found document");

    if (typeof titleOrDocu === "string") {
      if (titleOrDocu && description) {
        this.title = titleOrDocu;
        this.description = description;
      } else if (titleOrDocu && typeof description === "undefined") {
        this.title = titleOrDocu;
      }
      this.id = "docu-" + v4();

      if (this.pages.length === 0) {
        this.pages.push([]);
      }
    } else {
      this.title = titleOrDocu.title;
      this.description = titleOrDocu.description;
      this.id = titleOrDocu.id;
      this.pages = titleOrDocu.pages || [[]];
      this.currentPage = 0;
    }

    this.setCurrentPage(this.currentPage);
  }

  setScale(scale: number) {
    this.scale = scale;
  }

  clearPage() {
    this.pages[this.currentPage] = [];
  }

  startLine() {
    const page = this.getPage();
    page.push([]);
  }

  prev() {
    this.setCurrentPage(this.currentPage - 1);
  }

  next() {
    if (this.pages[this.currentPage + 1] === undefined) {
      this.pages.push([]);
    }
    this.setCurrentPage(this.currentPage + 1);
  }

  isNoLine() {
    return !this.getPage() || !this.getLastLine();
  }

  getPrevPage() {
    return this.pages[this.currentPage - 1];
  }

  getNextPage() {
    return this.pages[this.currentPage + 1];
  }

  getPage() {
    return this.pages[this.currentPage];
  }

  removePage() {
    if (this.pages.length <= 1) return;

    this.pages.splice(this.currentPage, 1);
    if (!this.pages[this.currentPage]) {
      this.currentPage = this.pages.length - 1;
    }
    this.requestPageUpdate();
  }

  // 빈 라인 배열 정리
  removeEmptyLine() {
    const page = this.getPage();
    const lastLineIndex = page.length - 1;
    page.splice(lastLineIndex, 1);
    if (!this.pages[this.currentPage]) {
      this.currentPage = this.pages.length - 1;
    }
  }

  getLastLine() {
    const page = this.getPage();
    return page[page.length - 1];
  }

  setCurrentPage(page: number) {
    const lastPage = this.pages.length - 1;
    const isOver = lastPage < page;
    const isZero = page < 0;

    if (isOver) {
      this.currentPage = lastPage;
    } else if (isZero) {
      this.currentPage = 0;
    } else {
      this.currentPage = page;
    }

    this.requestPageUpdate();
    return this.getPage();
  }

  getFrames() {
    return this.pages;
  }

  /* localstorage 용량 문제로 제거 */
  // paint(
  //   animator: AnimatorModule,
  //   { x, y }: { x: number; y: number },
  //   color: string = "#ffffffff"
  // ) {
  //   const imageData = animator.ctx.getImageData(
  //     0,
  //     0,
  //     animator.canvas.width,
  //     animator.canvas.height
  //   );

  //   const visited: boolean[][] = Array(imageData.height)
  //     .fill(null)
  //     .map(() => Array(imageData.width).fill(false));

  //   function getColor(x: number, y: number) {
  //     const poX = (imageData.width * y + x) * 4;
  //     const toHex = (x: number) => x.toString(16).padStart(2, "0");
  //     const r = imageData.data[poX];
  //     const g = imageData.data[poX + 1];
  //     const b = imageData.data[poX + 2];
  //     const a = imageData.data[poX + 3];
  //     return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;
  //   }

  //   function setPixel(x: number, y: number, color: string) {
  //     const poX = (imageData.width * y + x) * 4;
  //     const colorInt = parseInt(color.slice(1), 16);
  //     imageData.data[poX] = (colorInt >> 24) & 255;
  //     imageData.data[poX + 1] = (colorInt >> 16) & 255;
  //     imageData.data[poX + 2] = (colorInt >> 8) & 255;
  //     imageData.data[poX + 3] = colorInt & 255;
  //   }

  //   const targetColor = getColor(x, y);
  //   if (targetColor === color) return []; // 이미 같은 색이면 아무것도 하지 않음
  //   const stack = [{ x, y }];
  //   const dots: { x: number; y: number }[] = [];
  //   while (stack.length > 0) {
  //     const { x, y } = stack.pop()!;

  //     if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height)
  //       continue;
  //     if (visited[y][x]) continue;

  //     // const gap = 3;
  //     // if (x % gap === 0 || y % gap === 0) {
  //     dots.push({ x, y });
  //     // }

  //     const currentColor = getColor(x, y);
  //     if (currentColor === targetColor) {
  //       setPixel(x, y, color);
  //       visited[y][x] = true;
  //       // stack.push({ x: x + 1, y: y + 1 });
  //       // stack.push({ x: x + 1, y: y - 1 });
  //       // stack.push({ x: x - 1, y: y + 1 });
  //       // stack.push({ x: x - 1, y: y - 1 });

  //       stack.push({ x: x + 1, y: y });
  //       stack.push({ x: x - 1, y: y });
  //       stack.push({ x: x, y: y + 1 });
  //       stack.push({ x: x, y: y - 1 });
  //     } else if (!currentColor.endsWith("ff")) {
  //       setPixel(x, y, color);
  //       visited[y][x] = true;
  //       // stack.push({ x: x + 1, y: y + 1 });
  //       // stack.push({ x: x + 1, y: y - 1 });
  //       // stack.push({ x: x - 1, y: y + 1 });
  //       // stack.push({ x: x - 1, y: y - 1 });

  //       stack.push({ x: x + 1, y: y });
  //       stack.push({ x: x - 1, y: y });
  //       stack.push({ x: x, y: y + 1 });
  //       stack.push({ x: x, y: y - 1 });
  //     }
  //   }

  //   // this.ctx.putImageData(imageData, 0, 0);
  //   return dots;
  // }

  /* event */
  requestPageUpdate() {
    window.dispatchEvent(
      new CustomEvent("page-update", {
        detail: {
          page: this.currentPage,
          total: this.pages.length,
        },
      })
    );
  }

  /* control page */
  addPageBefore() {
    this.pages.splice(this.currentPage, 0, []);
    this.setCurrentPage(this.currentPage + 1);
  }

  addPageAfter() {
    this.pages.splice(this.currentPage + 1, 0, []);
    this.setCurrentPage(this.currentPage);
  }

  pastePage(jsonPage: Page) {
    if (this.getPage().length <= 1 && (this.getLastLine() ?? []).length === 0) {
      // console.log("현재 페이지 덮어쓰기");
      this.pages[this.currentPage] = jsonPage;
    } else {
      // console.log("다음 페이지 만들어서 붙여넣기");
      this.pages.splice(this.currentPage + 1, 0, jsonPage);
      this.setCurrentPage(this.currentPage);
    }
  }
}

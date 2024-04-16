import { v4 } from "uuid";

export class AniDocument {
  id: string = "";
  title: string = "";
  description: string = "";
  pages: Page[] = [];
  currentPage: number = 0;

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
}

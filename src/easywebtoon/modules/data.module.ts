import { EasyWebtoon } from "../easy.webtoon";
import { AUTHOR, VERSION } from "../global/env";
import { ERROR_CODE } from "../models/error.code";
import { Toon } from "../models/toon";

interface IEasyWebtoonStorage {
  version: string;
  author: string;
  data: Toon[];
}

export class DataModule {
  private parent: EasyWebtoon;

  private COPY_STORE_KEY: string = "easywebtoon/copypage";
  private STORE_CURRENT_KEY: string = "easywebtoon/current";
  private STORE_KEY: string = "easywebtoon";
  storage: IEasyWebtoonStorage = {
    version: VERSION,
    author: AUTHOR,
    data: [],
  };
  currentToon!: Toon;

  constructor(parent: EasyWebtoon) {
    this.parent = parent;
  }

  initialize() {
    this.setupData();

    if (this.storage.data.length === 0) {
      const toon = new Toon("empty title");
      this.storage.data.push(toon);
    }

    const currentToonId = this.loadCurrentToonId();
    const currentToonIndex = this.storage.data.findIndex(
      (toon) => toon.id === currentToonId
    );
    this.currentToon =
      this.storage.data[currentToonIndex > -1 ? currentToonIndex : 0];

    this.save(true);
  }

  setupData() {
    if (!this.isExists()) {
      localStorage.setItem(this.STORE_KEY, JSON.stringify(this.storage));
    }

    const storage = this.load(true);
    this.applyData(storage);
  }

  findToonById(id: string) {
    return this.storage.data.find((data) => data.id === id);
  }

  setCurrent(currentToon: Toon) {
    this.currentToon = currentToon;
    localStorage.setItem(this.STORE_CURRENT_KEY, currentToon.id);
    this.parent.eventListeners["setCurrentToon"]?.forEach((cb) => {
      cb({ message: ERROR_CODE["t399"] });
    });
  }

  removeToon(id: string) {
    /* 최소 1개로 제한 */
    if (this.storage.data.length <= 1) {
      this.parent.eventListeners["remove-toon"]?.forEach((cb) => {
        cb({ message: ERROR_CODE["t400"] });
      });
      return;
    }

    const index = this.storage.data.findIndex((toon) => toon.id === id);
    const isSameCurrent = this.storage.data[index] === this.currentToon;

    if (index > -1) {
      this.storage.data.splice(index, 1);
      this.save(true);

      if (isSameCurrent) {
        if (index < this.storage.data.length - 1) {
          this.setCurrent(this.storage.data[index + 1]);
        } else {
          this.setCurrent(this.storage.data[this.storage.data.length - 1]);
        }
      }

      this.parent.eventListeners["remove-toon"]?.forEach((cb) => {
        cb({ message: ERROR_CODE["t200"] });
      });
    }
  }

  renameToonTitle(id: string, title: string) {
    const toon = this.findToonById(id);
    if (toon) {
      toon.title = title;
      this.save(true);
      this.parent.eventListeners["change-toon-title"]?.forEach((cb) => {
        cb({ message: ERROR_CODE["t401"] });
      });
    }
  }

  isExists() {
    return this.STORE_KEY in localStorage;
  }

  loadCurrentToonId() {
    const currentToonId = localStorage.getItem(
      this.STORE_CURRENT_KEY
    ) as string;
    return currentToonId;
  }

  load(isAuto: boolean = false): IEasyWebtoonStorage {
    const datas = localStorage.getItem(this.STORE_KEY) as string;
    const temp = JSON.parse(datas);
    const storageCopy = Object.assign(
      {
        version: VERSION,
        author: AUTHOR,
        data: [],
      },
      temp
    ) as IEasyWebtoonStorage;
    Object.assign(
      storageCopy.data,
      storageCopy.data.map((data) => new Toon(data))
    );
    if (!isAuto) {
      this.parent.eventListeners["load"]?.forEach((cb) => {
        cb({ message: ERROR_CODE["d001"] });
      });
    }
    return storageCopy;
  }

  applyData(data: IEasyWebtoonStorage) {
    this.storage = data;
  }

  save(isAuto: boolean = false) {
    localStorage.setItem(this.STORE_KEY, JSON.stringify(this.storage));
    if (!isAuto) {
      this.parent.eventListeners["save"]?.forEach((cb) => {
        cb({ message: ERROR_CODE["d002"] });
      });
    }
  }

  saveWithoutCurrentToon(data: Toon) {
    const copyBeforeSaveStorage = this.load(true);
    copyBeforeSaveStorage.data.push(data);
    localStorage.setItem(this.STORE_KEY, JSON.stringify(copyBeforeSaveStorage));
  }

  addToon() {
    const toon = new Toon("New Toon");
    this.storage.data.push(toon);
    this.saveWithoutCurrentToon(toon);
    this.parent.eventListeners["create-toon"]?.forEach((cb) => {
      cb({ message: ERROR_CODE["t001"] });
    });
  }

  copyPage() {
    const page = this.currentToon.document.getPage();
    localStorage.setItem(this.COPY_STORE_KEY, JSON.stringify(page));
  }

  clearCopyPage() {
    localStorage.removeItem(this.COPY_STORE_KEY);
    console.log("delete copy page!");
  }

  pastePage() {
    if (!(this.COPY_STORE_KEY in localStorage)) {
      localStorage.setItem(this.COPY_STORE_KEY, "[]");
    }

    const copyPage = localStorage.getItem(this.COPY_STORE_KEY) ?? "[]";
    const jsonPage = JSON.parse(copyPage);

    if (jsonPage.length === 0) {
      alert("복사된 페이지가 없습니다!");
      return;
    }

    console.log("success paste page!");
    this.currentToon.document.pastePage(jsonPage);
  }
}

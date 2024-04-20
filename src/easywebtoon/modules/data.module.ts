import { EasyWebtoon } from "../easy.webtoon";
import { AUTHOR, VERSION } from "../global/env";
import { Toon } from "../models/toon";

interface IEasyWebtoonStorage {
  version: string;
  author: string;
  data: Toon[];
}

export class DataModule {
  private parent: EasyWebtoon;

  private COPY_STORE_KEY: string = "easywebtoon/copypage";
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

    this.currentToon = this.storage.data[0];

    this.save(true);
  }

  setupData() {
    if (!this.isExists()) {
      localStorage.setItem(this.STORE_KEY, JSON.stringify(this.storage));
    }

    const storage = this.load(true);
    this.applyData(storage);
    // this.storage = storage;
  }

  findToonById(id: string) {
    return this.storage.data.find((data) => data.id === id);
  }

  setCurrent(currentToon: Toon) {
    this.currentToon = currentToon;
  }

  isExists() {
    return this.STORE_KEY in localStorage;
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
        cb();
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
        cb();
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
      cb();
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

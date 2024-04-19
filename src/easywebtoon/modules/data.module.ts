import { AUTHOR, VERSION } from "../global/env";
import { Toon } from "../models/toon";

interface IEasyWebtoonStorage {
  version: string;
  author: string;
  data: Toon[];
}

export class DataModule {
  private COPY_STORE_KEY: string = "easywebtoon/copypage";
  private STORE_KEY: string = "easywebtoon";
  storage: IEasyWebtoonStorage = {
    version: VERSION,
    author: AUTHOR,
    data: [],
  };
  currentToon!: Toon;

  initialize() {
    this.setupData();

    if (this.storage.data.length === 0) {
      const toon = new Toon("empty title");
      this.storage.data.push(toon);
    }

    this.currentToon = this.storage.data[0];

    this.save();
  }

  setupData() {
    if (!this.isExists()) {
      localStorage.setItem(this.STORE_KEY, JSON.stringify(this.storage));
    }

    const storage = this.load();
    this.applyData(storage);
    // this.storage = storage;
  }

  // setCurrent(currentToon: Toon) {
  //   this.currentToon = currentToon;
  // }

  isExists() {
    return this.STORE_KEY in localStorage;
  }

  load(): IEasyWebtoonStorage {
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
    return storageCopy;
  }

  applyData(data: IEasyWebtoonStorage) {
    this.storage = data;
  }

  save() {
    localStorage.setItem(this.STORE_KEY, JSON.stringify(this.storage));
  }

  addToon() {
    this.storage.data.push(new Toon("New Toon"));
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

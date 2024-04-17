import { AUTHOR, VERSION } from "../global/env";
import { AniDocument } from "../models/ani.document";
import { Toon } from "../models/toon";

interface IEasyWebtoonStorage {
  version: string;
  author: string;
  data: Toon[];
}

export class DataModule {
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
}

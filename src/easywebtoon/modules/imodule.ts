export class IModule<T> {
  modules!: T;

  use<M extends T[keyof T]>(module: M) {
    function lowerCase(word: string) {
      return word[0].toLowerCase() + word.slice(1);
    }
    if (!this.modules) {
      Object.assign(this, { modules: {} });
    }
    this.modules[
      lowerCase((module as new (...args: any) => M).constructor.name)
    ] = module;
  }
}

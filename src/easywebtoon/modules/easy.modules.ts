interface EasyModule<T> {
  modules: Map<T[keyof T], T>;
}

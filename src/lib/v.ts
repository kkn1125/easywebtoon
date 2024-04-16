export class V {
  log(message?: any, ...optionalParams: any[]): any;
  log(...data: any[]): any;
  log(...data: any[]): any {
    if (import.meta.env.DEV) return console.log.bind(this, ...data);
    return () => {};
  }
}

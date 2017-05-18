export class Options {
  constructor(public limit?: number,
    public header?: Object) {
    if (!header) {
      this.header = {
        "contentType": "application/json"
      }
    }
  }
}
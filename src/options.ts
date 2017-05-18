export class Options {
  constructor(public limit?: number,
    public header?: Object) {
    if (!limit) {    
      this.limit = 15; //default
    }

    if (!header) {
      this.header = {
        "contentType": "application/json"
      }
    }
  }
}
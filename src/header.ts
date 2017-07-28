export class Header {
  constructor(public contentType?: string) {
    if (!contentType) {
      this.contentType = "application/json";
    }
  }
}
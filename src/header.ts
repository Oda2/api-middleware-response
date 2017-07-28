export class Header {
  constructor(public contentType?: string) {
    if (!contentType) {      
      contentType = "application/json";
    }
  }
}
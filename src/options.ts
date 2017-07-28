import { Header } from './header';

export class Options {
  constructor(public limit?: number,
    public page?: number,
    public header?: any) {
    if (!header) {
      this.header = new Header('application/json');
      if (header) {
        if (header.contentType) {
          this.header.contentType = header.contentType;
        }        
      }      
    }
  }
}
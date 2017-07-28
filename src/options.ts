import { Header } from './header';

export class Options {
  constructor(
    public header: Header,
    public limit?: number,
    public page?: number) {}
}
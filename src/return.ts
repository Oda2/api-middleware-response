import * as _ from 'lodash';
import { Options } from './options';

export class Return {
  constructor(public self: any,
    private options: Options) { }

  private success: Boolean = false;
  private isArray: Boolean = false;
  private page: number;
  private limit: number;
  public statusCode: number;
  private message: string;
  private data: any;
  private count: number;

  private setHeaders(): void {
    this.self.res.contentType(this.options.header.contentType);
  }

  public returnJson(): any {
    this.setHeaders();

    if (this.self.req.query.limit) {
      if (this.self.req.query.limit > this.options.limit) {
        this.limit = this.options.limit;
      } else {
        this.limit = this.self.req.query.limit;
      }      
    } else {
      this.limit = this.options.limit;
    }

    this.page = this.options.page;
    return this.self.res.status(this.statusCode).json(this.serialize());
  }

  public serialize(): Object {
    if (!this.success) {
      return this.serializeDefault();
    }

    if (this.isArray) {
      return this.serializeArray();
    }

    return this.serializeObject();
  }

  private serializeDefault(): Object {
    return {
      success: this.success,
      message: this.message,
      data: {}
    };
  }

  private serializeArray(): Object {
    let pages: number = 0;

    if (this.count > 0 && this.limit > 0) {
      pages = Math.ceil((this.count / this.limit))
    }

    let currentPage = (this.page + 1);

    /* TO-DO Custom return */
    return {
      success: this.success,
      paging: {
        total: this.count,
        pages: pages,
        currentPage: currentPage,
        perPage: this.limit
      },
      data: this.data
    }
  }

  private serializeObject(): Object {
    // TO-DO { Sequelize Object (this.data.?) }
    return this.data;
  }

  public setObject(data: any, statusCode?: number): any {
    this.data = data;
    this.success = true;
    this.isArray = false;

    if (statusCode) {
      this.statusCode = statusCode;
    } else {
      this.statusCode = 200;
    }

    return this.returnJson();
  }

  public setArrayObject(data: any, statusCode?: number): any {
    this.success = true;
    this.isArray = true;

    if (_.isArray(data)) {
      this.data = data;
      this.count = data.length;
    } else if ((data) && (data.rows)) {
      this.data = data.rows;
      this.count = data.count;
    } else {
      throw new RangeError("invalid arguments");
    }

    if (statusCode) {
      this.statusCode = statusCode;
    } else {
      this.statusCode = 200;
    }

    return this.returnJson();
  }

  private returnNoContent(): any {
    return this.self.res.status(this.statusCode).json({});
  }

  public setAccepted(): any {
    this.data = {};
    this.success = true;
    this.statusCode = 202;
    return this.returnNoContent();
  }

  public setDeleteResource(): any {
    this.data = {};
    this.success = true;
    this.statusCode = 204;
    return this.returnNoContent();
  }

  public setNoContent(): any {
    return this.setDeleteResource();
  }

  public setInvalidRequest(message: string, statusCode?: number): any {
    this.data = {};
    this.success = false;
    this.message = message;

    if (statusCode) {
      this.statusCode = statusCode;
    } else {
      this.statusCode = 400;
    }

    return this.returnJson();
  }

  public setDataNotFound(message?: string): any {
    this.data = {};
    this.success = false;
    this.statusCode = 404;
    if (message) {
      this.message = message;
    }
    return this.returnJson();
  }

  public setInternalServerError(message?: string) {
    this.data = {};
    this.success = false;
    this.statusCode = 500;
    this.message = message;
    return this.returnJson();
  }
}

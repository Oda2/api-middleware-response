import { Return } from './return';
import { Options } from './options';
import { Header } from './header';

export = function apiResponse(options?: any) {
  return function (req, res, next) {
    let page = 0;
    let limit = 15;

    if (req.query.page) {
      page = (parseInt(req.query.page) - 1);
    } else {
      req.query.page = page;
    }

    let header = null;
    if (options) {
      if (options.header) {
        if (options.header.contentType) {
          header = new Header(options.header.contentType);
        }
      }

      if (options.limit) {
        limit = options.limit;
      }
    }

    if (req.query.limit) {
      if (req.query.limit < limit) {
        limit = req.query.limit;
      }
    } else {
      req.query.limit = limit;
    }

    if (!header) {
      header = new Header();
    }

    let _options = new Options(header, limit, page);
    res.data = new Return({ req, res, next }, _options);
    next();
  }
}
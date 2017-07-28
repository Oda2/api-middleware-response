import { Return } from './return';
import { Options } from './options';

export = function apiResponse(options?: any) {    
  return function (req, res, next) {
    let limit = 15;
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    let page = 1;
    if (req.query.page) {
      page = (parseInt(req.query.page) - 1);
    }    
        
    let _options = new Options(limit, page);    
    if (options) {      
      if (options.limit) {
        _options.limit = options.limit;
      }

      if (options.header) {
        _options.header = options.header;
      }
    }

    res.data = new Return({ req, res, next }, _options);
    next();
  }
}
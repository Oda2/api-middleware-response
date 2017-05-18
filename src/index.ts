import { Return } from './return';
import { Options } from './options';

const middlewareExpress = function middlewareExpress(req, res, next): void {  
  let limit = parseInt(req.query.limit) || 15;
  let page = (parseInt(req.query.page) || 1) - 1;

  let options = new Options(limit);
  
  req.query.page = page;
  res.data = new Return({req, res, next}, options);
  next();
}

export function apiresponse() {
  return middlewareExpress;
};
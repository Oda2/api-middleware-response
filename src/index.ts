import { ReturnBase } from './returnbase';

const middlewareExpress = function middlewareExpress(req, res, next): void {
  res.data = new ReturnBase({req, res, next});
  next();
}

export function middleware() {
  return middlewareExpress;
};
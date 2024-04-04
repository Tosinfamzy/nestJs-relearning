import { Injectable, NestMiddleware } from '@nestjs/common';
import { log, time, timeEnd } from 'console';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    time('Request-response time');
    log('Request...');
    res.on('finish', () => {
      log('Response...');
      timeEnd('Request-response time');
    });
    next();
  }
}

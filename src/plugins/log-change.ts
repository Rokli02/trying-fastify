import { FastifyRequest, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import ChangeLog, { IChangeLog, Methods } from '../models/ChangeLog';

export default fp(async (fastify: FastifyInstance) => {
  try {
    fastify.addHook('preSerialization', async (req: FastifyRequest, res) => {
      switch (req.method) {
        case Methods.POST:
        case Methods.PUT:
        case Methods.DELETE:
          {
            const reqQuery = JSON.stringify(req.query);
            const reqParams = JSON.stringify(req.params);
            const reqBody = JSON.stringify(req.body);

            const changeLog: IChangeLog = {
              changeMethod: req.method,
              reqParams: reqParams ? reqParams : '',
              reqQuery: reqQuery ? reqQuery : '',
              reqBody: reqBody ? reqBody : '',
            };

            console.log('\nchangeLog: ', changeLog);

            const log = new ChangeLog(changeLog);
            const response = await log.save();
            if (!response) {
              throw new Error("Couldn't instert new log into the database!");
            }
          }
          break;
        default:
          console.log('\nlog-change default');
      }
    });
  } catch (err) {
    fastify.log.error(err);
  }
});

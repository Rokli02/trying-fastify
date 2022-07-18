import { FastifyReply } from 'fastify';
import ChangeLog from '../models/ChangeLog';

const findAllLog = async (req: any, res: FastifyReply) => {
  try {
    const response = await ChangeLog.find();
    if (!response) {
      return res.code(400).send({ message: 'Nem érkezett válasz log!' });
    }

    return { logs: response };
  } catch (err) {
    console.log('Nem tudta elérni a log bejegyzéseket!');
    return res
      .code(400)
      .send({ message: 'Nem tudta elérni a log bejegyzéseket!' });
  }
};

export { findAllLog };

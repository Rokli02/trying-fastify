import { FastifyInstance } from 'fastify';
import {
  findAllUser,
  findOneUserById,
  insertOneUser,
  findByPageAndLimit,
} from '../../../controllers/user.controller';
import {
  findOneUserSchema,
  insertOneUserSchema,
} from '../../../schemas/user.schemas';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify
    .get('/', { handler: findAllUser })
    .get('/page/:page', { handler: findByPageAndLimit })
    .get('/:id', { schema: findOneUserSchema, handler: findOneUserById })
    .post('/', { schema: insertOneUserSchema, handler: insertOneUser });
};

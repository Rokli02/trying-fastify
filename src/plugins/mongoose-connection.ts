import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import mongoose from 'mongoose';

export default fp(async (fastify: FastifyInstance, opts: any) => {
  try {
    mongoose.connect(String(process.env.MONGODB_URL || opts.MONGODB_URL));
  } catch (e) {
    fastify.log.error(e);
  }
});

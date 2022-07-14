import Fastify from 'fastify';
import app from './src/app';
import { config } from 'dotenv';
config();

const port: number = Number(process.env.PORT) || 3000;

const server = async () => {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'reqId',
        },
      },
    },
  });

  fastify.register(app);

  try {
    await fastify.listen({ port });
    console.log(`Fut a szerver a ${port} porton`);
  } catch (err) {
    fastify.log.info('Baj van', err);
  }
};

server();

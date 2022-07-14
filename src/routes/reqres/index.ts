import { FastifyInstance, FastifyPluginAsync } from 'fastify';

const routes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts
): Promise<void> => {
  fastify.get('/', async (req, res) => {
    const { query, body } = req as any;

    if (Object.keys(query).length !== 0) {
      console.log('Querry', query, Object.keys(query).length);
      return query;
    }
    if (body !== undefined) {
      console.log('Body', body);
      return body;
    }
    console.log('After if');

    return {
      message: 'Nincs itt semmi',
      status: 'Üres',
      headers: req.headers,
      other: new Date(),
    };
  });
};

export default routes;

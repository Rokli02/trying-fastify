import { FastifySchema } from 'fastify';

const paramHasId_SubSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
};

const findOneUserSchema: FastifySchema = {
  params: paramHasId_SubSchema,
  response: {
    200: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        nicknames: { type: 'array' },
        address: {
          type: 'object',
          properties: {
            city: { type: 'string' },
          },
        },
      },
    },
    '4xx': {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

const insertOneUserSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      nicknames: { type: 'array' },
      address: {
        type: 'object',
        properties: {
          city: { type: 'string' },
          road: { type: 'string' },
          house_num: { type: 'string' },
        },
        required: ['city'],
      },
      created: { type: 'string' },
    },
    required: ['name', 'address'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
      },
    },
  },
};

export { findOneUserSchema, insertOneUserSchema };

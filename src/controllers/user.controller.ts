import { FastifyReply, FastifyRequest } from 'fastify';
import User from '../models/User';

const findAllUser = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    console.error('> Hiba minden user lekérésekor:', err);
    res.status(400).send({
      message: 'Hiba minden user lekérésekor',
      error: (err as any).error,
    });
  }
};

const findOneUserById = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { id } = req.params as any;
    if (!id) {
      return res
        .status(400)
        .send({ message: 'Az id paraméter nem lett megadva!' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({
        message: 'Nen találtam hasonló id-vel rendelkező embert!',
        reason: 'wrong id',
      });
    }
    return user;
  } catch (err) {
    console.error('Hiba egy darab user lekérésekor');
  }
};

const insertOneUser = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const newUser = new User(req.body);
    const { _id } = await newUser.save();

    return { _id };
  } catch (err) {
    console.error('Hiba történt új felhasználó beillesztése közben!');
  }
};

const findByPageAndLimit = async (req: any, res: FastifyReply) => {
  try {
    const { page } = req.params;
    const limit: number = req.query.limit ? (req.query.limit as number) : 1;
    const skipping = (page - 1) * limit;

    if (1 > page) {
      return res.status(400).send({
        message: 'A ${page}. oldal nem létezik, minimális oldalszám: 1!',
      });
    }

    const userCountInCollection = await User.find().countDocuments();
    const pages = Math.ceil(userCountInCollection / limit);
    if (pages < page) {
      return res.status(400).send({
        message: `A ${page}. oldal nem létezik, maximális oldalszám: ${pages}!`,
      });
    }

    const users = await User.find().limit(limit).skip(skipping);

    if (users.length === 0) {
      return res
        .status(404)
        .send({ message: 'Nem talált felhasználokat', users: {} });
    }

    return { users, pages };
  } catch (err) {
    console.error('Hiba történt új felhasználó beillesztése közben!');
  }
};

export { findAllUser, findOneUserById, insertOneUser, findByPageAndLimit };

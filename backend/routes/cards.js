const cardsRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validityInitialCard, validityCard } = require('../middlewares/validity-params');

cardsRouter.get('/cards', auth, getCards);

cardsRouter.post('/cards', auth, validityInitialCard, createCard);

cardsRouter.delete('/cards/:cardId', auth, validityCard, delCard);

cardsRouter.put('/cards/likes/:cardId', auth, validityCard, likeCard);

cardsRouter.delete('/cards/likes/:cardId', auth, validityCard, dislikeCard);

module.exports = cardsRouter;

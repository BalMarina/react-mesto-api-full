const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const checkId = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (ObjectId.isValid(value)) return value;
    return helpers.message('Некорректный _id пользователя');
  });

const checkEmail = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (validator.isEmail(value)) return value;
    return helpers.message('Проверьте, соответствует ли введенная почта параметрам email');
  });

const chekUrl = Joi.string()
  .custom((value, helpers) => {
    if (validator.isURL(value)) return value;
    return helpers.message('Проверьте, есть ли у ссылки на изображение все параметры url');
  });

const chekLink = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (validator.isURL(value)) return value;
    return helpers.message('Проверьте, есть ли у ссылки на изображение все параметры url');
  });

const validityUser = celebrate({
  params: Joi.object().keys({
    userId: checkId,
  }),
});

const validityInitialCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: chekLink,
  }),
});

const validityCard = celebrate({
  params: Joi.object().keys({
    cardId: checkId,
  }),
});

const validityProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validityAvatar = celebrate({
  body: Joi.object().keys({
    avatar: chekUrl,
  }),
});

const validitySignup = celebrate({
  body: Joi.object().keys({
    email: checkEmail,
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: chekUrl,
  }),
});

const validitySignin = celebrate({
  body: Joi.object().keys({
    email: checkEmail,
    password: Joi.string().required(),
  }),
});

module.exports = {
  validityUser,
  validityInitialCard,
  validityCard,
  validityProfile,
  validityAvatar,
  validitySignup,
  validitySignin,
};

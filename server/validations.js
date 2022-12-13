import { body } from "express-validator";

export const bikeCreateValidation = [
  body("name", "короткое имя").isLength({ min: 3 }),
  body("password", "неверный формат пароля").isLength({ min: 5 }),
  body("fullName", "укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "неверная ссылка на аватарку").optional().isURL(),
];

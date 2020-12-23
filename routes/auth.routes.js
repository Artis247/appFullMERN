const { Router } = require("express")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const Roomer = require("../models/Roomer")
const router = Router()

// /api/auth/register

router.post(
  "/register",
  [
    check("faceAccount", "Лицевой счет ").isString(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректный данные при регистрации",
        })
      }
      const { faceAccount, password, name, secondName } = req.body
      const shans = await Roomer.findOne({ faceAccount })
      if (shans) {
        return res.status(400).json({ message: "Такой клиент уже существует" })
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const roomer = new Roomer({
        faceAccount,
        password: hashedPassword,
        name,
        secondName,
      })
     await roomer.save()
      res.status(201).json({ message: "Клиент создан" })
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" })
    }
  }
)

// /api/auth/login
router.post(
  "/login",
  [
    check("faceAccount", "Введите корректный лицевой счет").isString(),
    check("password", "Введите пароль").isLength( {
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректный данные при входе в систему",
        })
      }

      const { name, secondName, faceAccount, password } = req.body
      const roomer = await Roomer.findOne({ faceAccount })
      if (!roomer) {
        return res.status(400).json({ message: "Пользователь не найден" })
      }
      const isMatch = await bcrypt.compare(password, roomer.password)
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Неверный пароль, попробуйте снова" })
      }
      const token = jwt.sign({ roomerId: roomer.id }, config.get("jwtSecret"), {
        expiresIn: "2h",
      })
      res.json({ token, roomerId: roomer.id });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так опять, попробуйте снова" })
    }
  }
)

module.exports = router

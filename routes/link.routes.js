const { Router } = require("express")
const config = require("config")
const shortid = require("shortid")
const Cash = require("../models/Cash")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth.middleware")
const router = Router()

router.post("/generate", auth, async (req, res) => {
  try {
    console.log("req.body", req.body)
    const baseUrl = config.get("baseUrl")
    console.log(baseUrl)
    const code = shortid.generate()
    const {
      invoice,
      amount,
      detail,
    } = req.body;
    
    const cash = new Cash({
      code,
      invoice,
      amount,
      detail,
      owner: req.roomer.roomerId,
    })

    await cash.save()
    res
      .status(201)
      .json({ message: "Счет - фактура создана и успешно сохранена" })
    res.status(201).json({ cash })
  } catch (e) {
    res
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова 1" })
  }
})

router.get("/", auth, async (req, res) => {
  try {
    const cashs = await Cash.find({ owner: req.roomer.roomerId })
    res.json(cashs)
  } catch (e) {
    res
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова 2" })
  }
})

router.get("/:id", auth, async (req, res) => {
  try {
    const cash = await Cash.findById(req.params.id)
    res.json(cash)
  } catch (e) {
    res
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова 3" })
  }
})

module.exports = router
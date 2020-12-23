const { Schema, model, Types } = require("mongoose")
const schema = new Schema({
  faceAccount: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  secondName: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: "Cash" }],
})
module.exports = model("Roomer", schema)

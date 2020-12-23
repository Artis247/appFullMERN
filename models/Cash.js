const { Schema , model, Types } = require("mongoose")
const schema = new Schema({
  code: {type: String, required: true, unique: true},
  invoice: { type: String, required: true },
  amount: { type: Number,required: true },
  date: { type: Date, default: Date.now },
  detail: { type:String, required: true },
  owner: { type: Types.ObjectId, ref: "Roomer" },
})
module.exports = model("Cash", schema)

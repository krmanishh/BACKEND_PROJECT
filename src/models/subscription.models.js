import mongoose, {Schema, SchemaType} from "mongoose"

const  subscriptionSchema = new Schema({
  subscriber:{
    type: Schema.Types.ObjectId,// one who is subsrcibing
    ref: "User"
  },
  channel:{
    type: Schema.Types.ObjectId, // one to whom 'subscriber' is subscribing
    ref: "User"
  }
},{timestamps: true})

export const Subscription = mongoose.model("Subscription", subscriptionSchema)
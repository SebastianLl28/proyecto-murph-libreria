import { Schema, model } from 'mongoose'
import { User } from '../interface/user.interface'

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String
      // default: () => randomUUID()
    },
    confirmed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const UserModel = model('user', userSchema)
export default UserModel

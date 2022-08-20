import { compare, hash } from "bcrypt";
import Mongoose, { Schema, model, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  gender?: "male" | "female" | "others";
  verified: boolean;
  avatar: { url: string; public_id: string };
  role: "author" | "admin" | "user";
  provider: "credential" | "github" | "google";
  restricted?: boolean;
  createdAt?: string;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser, {}, IUserMethods>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: Object,
      url: String,
      public_id: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      default: "credential",
    },
    restricted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  const result = await compare(password, this.password);
  return result;
};

// const userModel = model("User", UserSchema) as Model<IUser, {}, IUserMethods>;

type user = Model<IUser, {}, IUserMethods>;
export default (Mongoose.models?.User ||
  Mongoose.model("User", UserSchema)) as user;

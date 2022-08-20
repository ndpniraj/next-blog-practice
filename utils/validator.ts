import Joi, { ObjectSchema } from "joi";
import { isValidObjectId } from "mongoose";

const name = Joi.string()
  .required()
  .messages({ "string.empty": "Name is missing!" });

const email = Joi.string()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    "string.empty": "Email is missing!",
    "string.email": "Invalid email!",
  });

const password = Joi.string().required().min(8).messages({
  "string.min": "Password is too short!",
  "string.empty": "Password is missing!",
});

const login = {
  email,
  password,
};

export const loginSchema = Joi.object().keys({
  ...login,
});

// signup schema
export const signupSchema = Joi.object().keys({
  name,
  ...login,
});

// Comment validation
export const commentValidationSchema = Joi.object().keys({
  // belongsTo: Joi.string().required().messages({
  //   "string.empty": "Post id should be presented as belongsTo!",
  // }),
  belongsTo: Joi.string()
    .custom((value, helper) => {
      if (!isValidObjectId(value)) return helper.error("any.invalid");

      return true;
    }, "custom validation")
    .messages({
      "string.empty": "Post id should be presented as belongsTo!",
      "any.invalid": "Invalid belongsTo!",
    }),
  // owner: Joi.string()
  //   .custom((value, helper) => {
  //     if (!isValidObjectId(value)) {
  //       return helper.error("any.invalid");
  //     }
  //     return true;
  //   }, "custom validation")
  //   .required()
  //   .messages({
  //     "string.empty": "User id should be presented as owner!",
  //     "any.invalid": "Invalid belongsTo!",
  //   }),
  content: Joi.string().trim().required().messages({
    "string.empty": "Content is missing inside comment!",
  }),
});

export const updateCommentSchema = Joi.object().keys({
  content: Joi.string().trim().required().messages({
    "string.empty": "Content is missing inside comment!",
  }),
});

export const validateJoi = (Schema: ObjectSchema, value: any) => {
  const { error } = Schema.validate(value, {
    abortEarly: true,
    errors: { label: "key", wrap: { label: false, array: false } },
    allowUnknown: true,
  });

  const errorDetails = error?.details[0];
  if (!errorDetails) {
    return null;
  }

  const path = errorDetails.path[0] as string;
  const { message } = errorDetails;
  return { path, message };
};

export const validateWithSchema = (
  schema: ObjectSchema,
  value: any,
  setError: (
    value: React.SetStateAction<{ path: string; message: string }>
  ) => void
) => {
  const error = validateJoi(schema, value);

  if (!error) {
    setError({ path: "", message: "" });
    return true;
  }

  setError({ ...error });
  return false;
};

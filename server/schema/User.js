import Joi from "joi";

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const studentSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNo: Joi.string().required(),
  parentName: Joi.string().required(),
  password: Joi.string(),
  role: Joi.string().valid("STUDENT").required(),
});

export const trainerSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNo: Joi.string().required(),
  nationalIdNo: Joi.string().required(),
  password: Joi.string(),
  role: Joi.string().valid("TRAINER").required(),
});

export const studentEditSchema = Joi.object({
  fullName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  phoneNo: Joi.string(),
  parentName: Joi.string(),
});

export const trainerEditSchema = Joi.object({
  fullName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  phoneNo: Joi.string(),
  nationalIdNo: Joi.string(),
});

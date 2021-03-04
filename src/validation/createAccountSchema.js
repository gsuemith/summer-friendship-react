import * as yup from 'yup'

const parentSchema = (whitelist = [], blacklist = []) => {
  return yup.object().shape({
    type: yup.string()
      .oneOf(['parent','child'], "Please select an account type"),
    name: yup.string()
      .required(),
    username: yup.string()
      .required()
      .notOneOf(blacklist, "Sorry, that username is already taken"),
    password: yup.string()
      .min(8, "Passwords must be at least 8 characters long")
      .required(),
  })
}

const childSchema = (whitelist = [], blacklist = []) => {
  return yup.object().shape({
    type: yup.string()
      .oneOf(['parent','child'], "Please select an account type"),
    name: yup.string(),
    username: yup.string()
      .required()
      .notOneOf(blacklist, "Sorry, that username is already taken"),
    password: yup.string()
      .required(),
    parentUsername: yup.string()
      .required()
      .oneOf(whitelist, "A parent or guardian needs to create a family account for you, please try again later."),
  })
}

export { parentSchema, childSchema }
const mongoose = require("mongoose");
const yup = require("yup");

//USER SCHEMA
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  tel: {
    type: Number,
    required: true,
  },
 
});

const validateUser = (user) => {
  const schema = yup.object().shape({
    userEmail: yup.string().required(),
    userPassword: yup.string().required(),
    userNom: yup.string().required(),
    userPrenom: yup.string().required(),
    userTel: yup.number().required(),
  });

  return schema
    .validate(user)
    .then((user) => user)
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

exports.User = new mongoose.model("User", UserSchema);
exports.validateUser = validateUser;
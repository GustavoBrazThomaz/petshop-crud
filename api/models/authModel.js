require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: Number, required: true },
  password: { type: String, required: true },
});

const authModel = mongoose.model("AuthUser", authSchema);

class Auth {
  constructor(body) {
    this.body = body;
    this.error = [];
    this.user = null;
    this.token = null;
  }

  async postNewUser() {
    const { name, email, cpf, password, confirmPassword } = this.body;

    if (!name) {
      this.error.push("O Nome é obrigatório");
      return;
    }
    if (!email) {
      this.error.push("O E-mail é obrigatório");
      return;
    }
    if (!cpf) {
      this.error.push("O CPF é obrigatório");
      return;
    }
    if (!password) {
      this.error.push("A Senha é obrigatória");
      return;
    }

    if (cpf.toString().length !== 11) {
      this.error.push("CPF incorreto");
      return;
    }

    if (password !== confirmPassword) {
      this.error.push("as senhas precisam ser iguais");
      return;
    }

    const user = await authModel.findOne({ cpf: cpf });

    if (user) {
      this.error.push("usuário já existe");
      return
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const userAuth = {
      name: name,
      email: email,
      cpf: cpf,
      password: passwordHash,
    };

    this.user = await authModel.create(userAuth);
    return;
  }

  async loginUser() {
    const { cpf, password } = this.body;

    if (!cpf) {
      this.error.push("O Cpf é obrigatório");
      return;
    }
    if (!password) {
      this.error.push("A senha é obrigatória");
    }

    const user = await authModel.findOne({ cpf: cpf });
    if (!user) {
      this.error.push("Utilize outro Cpf");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      this.error.push("Senha inválida");
    }

    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    this.token = token;
    return;
  }
}

module.exports = Auth;

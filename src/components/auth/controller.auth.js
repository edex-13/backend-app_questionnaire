const jwt = require('jsonwebtoken')
const { models } = require('../../db/connection')

const hashPassword = require('../../utils/hashPassword')
const verifyPassword = require('../../utils/verifyPassword')

const createAUsers = async (data) => {
  const { name, email, password } = data
  const hashedPassword = await hashPassword(password)
  const newUsers = {
    name,
    email,
    password: hashedPassword
  }
  const users = await models.users.create(newUsers)
  return {
    id: users.id,
    name: users.name,
    email: users.email,
    createdAt: users.createdAt
  }
}

const login = async (data) => {
  const { email, password } = data
  const user = await models.users.findOne({
    where: {
      email
    }
  })

  if (!user) {
    throw new Error('Email not found')
  }
  if (!await verifyPassword(password, user.password)) {
    throw new Error('Password is incorrect')
  }

  const payload = {
    id: user.id,
    email: user.email
  }
  const token = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1h'
  })

  return {
    token
  }
}

module.exports = { createAUsers, login }

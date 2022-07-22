const User = require('../models/user')


exports.signUp = async (req, res) => {
  try {
    const { name, email, password, confirmedPassowrd } = req.body

    await User.create({
      name, email, password, confirmedPassowrd
    })
    return res.status(201).json({ status: 'success', message: 'Create account successfully' })

  } catch (error) {
    console.log(error)
  }
}

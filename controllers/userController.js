const bcrypt = require('bcryptjs')
const User = require('../models/user')



exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)

    await User.create({
      name, email, password: hash
    })
    return res.status(201).json({ status: 'success', message: 'Create account successfully' })

  } catch (error) {
    console.log(error)
  }
},

exports.signIn= async(req, res) => {
  try{
    res.send('this is signin function')
  }catch(error){
    console.log(error)
  }
}



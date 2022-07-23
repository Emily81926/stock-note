const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



exports.signUp = async (req, res) => {
  try {
    const { name, email, password, confirmedPassword } = req.body
    if (!(name || email || password || confirmedPassword)) {
       return res.status(400).send("All input is required!")
     }

     const oldUser = await User.findOne({ email });
     if(oldUser){
       return res.send(409).send("User already exist. Please login.")
     }

    const hash = await bcrypt.hash(password, 10);
    
     const token = jwt.sign(
       { user_id: req.body._id, email },
       process.env.JWT_SECRET,
       { expiresIn: '2h' })

    const user = await User.create({
      name, email: email.toLowerCase(), password: hash, token
    })

    return res.status(201).json(user)

  } catch (error) {
    console.log(error)
  }
},

  exports.signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body
      if (!(email && password)) {
        return res.status(400).send("All input is required")
      }

      const user = await User.findOne({ email })

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ user_id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' })

        user.token = token
        delete user.password

        return res.status(200).json(user);
      }

      return res.status(400).send("Invalid Credentials")

    }
    catch (error) {
      next(error)
    }
  }



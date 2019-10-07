import { Response, Request } from 'express'
import User, { IUser } from '../models/User'
import jwt from 'jsonwebtoken'

export const signup = async (req: Request, res: Response) => {

  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  user.password = await user.encryptPassword(user.password)
  const saveUser = await user.save()

  // create token
  const token: string = jwt.sign({ id: saveUser._id }, process.env.SECRET_TOKEN || 'holaquehace')

  res.header('auth-token', token).json(saveUser)
}

export const signin = async (req: Request, res: Response) => {

  const user = await User.findOne({ user: req.body.email })
  if(!user) return res.status(400).json('Email password is wrong')
  
  const correctPassword: boolean = await user.validatePassword(req.body.password)
  if(!correctPassword) return res.status(400).json('invalida password')
  

  const token: string = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN || 'holaquehace', {
    expiresIn: 60 * 60 *24
  })

  res.header('auth-token', token).json(user)

}

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId)
  if(!user) return res.status(404).json('No user found')
  res.json(user)

}

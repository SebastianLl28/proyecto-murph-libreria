import { Request, Response } from 'express'
import { findAllUsers } from '../services/user.service'

const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await findAllUsers()
  res.json(users)
}

export {
  getUsers
}

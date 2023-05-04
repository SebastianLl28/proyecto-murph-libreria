import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import { verifyCategory } from '../services/category.services'
import { listCategories } from '../helpers/category.helpers'
import { toTitleCase } from '../helpers/formatText'

const verifyNameCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name } = req.body

  await check('name').notEmpty().withMessage('name is required').run(req)

  const reuslt = validationResult(req)

  const categories = await listCategories()

  if (!reuslt.isEmpty()) {
    // enviar a tangamandapio
    console.log('campos vacios')
    return res.render('app/category', {
      pagina: 'Category',
      errors: reuslt.array(),
      name,
      categories
    })
  }

  // const isregistered = await verifyCategory(name)
  const isregistered = await verifyCategory(toTitleCase(name))

  if (isregistered) {
    // enviar a tangamandapio
    console.log('ya esta registrado ._.')
    return res.render('app/category', {
      pagina: 'Category',
      errors: [{ msg: 'The category is registared', path: 'name' }],
      name,
      categories
    })
  }

  console.log('Se registro correctamente')

  next()
}

export {
  verifyNameCategory
}

import { allCategories } from '../services/category.services'
import { formatDateBasic } from './formatdate.helpers'

const listCategories = async (): Promise<object> => {
  const categories = await allCategories()
  const listCategories = Object.values(categories)

  const newList = listCategories.map((element) => {
    const { name, _id, active, createdAt } = element
    const date = formatDateBasic(createdAt)
    element.date = date
    const id = _id.toString()
    return { id, name, date, active }
  }).filter((element) => {
    return element.active === true
  })

  return newList
}

export {
  listCategories
}

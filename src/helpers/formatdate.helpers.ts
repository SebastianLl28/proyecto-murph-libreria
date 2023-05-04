import { format } from 'date-fns'

const formatDateBasic = (date: string): string => {
  const convert = new Date(date)
  const newDate = format(convert, 'dd/MM/yyyy')
  return newDate
}

export {
  formatDateBasic
}

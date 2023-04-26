import express from 'express'
import router from './routers/usuario.router'
import db from './config/mongo'

const app = express()

// ? connection db
db().then(() => console.log('success connection db')).catch((err) => console.log(err))

// ? Habilitar el formulario
app.use(express.urlencoded({ extended: true }))

// ? Routers
app.use('/auth', router)

// ? Set: Para agregar configuración
app.set('view engine', 'pug')
app.set('views', './src/views')

// ? Carpeta publica
app.use(express.static('./src/public'))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

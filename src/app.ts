import express from 'express'
import db from './config/mongo'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import routerApi from './routers/api.router'
import routerapp from './routers/app.router'
import router from './routers/auth.router'

const app = express()

// ? connection db
db().then(() => console.log('success connection db')).catch((err) => console.log(err))

// ? Configuration cors
app.use(cors())

// ? Habilitar el formulario
app.use(express.urlencoded({ extended: true }))

// ? Habilitar cookie parser
app.use(cookieParser())

// ? Routers
app.use('/api', routerApi)
app.use('/auth', router)
app.use('/app', routerapp)

// ? Set: Para agregar configuración
app.set('view engine', 'pug')
app.set('views', './src/views')

// ? Carpeta publica
app.use(express.static('./src/public'))

const PORT = parseInt(process.env.PORT as string)
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

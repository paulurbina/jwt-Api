import express, { Application } from 'express'
import authRoutes from './routes/auth'
import morgan from 'morgan'

const app:Application  = express()


app.set('port', process.env.PORT || 4000)
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/auth', authRoutes)

export default app
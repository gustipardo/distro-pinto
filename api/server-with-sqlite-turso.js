import { createApp } from './app.js'
import { invoicesModel } from './models/sqlite3Turso/invoices.js'
import { usersModel } from './models/sqlite3Turso/users.js'
import { entitiesModel } from './models/sqlite3Turso/entities.js'
import { paymentsModel } from './models/sqlite3Turso/payments.js'

export const { app, server } = createApp({ invoicesModel, usersModel, entitiesModel, paymentsModel })

/* eslint-env jest */
import { app, server } from '../../server-with-sqlite-local.js' // Importa solo la aplicación
import request from 'supertest'
import { db } from '../../database/connection.js'

describe('Invoices', () => {
  test('should return all invoices', async () => {
    const response = await request(app).get('/invoices')
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  describe('Payments', () => {
    test('should return all payments', async () => {
      const response = await request(app).get('/payments')
      expect(response.status).toBe(200)
      expect(response.body.length).toBeGreaterThan(0)
    })
  })
})

afterAll(async () => {
  server.close()
  await db.closeAsync()
})

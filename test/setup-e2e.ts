// Este arquivo executa antes dos testes e2e
// Cria um banco de dados para rodar os testes e2e
import 'dotenv/config'

import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

const prisma = new PrismaClient()

// Redefine a variável de ambiente do banco de dados
function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => { // Antes de todos os testes
    // Cria um novo banco de dados
    const databaseURL = generateUniqueDatabaseURL(schemaId) // captura a url (endereço) do banco de dados

    process.env.DATABASE_URL = databaseURL

    execSync('pnpm prisma migrate deploy') // rodas as migrations
})

afterAll(async () => { // Depois de todos os testes
    // Exclui o banco de dados criado
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
    await prisma.$disconnect()
})
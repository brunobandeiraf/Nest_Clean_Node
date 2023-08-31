import {
    Body,
    ConflictException,
    Controller,
    HttpCode,
    Post,
    UsePipes,
  } from '@nestjs/common'
  import { PrismaService } from 'src/prisma/prisma.service'
  import { hash } from 'bcryptjs'
  import { z } from 'zod'
  import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
  
  // Schema do Zod
  const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  // Inferir zipagem
  type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

  @Controller('/accounts')
  export class CreateAccountController {
    constructor(private prisma: PrismaService) {} 
  
    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle(@Body() body: CreateAccountBodySchema) {// padrão Nest
      const { name, email, password } = body
  
      // Busca email passado como param
      const userWithSameEmail = await this.prisma.user.findUnique({
        where: {
          email,
        },
      })
  
      if (userWithSameEmail) {
        throw new ConflictException( // Padrão Nest de retorno
          'User with same e-mail address already exists.',
        )
      }
      
      const hashedPassword = await hash(password, 8)

      await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      })
    }
  }
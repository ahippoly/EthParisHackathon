import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { setGlobalOptions, Severity } from '@typegoose/typegoose'
import * as cookieParser from 'cookie-parser'
import { DateConverterInterceptor } from '@Common/interceptors'
import { json } from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap(): Promise<void> {
  setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('v1')
  //TODO: configure CORS correctly
  app.enableCors({ credentials: true, origin: true })

  app.use(cookieParser())
  app.use(json({ limit: '2mb' }))
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, validateCustomDecorators: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)), new DateConverterInterceptor())

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Harpos API Docs')
    .setDescription('Documentation for the Harpos API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document, { useGlobalPrefix: false })

  await app.listen(3333)
}

bootstrap()

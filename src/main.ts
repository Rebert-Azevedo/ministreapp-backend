// src/main.ts (COMPLETO)

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseAuthGuard } from './auth/firebase-auth.guard';
import { FIREBASE_ADMIN } from './firebase/firebase.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  
  // --- Configuração do Swagger ---
  const config = new DocumentBuilder()
    .setTitle('MinistreApp API')
    .setDescription('Documentação completa da API para o sistema de gestão de ministérios de louvor.')
    .setVersion('1.0')
    .addBearerAuth() // Habilita a autorização por Bearer Token (JWT) na interface
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Define a rota da documentação
  // -----------------------------

  const firebaseAdmin = app.get(FIREBASE_ADMIN);
  app.useGlobalGuards(new FirebaseAuthGuard(firebaseAdmin));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port: number = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(port);
  console.log(`Aplicação rodando em: ${await app.getUrl()}`);
  console.log(`Documentação da API disponível em: http://localhost:${port}/api-docs`);
}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseAuthGuard } from './auth/firebase-auth.guard';
import { FIREBASE_ADMIN } from './firebase/firebase.module';
import { ValidationPipe } from '@nestjs/common'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
}
bootstrap();
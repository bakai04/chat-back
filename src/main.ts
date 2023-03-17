import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';
import { ValidationPipe } from "./pipes/validationPipe";

async function main() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, {cors: true});

  const config = new DocumentBuilder()
    .setTitle("Диспетчер задач")
    .setDescription("Документация REST API")
    .setVersion("1.0.0")
    .addTag("back")
    .build()
  
    const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/swagger/", app, document);
  
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () =>
    console.log(`server started work on port = ${PORT}`),
  );
}
main();

import { customCss } from "./custom-css.swagger.doc";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { setEnvironmentPrefix } from "src/shared/utils/setEnvironmentPrefix";

const customSwagger = {
  customCss,
  explorer: true,
  customSiteTitle: "Help Tec Docs",
  swaggerOptions: {
    docExpansion: "none",
  }
};

const configService = new ConfigService();
const baseUrl = configService.get<string>('BASE_URL') || "http://localhost:3000";
const prefix = setEnvironmentPrefix(configService.get<string>('NODE_ENV'));

const config = new DocumentBuilder()
  .setTitle("Help Tec")
  .setDescription("API documentation for developers and Integrations")
  .setVersion("1.0")
  .addServer(`${baseUrl}/${prefix}/api`)
  .addBearerAuth()
  .build();

export function swaggerStart(app: INestApplication) {
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${prefix}/api/docs`, app, document, customSwagger);
}

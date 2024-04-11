import {
  registerForEvent
} from "./chunk-DOWD5Z5Z.mjs";
import {
  errorHandler
} from "./chunk-NSYK4YNV.mjs";
import {
  checkIn
} from "./chunk-GANYBS64.mjs";
import {
  createEvent
} from "./chunk-ZVERYXQD.mjs";
import "./chunk-MA76EX6X.mjs";
import {
  getAttendeesBadge
} from "./chunk-GGQ756LU.mjs";
import {
  getEventAttendees
} from "./chunk-T77U5FQG.mjs";
import {
  getEvent
} from "./chunk-JBDNUF3D.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform
} from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xE3o da API para o back-end da aplica\xE7\xE3o pass.in constru\xEDda durante o NLW Unite da Rocketseat.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeesBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP Server Running!");
});

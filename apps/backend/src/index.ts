import express, { Express, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../tsoa/swagger.json";
import { RegisterRoutes } from "../tsoa/routes";
import { errorHandler, notFoundHandler } from "./utilities/errorHandling";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env["PORT"] || 8080;
const eligibleOrigins = [
  process.env["FRONTEND_URL_DEV"],
  process.env["FRONTEND_URL_PROD"],
];

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(
  urlencoded({
    extended: true,
  }),
);

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || eligibleOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));
RegisterRoutes(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

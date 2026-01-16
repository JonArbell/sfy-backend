import cors from "cors";
import { app } from "./app";
import routes from "./routes/index.route";
import { errorHandler } from "./middlewares/error-exception-handler";

const PORT = 8000;

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:4200"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

app.use(cors(corsOptions));

app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Running on PORT : ${PORT}`));

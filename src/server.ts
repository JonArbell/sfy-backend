import cors from "cors";
import { app } from "./app";
import routes from "./routes/index.route";
import { errorHandler } from "./middlewares/error-exception-handler";
import path from "path";
import { fileURLToPath } from "url";
import { prisma } from "./app";
const PORT = 8000;

const corsOptions: cors.CorsOptions = {
  origin: ["https://s-fy.netlify.app", "http://localhost:4200"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "..", "views"));

app.use(cors(corsOptions));

app.use(routes);

app.use(errorHandler);

app.get("/", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    res.json({ ok: true, now: result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err });
  }
});

app.listen(PORT, () => console.log(`Running on PORT : ${PORT}`));

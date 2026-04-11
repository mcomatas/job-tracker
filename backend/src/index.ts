import "dotenv/config";
import express from "express";
import { connectQueue } from "./services/queue";
import applicationRoutes from "./routes/applications";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/applications", applicationRoutes);

connectQueue()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to RabbitMQ: ", err);
    process.exit(1);
  });

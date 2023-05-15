import express from "express";
import cors from "cors";
import { ProductRouter } from "./router/productRouter";

const app = express();
app.use(express.json());

app.use(cors());

app.listen(Number(process.env.PORT) || 3003, () =>
  console.log(`Server is running on port ${Number(process.env.PORT) || 3003}`)
);

app.use("/", ProductRouter)

app.get("/ping", async (req, res) => {
  try {
    res.status(200).send("Pong!");
  } catch (error) {
    console.log(error);
  }
});

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.listen(Number(process.env.PORT) || 3003, () =>
  console.log(`Server is running on port ${Number(process.env.PORT) || 3003}`)
);

app.get("/ping", async (req, res) => {
  try {
    res.status(200).send("Pong!");
  } catch (error) {
    console.log(error);
  }
});

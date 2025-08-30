import express from "express";
import "dotenv/config";
import cors from "cors";
import getGeminiAPIResponse from "./utils/gemini.js";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js"

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

//Serving all the chat routes starting with "api" here -->
app.use("/api", chatRoutes);

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to DB");
  }
  catch(err){
    console.log("connection to DB failed", err);
  }
}



app.post("/test", async (req, res) => {
  const finalRes = await getGeminiAPIResponse(req.body.message);
  console.log(finalRes);
  res.send(finalRes);
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  connectDB();
});
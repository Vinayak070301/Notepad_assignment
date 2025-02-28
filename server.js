import express from "express"
import cors from "cors";
import fetch from "node-fetch"

const app = express();
app.use(cors());

app.get("/api/text", async (req, res) => {
  try {
    const response = await fetch("http://loripsum.net/api/random");
    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(5000, () => console.log("Proxy server running on port 5000"));


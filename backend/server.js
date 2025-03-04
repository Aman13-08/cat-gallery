require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// Ensure environment variables are loaded
if (!process.env.CAT_API_KEY) {
    console.error("Missing CAT_API_KEY in .env file");
    process.exit(1);
}

app.get("/api/cats", async (req, res) => {
    try {
        const response = await axios.get("https://api.thecatapi.com/v1/images/search?limit=10", {
            headers: { "x-api-key": process.env.CAT_API_KEY }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching cat images:", error.message);
        res.status(500).json({ error: "Error fetching cat images" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

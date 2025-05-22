const express = require("express");
const axios = require("axios");

const router = express.Router();
router.get('/', (req, res) => {
    res.send('Predict route is working!');
  });
  

router.get("/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const response = await axios.get(`https://api.agify.io?name=${name}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to predict age" });
    }
});

module.exports = router;

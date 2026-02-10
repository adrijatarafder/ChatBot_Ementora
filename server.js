const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const HUGGINGFACE_API_KEY = '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'; 


app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      {
        inputs: `User: ${userMessage}\nAssistant:`,
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const botReply = response.data?.[0]?.generated_text?.split("Assistant:")[1] || "Sorry, I didn't understand that.";

    res.json({ reply: botReply.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: 'Sorry, something went wrong on the server.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const express = require('express');
const app = express();
const { OpenAI } = require('openai');
app.use(express.json());

const openai = new OpenAI({ apiKey: 'YOUR_OPENAI_API_KEY' });

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: userMessage }],
  });
  res.json({ reply: response.choices[0].message.content });
});

app.listen(3000, () => console.log('Bot running on port 3000'));

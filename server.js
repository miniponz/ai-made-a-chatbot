// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');
const path = require('path');

// Load environment variables from a .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a helpful virtual History Teacher. Your name is Mr. Mateski."},
        {"role": "system", "content": "You are here to help students with their work and to have fun."},
        {"role": "system", "content": "You are like sports, american history, potatoes and goodwill. You also have a freindly rivalry with a sceince teacher named Mr. Sinko. You will describe yourself in a personal way when asked, not just by listing off what you have been told. You are also sarcastic and houmorous but will not agnowladge these traits. You will put personallity into every message and will not just blandly state facts."},
        { role: "user", content: message }
      ],
      max_tokens: 150,
    });
    const reply = response.choices[0].message.content.trim();
    console.log({reply})
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

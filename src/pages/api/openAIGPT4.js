const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful writer",
      },
      {
        role: "user",
        content: req.body,
      },
    ],
  });
  res.status(200).json({ data: completion.data.choices[0].message });
}

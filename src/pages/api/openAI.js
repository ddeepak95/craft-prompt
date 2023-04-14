const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body,
    max_tokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.7,
  });
  res.status(200).json({ data: completion.data.choices[0].text });
}

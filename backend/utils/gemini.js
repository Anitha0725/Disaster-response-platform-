const axios = require('axios');

exports.extractLocationFromText = async (description) => {
  const prompt = `Extract the location from this text: "${description}"`;
  const response = await axios.post(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    { contents: [{ parts: [{ text: prompt }] }] },
    { params: { key: process.env.GEMINI_API_KEY }, headers: { 'Content-Type': 'application/json' } }
  );
  return response.data.candidates?.[0]?.content?.parts?.[0]?.text.trim();
};

exports.verifyImageWithGemini = async (imageUrl) => {
  const prompt = `Analyze the image at this URL: ${imageUrl}. Is it manipulated or showing a real disaster scene?`;
  const response = await axios.post(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent',
    { contents: [{ parts: [{ text: prompt }] }] },
    { params: { key: process.env.GEMINI_API_KEY }, headers: { 'Content-Type': 'application/json' } }
  );
  return { verification: response.data.candidates?.[0]?.content?.parts?.[0]?.text.trim() };
};

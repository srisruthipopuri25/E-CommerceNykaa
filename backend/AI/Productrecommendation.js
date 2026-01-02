const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({
  apiKey: "AIzaSyAlEkO7WYoH5GMrxTXxji4tNraMPGNDSF4",
});

async function recommendationAI(userHistory, allProducts) {
  const prompt = `
User recently viewed:
${userHistory.length ? userHistory.join(", ") : "No history"}

Available products:
${allProducts.join(", ")}

Task:
Recommend 5 relevant products.
Return ONLY a valid JSON array of product titles.
`;

  const result = await genAI.models.generateContent({

    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = result.text;

  try {
    return JSON.parse(text);
  } catch {
    return [];
  }
}

module.exports = recommendationAI;

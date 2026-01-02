const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAlEkO7WYoH5GMrxTXxji4tNraMPGNDSF4");

async function getAIRecommendations(userHistory, products) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
User browsing history:
${userHistory.join(", ")}

Available products:
${products.map(p => p.name).join(", ")}

Task:
Recommend 5 products most relevant to the user.
Return ONLY product names as a JSON array.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch {
    return [];
  }
}

module.exports = getAIRecommendations;

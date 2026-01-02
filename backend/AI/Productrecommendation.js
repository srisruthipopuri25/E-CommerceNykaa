const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({
    apiKey: "AIzaSyAlEkO7WYoH5GMrxTXxji4tNraMPGNDSF4",
});

async function recommendationAI(userHistory, allProducts) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const prompt = `
User recently viewed:
${userHistory.length ? userHistory.join(", ") : "No history"}

Available products:
${allProducts.join(", ")}

Task:
Recommend 5 relevant products.
Return ONLY a JSON array of product names.
`;

    const result = await model.generateContent({
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }],
            },
        ],
    });

    const text = result.response.text();

    try {
        return JSON.parse(text);
    } catch (err) {
        console.error("Gemini JSON parse error:", text);
        return [];
    }
}

module.exports = recommendationAI;

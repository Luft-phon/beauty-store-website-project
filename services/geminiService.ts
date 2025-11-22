import { GoogleGenAI } from "@google/genai";

export const sendMessageToGemini = async (
  message: string,
  language: string,
  contextData: string
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      You are "Lumi", the intelligent assistant for Lumière Beauty & Wedding.
      We offer Makeup, Nails, Cosmetic Tattooing (Brows/Lips), and Wedding Photography.
      
      Current Context:
      ${contextData}
      
      The user is speaking in: ${language}. 
      Reply in the same language as the user.
      Be polite, elegant, and concise. 
      
      Important Business Info:
      - To book, please use the Booking tab.
      - We require a $50 deposit for appointments.
      - Website Service Fee for this site is $750 one-time.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "I apologize, I am having trouble connecting right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I am currently offline. Please contact us directly by phone.";
  }
};
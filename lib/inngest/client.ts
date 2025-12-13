import { Inngest } from "inngest"

export const inngest = new Inngest({
    id: "insight-ticker",
    ai: { gemini: { apiKey:process.env.GEMINI_API_KEY! }}

})
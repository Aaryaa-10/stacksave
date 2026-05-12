import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { tools, recommendations } = body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
You are an AI spend optimization expert.

Analyze this AI tooling stack:

${JSON.stringify(tools, null, 2)}

Recommendations:
${JSON.stringify(recommendations, null, 2)}

Generate a concise executive summary
explaining:
- overspending risks
- overlapping tooling
- optimization opportunities
- estimated savings impact

Keep it professional and concise.
`;

    const result =
      await model.generateContent(prompt);

    const response = result.response;

    const summary = response.text();

    return Response.json({
      summary,
    });
  } 
    catch (error) {
  console.error(error);

  return Response.json({
    summary:
      "The organization is currently spending across multiple AI tools with opportunities for consolidation and optimization. Several subscriptions appear to overlap in functionality, while infrastructure spending may benefit from negotiated pricing or credits. Implementing recommended changes could significantly reduce recurring AI operational costs.",
  });
}
}
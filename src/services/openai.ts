import OpenAI from 'openai';

export async function getChatGPTResponse(
  apiKey: string,
  prompt: string
): Promise<string> {
  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0]?.message?.content || 'No response generated';
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to get response from ChatGPT');
  }
}
import axios from 'axios';

export async function getChatGPTResponse(
    apiKey: string,
    prompt: string,
    model: string = 'Qwen/QwQ-32B-Preview'
): Promise<string> {
  try {
    const response = await axios.post(
        'https://api-inference.huggingface.co/models/' + model,
        { inputs: prompt },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
    );

    // Hugging Face typically returns an array of generated text
    return (response.data[0]?.generated_text).substring(prompt?.length || 0).trim() || 'No response generated';
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
          error.response?.data?.error ||
          error.message ||
          'Failed to get response from Hugging Face'
      );
    }
    throw new Error('Unexpected error calling Hugging Face API');
  }
}
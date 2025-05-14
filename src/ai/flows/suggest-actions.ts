'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting possible actions
 * to the user based on the previous turn of the conversation with the AI agent.
 *
 * - suggestActions - A function that takes the conversation history and returns suggested actions.
 * - SuggestActionsInput - The input type for the suggestActions function.
 * - SuggestActionsOutput - The return type for the suggestActions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestActionsInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The history of the conversation between the user and the AI agent.'),
});
export type SuggestActionsInput = z.infer<typeof SuggestActionsInputSchema>;

const SuggestActionsOutputSchema = z.object({
  suggestedActions: z
    .array(z.string())
    .describe('An array of suggested actions for the user.'),
});
export type SuggestActionsOutput = z.infer<typeof SuggestActionsOutputSchema>;

export async function suggestActions(input: SuggestActionsInput): Promise<SuggestActionsOutput> {
  return suggestActionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestActionsPrompt',
  input: {schema: SuggestActionsInputSchema},
  output: {schema: SuggestActionsOutputSchema},
  prompt: `You are an AI assistant that suggests possible actions to the user based on the previous turn of the conversation.

  Given the following conversation history:
  {{conversationHistory}}

  Suggest a few possible actions the user can take.  Be brief, and limit yourself to 3 suggestions.

  Format the actions as a JSON array of strings.
  `,
});

const suggestActionsFlow = ai.defineFlow(
  {
    name: 'suggestActionsFlow',
    inputSchema: SuggestActionsInputSchema,
    outputSchema: SuggestActionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

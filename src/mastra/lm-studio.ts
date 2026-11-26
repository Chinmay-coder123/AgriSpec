import { Agent, setGlobalDispatcher } from 'undici';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { config } from './config';

// Ensure Node's undici fetch client does not time out while waiting for local LLM completions.
setGlobalDispatcher(
  new Agent({
    headersTimeout: 0,
    bodyTimeout: 0,
    connectTimeout: 60_000,
  }),
);

export const lmStudio = createOpenAICompatible({
  name: 'lm-studio',
  baseURL: config.lmStudio.baseURL,
  apiKey: config.lmStudio.apiKey,
});

export const chatModel = lmStudio.chatModel(config.lmStudio.model);

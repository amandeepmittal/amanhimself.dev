import type { APIRoute } from 'astro';
import { generateOgImageForSite } from '@utils/generateOgImages';

export const GET: APIRoute = async () => {
  const png = await generateOgImageForSite();
  const body = Uint8Array.from(png);

  return new Response(body, {
    headers: { 'Content-Type': 'image/png' }
  });
};

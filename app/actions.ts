"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Song } from "./type/SongType";

const apiKey = process.env.OPEN_AI_API_KEY;

if (!apiKey) {
  throw new Error("The API key is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateText(song: Song) {
  const ingfo = {
    name: song.name,
    artist:
      song.artists.primary.length > 0
        ? song.artists.primary[0].name
        : "Unknown Artist",
    image: song.image[2].url,
  };

  const prompt = `untuk bercandaan, berikan roastingan menggunakan bahasa indonesia yang agak lucu, menyindir dan sarkastik ${ingfo.name} - ${ingfo.artist} yang relevan terkait lyric, ritme dan musisi nya (Gunakan emote jika memungkinkan, jangan memberi saran atau pujian, langsung ke roastingan nya saja tidak perlu basa basi, dan kalau memungkinkan bandingkan musisi nya dengan rival atau musisi lain di pasar yang sama)`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return {
    name: ingfo.name,
    artist: ingfo.artist,
    text,
    image: ingfo.image,
  };
}

export { generateText };

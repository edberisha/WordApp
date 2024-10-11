// src/pages/api/generateAudio.js
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { input } = req.body;
    console.log("Input received for audio generation:", input); // Log the input
    const speechFile = path.resolve("./public/speech.mp3");

    try {
      // Generate speech using OpenAI API
      const mp3 = await openai.audio.speech.create({
        model: "text-to-speech", // Ensure you're using the correct model
        voice: "alloy",
        input,
      });

      // Check if mp3 response is valid
      if (!mp3 || !mp3.audio) {
        console.error("Invalid response from OpenAI API:", mp3); // Log the entire response
        throw new Error("Invalid response from OpenAI API");
      }

      // Convert the response to a buffer
      const buffer = Buffer.from(await mp3.audio.arrayBuffer());
      await fs.promises.writeFile(speechFile, buffer);
      console.log("Audio file saved at:", speechFile);

      // Respond with the audio path
      res.status(200).json({ message: "Audio generated", audioPath: "/speech.mp3" });
    } catch (error) {
      console.error("Error generating audio:", error);
      res.status(500).json({ error: "Failed to generate audio" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

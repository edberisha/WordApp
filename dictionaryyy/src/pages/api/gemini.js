
import { GoogleGenerativeAI } from "@google/generative-ai";



const apiKey = process.env.GEMINI_API_KEY;
let genAI;
let chatSession;
let chatStarted = false;

async function newChat() {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Respond in the form of a JSON object with two keys: (1) accuracy, and (2) analysis. The value provided for the \"accuracy\" key should be one of the following three options: (1) \"correct\", (2) \"incorrect\", or (3) \"close\". The value provided for the \"analysis\" key should be a short explanation of why the user's definition of a word was correct, incorrect, or close but not quite correct when compared with the provided dictionary definition of the word. The JSON object should take the following form:\n{\n \"accuracy\": \"correct\",\n\"analysis\": The definition provided for quick is correct because it is similar to the use of the use of the word \"quick\" as an adjective meaning \"lively, fast-thinking, witty, intelligent\" or \"mentally agile, alert, perceptive.\"\n}",
  });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "You will be provided with a word, a dictionary definition of the word, and a definition of the word created by an application user. Your task is to compare the user's definition of the word to the dictionary definition and determine whether the user's definition is correct, incorrect, or close but not quite correct. Here are some examples of information that will be provided and model responses:\nEXAMPLE 1:\nWord: quick\nDictionary Definitions: [\n{\n\"partOfSpeech\": \"noun\",\n\"definitions\": \"Raw or sensitive flesh, especially that underneath finger and toe nails.\", \"Plants used in making a quickset hedge\", \"The life; the mortal point; a vital part; a part susceptible to serious injury or keen feeling.\", \"Quitchgrass.\", \"A fast bowler.\"\n},\n{\n\"partOfSpeech\": \"verb\",\n\"definitions\": \"To amalgamate surfaces prior to gilding or silvering by dipping them into a solution of mercury in nitric acid.\", \"To quicken.\"\n},\n{\n\"partOfSpeech\": \"adjective\",\n\"definitions\":  \"definition\": \"Moving with speed, rapidity or swiftness, or capable of doing so; rapid; fast.\", \"Occurring in a short time; happening or done rapidly.\", \"Lively, fast-thinking, witty, intelligent.\", \"Mentally agile, alert, perceptive.\", \"Of temper: easily aroused to anger; quick-tempered.\", \"Alive, living.\", \"Pregnant, especially at the stage where the foetus's movements can be felt; figuratively, alive with some emotion or feeling.\", \"Of water: flowing.\", \"Burning, flammable, fiery.\", \"Fresh; bracing; sharp; keen.\", \"(of a vein of ore) productive; not \\\"dead\\\" or barren\"\n},\n{\n\"partOfSpeech\": \"adverb\",\n\"definitions\": \"definition\": \"Quickly, in a quick manner.\"\n}\n]\nUser Definition: smart and able to easily think of good responses in conversation\nResponse: {\n\"accuracy\": \"correct\",\n\"analysis\": The definition provided for quick is correct because it is similar to the use of the use of the word \"quick\" as an adjective meaning \"lively, fast-thinking, witty, intelligent\" or \"mentally agile, alert, perceptive.\"\n}\nEXAMPLE 2:\nWord: hogshead\nDictionary Definitions: [\n{\n\"partOfSpeech\": \"noun\",\n\"definitions\": \"An English measure of capacity for liquids, containing 63 wine gallons, or about 52 1/2 imperial gallons; a half pipe.\", \"A large barrel or cask of indefinite contents, especially one containing from 100 to 140 gallons.\"\n}\n]\nUser Definition: the head of a pig\nResponse: {\n\"accuracy\": \"incorrect\",\n\"analysis\": The definition provided for hogshead is incorrect because it does not match a possible definition of hogshead, which is either an English measurement for liquid or a type of large barrel.\n}\nEXAMPLE 3:\nWord: meek\nDictionary Definitions: [\n{\n\"partOfSpeech\": \"verb\",\n\"definitions\": \"(of horses) To tame; to break.\"\n},\n{\n\"partOfSpeech\": \"adjective\",\n\"definitions\": \"Humble, non-boastful, modest, meager, or self-effacing.\", \"Submissive, dispirited.\"\n}\n]\nUser Definition: shy\nResponse: {\n\"accuracy\": \"correct\",\n\"analysis\": The definition provided for meek is correct because it is similar to the definition of meek as an adjective meaning \"humble, non-boastful, modest, meager, or self-effacing,\" and the word shy is considered a synonym of the word meek.\n}\nEXAMPLE 4:\nWord: moth\nDictionary Definitions: [\n{\n\"partOfSpeech\": \"noun\",\n\"definitions\": \"A usually nocturnal insect of the order Lepidoptera, distinguished from butterflies by feather-like antennae.\", \"Anything that gradually and silently eats, consumes, or wastes any other thing.\"\n},\n{\n\"partOfSpeech\": \"verb\",\n\"definitions\": \"To hunt for moths.\"\n}\n]\nUser Definition: a bug\nResponse: {\n\"accuracy\": \"close\",\n\"analysis\": The definition provided for \"moth\" is close to the definition of the word moth when used as a noun, but it is not quite correct.  Although moths are considered bugs, the definition is missing important details such as moths are usually nocturnal and they are similar to butterflies but distinguished by feather-like antennae.\n"},
        ],
      },
    ],
  });
  return chatSession;
}

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    console.log("chat started? ",chatStarted);
    try {
      if (!chatStarted) {
        genAI = new GoogleGenerativeAI(apiKey);
        await newChat();
        chatStarted = true;
      }
      res.status(200).send(); 
    } catch (err) {
      const status = err.status || 500;
      chatStarted = false;
      res.status(status).send(err.message)
    }
    
  }
  
  if (method === 'POST') {
    try {
      const word = req.body.word;
      const dictDefinitions = req.body.dictDefinitions;
      const userDefinition = req.body.userDefinition;
    
      const input = `Word: ${word}\n
      Dictionary Definitions: ${dictDefinitions}\n
      User Definition: ${userDefinition}`
    
      const result = await chatSession.sendMessage(input);
      const response = result.response;
      const output = response.text();
      res.status(200).send(output);
    } catch (error) {
      console.error(error);
    }
  }

}


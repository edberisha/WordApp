import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import OpenAI from 'openai';

import Definitions from '../../lib/Definitions';
import fetchWord from '../../lib/fetchWord';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const DefinitionComponent = () => {
  const [wordData, setWordData] = useState(null);
  const [userDefinition, setUserDefinition] = useState('');
  const [result, setResult] = useState('');

  const getRandomWord = async () => {
    setUserDefinition('');
    setResult('');
    const newWord = await fetchWord();
    setWordData(newWord[0]);
  };

  // const definitions = wordData ? wordData.meanings.map((meaning, index) => {
  //   return <Definitions key={index} number={index} meaning={meaning} />
  // }) : null;

  const checkDefinition = async () => {
    if (!wordData || !userDefinition) return;

    const actualDefinition = wordData.meanings[0].definitions[0].definition;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `RESPOND ONLY WITH "GOOD DEFINITION" OR "BAD DEFINITION". Is the following definition correct for the word "${wordData.word}"?\nUser's Definition: "${userDefinition}"\nActual Definition: "${actualDefinition}"`
          },
        ],
      });
      setResult(response.choices[0]?.message?.content || 'No response from AI');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          console.error("Rate limit exceeded. Please try again later.");
          setResult('Rate limit exceeded. Please try again later.');
        } else {
          console.error("Error checking definition:", error.message);
          setResult('Error checking definition.');
        }
      } else {
        console.error("Unexpected error:", error);
        setResult('An unexpected error occurred.');
      }
    }
  };

  return (
    <Box width="100%">
      <Box display="flex" justifyContent={"center"}>
        <Button 
                    color="white"
                    bg="#81b29a" 
        fontSize={['15px', '15px', '20px', '25px', '30px']} 
        onClick={getRandomWord}>
          Get Random Word
        </Button>
      </Box>
      <Box textAlign={'center'} width="100%">
        {wordData && (
          <div>
            <h1>{wordData.word}</h1>

            <p><strong>Definition:</strong> {result && wordData.meanings[0].definitions[0].definition}</p>
            <Box 
            >
                <Box>
                  <Input
                    width={['200px','300px','400px','500px']}
                    placeholder="Type your definition here"
                    value={userDefinition}
                    onChange={(e) => setUserDefinition(e.target.value)}
                  />
                </Box>
                <Box>
                  <Button onClick={checkDefinition} colorScheme="teal" mt={4}>
                    Check Definition
                  </Button>
                </Box>
            </Box>

            {result && (
              <Text mt={4} fontWeight="bold">{result}</Text>
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default DefinitionComponent;

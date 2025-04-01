import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth'


import Definitions from '../../lib/Definitions';
import fetchWord from '../../lib/fetchWord';



const SpellingComponent = ({setCorrectSpellingCount}) => {
  const [wordData, setWordData] = useState(null);
  const [userSpelling, setUserSpelling] = useState('');
  const [result, setResult] = useState('');
  const { userId } = useAuth(); 

  const getRandomWord = async () => {

    setUserSpelling('');
    setResult('');
    const newWord = await fetchWord();
    setWordData(newWord[0]);
  };

  const definitions = wordData ? wordData.meanings.map((meaning, index) => {
    return <Definitions key={index} number={index} meaning={meaning} />
  }) : null;

  const checkSpelling = async () => {
    if (userSpelling.toLowerCase() === wordData.word.toLowerCase()) {
      setResult('Correct! 🎉');

      // Call the API to update the correct spelling count
      const firebase_uid = userId; // Replace with actual firebase_uid of the logged-in user
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'; // Default to localhost for local testing
        await axios.put(`${apiUrl}/api/users`, { firebase_uid });
        setCorrectSpellingCount(curr => curr+1)
      } catch (error) {
        console.error("Error updating correct spelling count:", error);
      }
    } else {
      setResult(`Incorrect. The correct spelling is "${wordData.word}".`);
    }
  };

  const speakWord = () => {
    if (wordData) {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Box width="100%">
      <Box display="flex" justifyContent={"center"}>
        <Button 
            color="white"
            bg="#81b29a" 
            fontSize={['15px', '15px', '20px', '25px', '30px']} onClick={getRandomWord}>
          Get Random Word
        </Button>
      </Box>
      <Box textAlign={'center'} width="100%">
        {wordData && (
          <div>
            <h1>{result && wordData.word}</h1>
            {definitions}
            <Input
            bg="white"
              width="25vh"
              placeholder="Spell the word here"
              value={userSpelling}
              onChange={(e) => setUserSpelling(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  checkSpelling();
                }
              }}
            />
            <Box mt={4}>
              <Button onClick={checkSpelling} colorScheme="blue" mr={2}>
                Check Spelling
              </Button>
              <Button onClick={speakWord} colorScheme="teal">
                Read Aloud
              </Button>
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

export default SpellingComponent;

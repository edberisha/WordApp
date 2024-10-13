import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth'




const SpellingComponent = () => {
  const [wordData, setWordData] = useState(null);
  const [userSpelling, setUserSpelling] = useState('');
  const [result, setResult] = useState('');
  const { userId } = useAuth(); 


  const getRandomWord = async () => {
    try {
      const { data: [randomWord] } = await axios.get('https://random-word.ryanrk.com/api/en/word/random');
      const { data: definitions } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
      setWordData(definitions[0]);
      setUserSpelling('');
      setResult('');
    } catch (error) {
      if (error.response) {
        console.error("Error fetching word or definition:", error.response.data);
        setResult("Could not fetch a new word. Please try again.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setResult("No response from server. Please check your connection.");
      } else {
        console.error("Error:", error.message);
        setResult("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const checkSpelling = async () => {
    if (userSpelling.toLowerCase() === wordData.word.toLowerCase()) {
      setResult('Correct! 🎉');

      // Call the API to update the correct spelling count
      const firebase_uid = userId; // Replace with actual firebase_uid of the logged-in user
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'; // Default to localhost for local testing
        await axios.put(`${apiUrl}/api/users/score`, { firebase_uid });
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
            <p><strong>Definition:</strong> {wordData.meanings[0].definitions[0].definition}</p>
            <Input
            bg="white"
              width="25vh"
              placeholder="Spell the word here"
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

import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth'
import UserProfile from '../UserProfile';




const SpellingComponent = () => {
  const [wordData, setWordData] = useState(null);
  const [userSpelling, setUserSpelling] = useState('');
  const [result, setResult] = useState('');
  const { userId } = useAuth(); 


  const getRandomWord = async () => {


    try {
      const { data: [randomWord] } = await axios.get('https://random-word-api.herokuapp.com/word');
      const { data: definitions } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
      setWordData(definitions[0]);
      setUserSpelling('');
      setResult('');
    } catch (error) {
      console.error("Error fetching word or definition:", error);
    }
  };

  const checkSpelling = async () => {
    if (userSpelling.toLowerCase() === wordData.word.toLowerCase()) {
      setResult('Correct! 🎉');

      // Call the API to update the correct spelling count
      const firebase_uid = userId; // Replace with actual firebase_uid of the logged-in user
      try {
        await axios.put('http://localhost:3001/api/users/score', { firebase_uid });
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
        <Button fontSize={['15px', '15px', '20px', '25px', '30px']} onClick={getRandomWord}>
          Get Random Word
        </Button>
      </Box>
      <Box textAlign={'center'} width="100%">
        {wordData && (
          <div>
            <h1>{result && wordData.word}</h1>
            <p><strong>Definition:</strong> {wordData.meanings[0].definitions[0].definition}</p>
            <Input
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

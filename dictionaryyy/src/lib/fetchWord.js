import axios from 'axios';

const getRandomWord = async () => {
  try {
    const { data: [randomWord] } = await axios.get('https://random-word-api.herokuapp.com/word');
    return randomWord;
  } catch (error) {
    console.error("Error fetching word:", error);
  }
};

// const getWordDefinition = async (word) => {
//   const definitionResponse = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
//   return definitionResponse;
// };

const fetchWord = async () => {
  let word = '';
  let definitionNotFound = true;
  while (definitionNotFound) {
    const randomWord = await getRandomWord();
    try {
      const wordDefinition = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
      if (wordDefinition.status === 200) {
        word = wordDefinition.data;
        definitionNotFound = false;
      }
    } catch {
      console.error("Random word definition not found")
    }
  }
  return word;
}


export default fetchWord;

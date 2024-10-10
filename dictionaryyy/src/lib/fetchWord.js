import axios from 'axios';

const fetchWord = async (word) => {
  const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  return response.data;
};

export default fetchWord;

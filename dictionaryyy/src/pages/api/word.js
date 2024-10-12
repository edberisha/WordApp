import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://random-word-api.herokuapp.com/word');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching word' });
  }
}

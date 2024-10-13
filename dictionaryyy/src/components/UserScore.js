import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserScore = ({ firebase_uid }) => {
  const [correctSpellingCount, setCorrectSpellingCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserScore = async () => {
      console.log('firebase_uid:', firebase_uid);
      console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

      if (!firebase_uid) {
        setError('No user ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${firebase_uid}`);
        setCorrectSpellingCount(response.data.correct_spelling_count);
      } catch (err) {
        console.error('Error fetching user score:', err);
        setError('Failed to fetch user score');
      } finally {
        setLoading(false);
      }
    };

    fetchUserScore();
  }, [firebase_uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Your Correct Spelling Count: {correctSpellingCount}</h3>
    </div>
  );
};

export default UserScore;

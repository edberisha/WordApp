import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserScore = ({ firebase_uid }) => {
  const [correctSpellingCount, setCorrectSpellingCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserScore = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${firebase_uid}`);
        setCorrectSpellingCount(response.data.correct_spelling_count);
      } catch (err) {
        console.error('Error fetching user score:', err);
        setError('Failed to fetch user score');
      } finally {
        setLoading(false);
      }
    };

    if (firebase_uid) {
      fetchUserScore();
    }
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

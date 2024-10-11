import React from 'react';
import useAuth from '../hooks/useAuth'; // Make sure the path is correct
import UserScore from './UserScore';

const UserProfile = () => {
  const { userId } = useAuth();

  return (
    <div>
      {userId ? (
        <UserScore firebase_uid={userId} />
      ) : (
        <div>Please log in to see your score.</div>
      )}
    </div>
  );
};

export default UserProfile;

import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import "../index.css";

const GitHubComponent: React.FC = () => {
  const [randomUser, setRandomUser] = useState<any>(null);

  const fetchRandomUser = async () => {
    const users = await searchGithub();
    if (users.length > 0) {
      setRandomUser(users[0]); // Assuming the API returns an array of users, we take the first one
    }
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const saveUser = () => {
    if (randomUser) {
      const existingUsers  = JSON.parse(localStorage.getItem('savedUsers') || '[]');
      existingUsers.push(randomUser);
      localStorage.setItem('savedUsers', JSON.stringify(existingUsers));
      console.log('User saved to local storage');
      fetchRandomUser();
    }
  };

  return (
    <div>
      <h1>Random GitHub Generator</h1>
      {randomUser ? (
        <div>
          <h2>GitHub Username:</h2>
          <h3>{randomUser.login}</h3>
          <h2>GitHub ID:</h2>
          <p>{randomUser.id}</p>
          <img src={randomUser.avatar_url} alt={randomUser.login} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <button id='button' onClick={fetchRandomUser}>X</button>
        <button id='button' onClick={saveUser}>✓</button>
      </div>
    </div>
  );
};

export default GitHubComponent;

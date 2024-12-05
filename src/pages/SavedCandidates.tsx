import { useState, useEffect } from 'react';
import '../index.css'; // Ensure this path matches your project structure

const SavedCandidates: React.FC = () => {
  const [savedUsers, setSavedUsers] = useState<any[]>([]);

  useEffect(() => {
    const users = localStorage.getItem('savedUsers');
    if (users) {
      setSavedUsers(JSON.parse(users));
    }
  }, []);

  const removeUser = (index: number) => {
    const updatedUsers = [...savedUsers];
    updatedUsers.splice(index, 1);
    setSavedUsers(updatedUsers);
    localStorage.setItem('savedUsers', JSON.stringify(updatedUsers));
  };

  return (
    <main>
      <h1>Potential Candidates</h1>
      {savedUsers.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>GitHub ID</th>
              <th>GitHub Username</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedUsers.map((user, index) => (
              <tr key={index}>
                <td><img src={user.avatar_url} alt={user.login} width="50"/></td>
                <td>{user.login}</td>
                <td>{user.id}</td>
                <td><button onClick={() => removeUser(index)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users saved</p>
      )}
    </main>
  );
};

export default SavedCandidates;

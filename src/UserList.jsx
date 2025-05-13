import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, addUser } from './redux/usersSlice';

function UserList() {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.trim() !== '') {
      dispatch(addUser(newUser));
      setNewUser('');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Management</h1>

      <form onSubmit={handleAddUser} style={styles.form}>
        <input
          type="text"
          placeholder="Enter new user"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>Add User</button>
      </form>

      {isLoading ? (
        <p style={styles.loading}>🔄 Loading users...</p>
      ) : (
        <ul style={styles.list}>
          {users.map((user) => (
            <li key={user.id} style={styles.userItem}>
              {user.name}
              <button
                onClick={() => dispatch(deleteUser(user.id))}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '60px auto',
    padding: '30px',
    textAlign: 'center',
    background: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgb(141, 73, 230)',
    fontFamily: 'Arial',
  },
  title: {
    marginBottom: '20px',
    fontSize: '32px',
    color: '#333',
  },
  form: {
    display: 'flex',
    marginBottom: '30px',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  userItem: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgb(89, 219, 71)',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  loading: {
    fontSize: '20px',
    color: 'gray',
  },
};

export default UserList;

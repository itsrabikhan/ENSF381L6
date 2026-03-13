import { useEffect, useState } from 'react';
import Controls from './Controls';
import UserList from './UserList';

const API_URL = 'https://69a2173cbe843d692bd0c63e.mockapi.io/users_api';

function UserDirectoryPage() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
  async function fetchUsers() {
    try {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }

    fetchUsers();
  }, []); 

  async function handleDeleteClick(userId) {
    if (!userId) return;

    try {
      await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
      });

      setUsers((prevUsers) =>
        prevUsers.filter((user) => String(user.id) !== String(userId))
      );
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  }

  function handleSortByGroupClick() {
    const sortedUsers = [...users].sort(
      (a, b) => Number(a.user_group) - Number(b.user_group)
    );
    setUsers(sortedUsers);
    setSortBy('group');
  }

  function handleSortByIdClick() {
    const sortedUsers = [...users].sort((a, b) => Number(a.id) - Number(b.id));
    setUsers(sortedUsers);
    setSortBy('id');
  }

  function handleViewToggleClick() {
    setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls
          onDeleteClick={handleDeleteClick}
          onSortByGroupClick={handleSortByGroupClick}
          onSortByIdClick={handleSortByIdClick}
          onViewToggleClick={handleViewToggleClick}
        />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;

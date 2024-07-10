import {createContext, useEffect, useState} from "react";

export const tokenContext = createContext();

const users_api = JSON.parse(localStorage.getItem("users")) || [
  {
    "id": 1,
    "username": "admin",
    "password": "admin",
    "role": "Admin",
    "name": "Alice Johnson",
    "createdAt": "2024-01-01T09:00:00Z",
    "updatedAt": "2024-07-01T09:00:00Z"
  },
  {
    "id": 2,
    "username": "warehouse",
    "password": "manager",
    "role": "Warehouse Manager",
    "name": "Bob Smith",
    "createdAt": "2024-01-15T09:00:00Z",
    "updatedAt": "2024-07-01T09:00:00Z"
  },
  {
    "id": 3,
    "username": "purchasing",
    "password": "manager",
    "role": "Purchasing Manager",
    "name": "Charlie Brown",
    "createdAt": "2024-02-01T09:00:00Z",
    "updatedAt": "2024-07-01T09:00:00Z"
  },
  {
    "id": 4,
    "username": "sales",
    "password": "manager",
    "role": "Sales Manager",
    "name": "Dana White",
    "createdAt": "2024-02-15T09:00:00Z",
    "updatedAt": "2024-07-01T09:00:00Z"
  },
  {
    "id": 5,
    "username": "viewer",
    "password": "viewer",
    "role": "Viewer",
    "name": "Eve Black",
    "createdAt": "2024-03-01T09:00:00Z",
    "updatedAt": "2024-07-01T09:00:00Z"
  }
]

export function TokenContext({children}) {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('current_user')) || {
    token: '',
    role: '',
    id: ''
  });
  const [changeHistory, setChangeHistory] = useState(
    JSON.parse(localStorage.getItem('changeHistory')) || []
  );
  const [login, setLogin] = useState(false);
  const [logout, setLogout] = useState(false);

  const [users, setUsers] = useState(users_api);
  const [isUsers, setIsUsers] = useState(false)
  const [userId, setUserId] = useState('');

  useEffect(() => {
    currentUser.token && localStorage.setItem("users", JSON.stringify(users))
  }, [currentUser, users])


  useEffect(() => {
    localStorage.setItem("current_user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("changeHistory", JSON.stringify(changeHistory));
  }, [changeHistory]);


  const handleLogin = (username, password) => {
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      setCurrentUser({
        token: 'simple_auth_token',
        role: user.role,
        id: user.id
      })
      setLogin(false);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setCurrentUser({
      token: '',
      role: '',
      id: ''
    });
  };

  return (
    <tokenContext.Provider
      value={{
        login, setLogin, logout, setLogout,
        handleLogin, handleLogout, currentUser,
        users, setUsers, isUsers, setIsUsers,
        userId, setUserId, changeHistory, setChangeHistory,
      }}
    >
      {children}
    </tokenContext.Provider>
  )
}
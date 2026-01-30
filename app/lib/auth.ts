const AUTH_KEY = "warning-guy-user";
const USERS_KEY = "warning-guy-users";

export interface User {
  email: string;
  name: string;
  birthDate: string;
  createdAt: string;
}

function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? (JSON.parse(data) as User[]) : [];
  } catch {
    return [];
  }
}

function setUsers(users: User[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? (JSON.parse(data) as User) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}

export function login(email: string, _password: string): User | null {
  const users = getUsers();
  const user = users.find((u) => u.email === email) ?? null;
  if (user) setStoredUser(user);
  return user;
}

export function register(
  email: string,
  name: string,
  birthDate: string
): User {
  const user: User = {
    email,
    name,
    birthDate,
    createdAt: new Date().toISOString(),
  };
  const users = getUsers();
  const existing = users.findIndex((u) => u.email === email);
  if (existing >= 0) users[existing] = user;
  else users.push(user);
  setUsers(users);
  setStoredUser(user);
  return user;
}

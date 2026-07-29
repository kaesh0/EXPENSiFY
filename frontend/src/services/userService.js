const API_URL=import.meta.env.VITE_API_URL;   
export async function logoutUser() {
  const response = await fetch("${API_URL}/api/users/logout", {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
export async function fetchCurrentUser() {
  const response = await fetch("${API_URL}/api/users/me", {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
export async function updateProfile(name) {
  const response = await fetch("${API_URL}/api/users/profile/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: name,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
export async function loginUser(credentials) {
  const response = await fetch("${API_URL}/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data.message;
  }
  return data;
}
export async function signUpUser(SignUpformData) {
  const response = await fetch("${API_URL}/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(SignUpformData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data.message;
  }
  return data;
}

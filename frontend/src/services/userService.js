import {apiClient} from './apiClient' 
export async function logoutUser() {
  return apiClient("/api/users/logout",{
    method:"POST",
  })
}
export async function fetchCurrentUser() {
  return apiClient("/api/users/me")
}
export async function updateProfile(name) {
  return apiClient("/api/users/profile/", {
    method: "PATCH",
    body: JSON.stringify({
      name: name,
    }),
  });
}
export async function loginUser(credentials) {
  return apiClient("/api/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
export async function signUpUser(signUpformData) {
  return apiClient("/api/users/signup", {
    method: "POST",
    body: JSON.stringify(signUpformData),
  });
}

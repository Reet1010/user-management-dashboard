import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/users",
});

export async function getUsers() {
  const response = await api.get("/");
  return response.data;
}

export async function createUser(user) {
  const response = await api.post("/", user);
  return response.data;
}

export async function updateUser(user) {
  const response = await api.put(`/${user.id}`, user);
  return response.data;
}

export async function deleteUser(id) {
  await api.delete(`/${id}`);
}

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.status === 204 ? null : response.json();
}

export async function getUsers() {
  const response = await fetch(BASE_URL);

  return handleResponse(response);
}

export async function createUser(user) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return handleResponse(response);
}

export async function updateUser(user) {
  const response = await fetch(`${BASE_URL}/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return handleResponse(response);
}

export async function deleteUser(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

const BASE_URL = "http://localhost:8000";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (response.status === 401) {
    localStorage.removeItem("token");
  }

  return response;
}

async function signup(name, email, password) {
  const response = await request("/signup", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  return response;
}

async function login(email, password) {
  const response = await request("/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
  }

  return response;
}

async function getMessages() {
  const response = await request("/messages");
  return response;
}

async function createMessage(message) {
  const response = await request("/messages", {
    method: "POST",
    body: JSON.stringify({ message }),
  });

  return response;
}

async function updateMessageById(id, message) {
  const response = await request(`/messages/${id}`, {
    method: "PUT",
    body: JSON.stringify({ message }),
  });
  return response;
}

async function deleteMessageById(id) {
  const response = await request(`/messages/${id}`, {
    method: "DELETE",
  });
  return response;
}

export {
  signup,
  login,
  getMessages,
  createMessage,
  updateMessageById,
  deleteMessageById,
};

import { DEPARTMENTS } from "./constants";

function getRandomDepartment() {
  return DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
}

function transformUser(user, id) {
  const nameParts = user.name.trim().split(" ");

  return {
    id,
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(" "),
    email: user.email,
    phone: user.phone,
    website: user.website,
    company: user.company?.name || "",
    department: getRandomDepartment(),
  };
}

export function transformUsers(users) {
  const transformed = users.map((user) => transformUser(user, user.id));

  const mockUsers = [];

  let nextId = transformed.length + 1;

  while (mockUsers.length < 100) {
    const baseUser = transformed[mockUsers.length % transformed.length];

    mockUsers.push({
      ...baseUser,
      id: nextId++,
      firstName: `${baseUser.firstName}${mockUsers.length + 1}`,
      email: `user${nextId}@example.com`,
      department: getRandomDepartment(),
    });
  }

  return [...transformed, ...mockUsers];
}

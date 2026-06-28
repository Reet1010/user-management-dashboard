import { DEPARTMENTS } from "./constants";

function getRandomDepartment() {
  const randomIndex = Math.floor(Math.random() * DEPARTMENTS.length);
  return DEPARTMENTS[randomIndex];
}

export function transformUsers(users) {
  return users.map((user) => {
    const nameParts = user.name.trim().split(" ");

    const firstName = nameParts[0];

    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    return {
      id: user.id,
      firstName,
      lastName,
      email: user.email,
      phone: user.phone,
      department: getRandomDepartment(),
    };
  });
}

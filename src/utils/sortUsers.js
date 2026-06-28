export function sortUsers(users, sortConfig) {
  if (!sortConfig.key) {
    return users;
  }

  const sortedUsers = [...users];

  sortedUsers.sort((a, b) => {
    const valueA = String(a[sortConfig.key]).toLowerCase();
    const valueB = String(b[sortConfig.key]).toLowerCase();

    if (valueA < valueB) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }

    if (valueA > valueB) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }

    return 0;
  });

  return sortedUsers;
}

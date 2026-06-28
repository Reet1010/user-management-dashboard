import { describe, it, expect } from "vitest";
import { sortUsers } from "../../utils/sortUsers";

describe("sortUsers", () => {
  const users = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@test.com",
    },
    {
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@test.com",
    },
    {
      firstName: "Bob",
      lastName: "Brown",
      email: "bob@test.com",
    },
  ];

  it("sorts users in ascending order", () => {
    const sorted = sortUsers(users, {
      key: "firstName",
      direction: "asc",
    });

    expect(sorted[0].firstName).toBe("Alice");
    expect(sorted[1].firstName).toBe("Bob");
    expect(sorted[2].firstName).toBe("John");
  });

  it("sorts users in descending order", () => {
    const sorted = sortUsers(users, {
      key: "firstName",
      direction: "desc",
    });

    expect(sorted[0].firstName).toBe("John");
    expect(sorted[2].firstName).toBe("Alice");
  });

  it("returns original array when no sort key is provided", () => {
    const sorted = sortUsers(users, {
      key: "",
      direction: "asc",
    });

    expect(sorted).toEqual(users);
  });

  it("does not mutate original array", () => {
    sortUsers(users, {
      key: "firstName",
      direction: "asc",
    });

    expect(users[0].firstName).toBe("John");
  });
});

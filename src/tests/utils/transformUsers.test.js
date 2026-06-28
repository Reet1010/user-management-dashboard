import { describe, it, expect } from "vitest";
import { transformUsers } from "../../utils/transformUsers";
import { DEPARTMENTS } from "../../utils/constants";

describe("transformUsers", () => {
  const apiUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@test.com",
      phone: "123456789",
      website: "john.com",
      company: {
        name: "Google",
      },
    },
    {
      id: 2,
      name: "Madonna",
      email: "madonna@test.com",
      phone: "999999999",
      website: "madonna.com",
      company: {
        name: "Music",
      },
    },
  ];
  //using same department on every run produces the same result, making the test completely deterministic
  const transformed = transformUsers(apiUsers, () => "Engineering");

  it("splits first and last name", () => {
    expect(transformed[0].firstName).toBe("John");
    expect(transformed[0].lastName).toBe("Doe");
  });

  it("handles single word names", () => {
    expect(transformed[1].firstName).toBe("Madonna");
    expect(transformed[1].lastName).toBe("");
  });

  it("keeps email unchanged", () => {
    expect(transformed[0].email).toBe("john@test.com");
  });

  it("handles missing company data gracefully and defaults to an empty string", () => {
    const usersArrayWithoutCompany = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        // company field left intentionally absent
      },
    ];

    const transformed = transformUsers(usersArrayWithoutCompany);

    // Since it returns an array, check the first element
    expect(transformed[0].company).toBe("");
  });

  it("copies company name", () => {
    expect(transformed[0].company).toBe("Google");
  });

  it("assigns a valid department", () => {
    expect(DEPARTMENTS.includes(transformed[0].department)).toBe(true);
  });
});

/**
 * 
 * Why don't we check for Engineering?

Because: 

department: getRandomDepartment()

is random.

Instead we verify "Is it one of the allowed departments?"

This makes the test deterministic.
 */

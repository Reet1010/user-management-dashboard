import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUsers, createUser, updateUser, deleteUser } from "../../api/users";

// ✅ Correct Mocking Pattern for Axios Instances
vi.mock("axios", () => {
  const mockApiInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  };

  return {
    default: {
      create: vi.fn(() => mockApiInstance),
    },
  };
});

// Extract a local reference to that same mock object so your tests can interact with it
import axios from "axios";
const mockApi = axios.create();

describe("User API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches users", async () => {
    mockApi.get.mockResolvedValue({
      data: [{ id: 1 }],
    });

    const data = await getUsers();

    expect(mockApi.get).toHaveBeenCalledWith("/");

    expect(data).toEqual([{ id: 1 }]);
  });

  it("creates a user", async () => {
    const user = {
      firstName: "John",
    };

    mockApi.post.mockResolvedValue({
      data: user,
    });

    await createUser(user);

    expect(mockApi.post).toHaveBeenCalledWith("/", user);
  });

  it("updates a user", async () => {
    const user = {
      id: 5,
      firstName: "John",
    };

    mockApi.put.mockResolvedValue({
      data: user,
    });

    await updateUser(user);

    expect(mockApi.put).toHaveBeenCalledWith("/5", user);
  });

  it("deletes a user", async () => {
    mockApi.delete.mockResolvedValue({});

    await deleteUser(7);

    expect(mockApi.delete).toHaveBeenCalledWith("/7");
  });
});

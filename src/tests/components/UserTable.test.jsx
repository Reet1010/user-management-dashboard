import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import UserTable from "../../components/UserTable";

const users = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        phone: "1111111111",
        department: "Engineering",
    },
];

describe("UserTable", () => {
    it("renders user data", () => {
        render(
            <UserTable
                users={users}
                sortConfig={{ key: "", direction: "asc" }}
                onSort={vi.fn()}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        expect(screen.getByText("John")).toBeInTheDocument();

        expect(screen.getByText("Doe")).toBeInTheDocument();

        expect(
            screen.getByText("Engineering")
        ).toBeInTheDocument();
    });

    it("shows empty state", () => {
        render(
            <UserTable
                users={[]}
                sortConfig={{ key: "", direction: "asc" }}
                onSort={vi.fn()}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        expect(
            screen.getByText(/No users found/i)
        ).toBeInTheDocument();
    });

    it("calls Edit callback", async () => {
        const user = userEvent.setup();

        const onEdit = vi.fn();

        render(
            <UserTable
                users={users}
                sortConfig={{ key: "", direction: "asc" }}
                onSort={vi.fn()}
                onEdit={onEdit}
                onDelete={vi.fn()}
            />
        );

        await user.click(
            screen.getByRole("button", { name: /edit/i })
        );

        expect(onEdit).toHaveBeenCalledWith(users[0]);
    });

    it("calls Delete callback", async () => {
        const user = userEvent.setup();

        const onDelete = vi.fn();

        render(
            <UserTable
                users={users}
                sortConfig={{ key: "", direction: "asc" }}
                onSort={vi.fn()}
                onEdit={vi.fn()}
                onDelete={onDelete}
            />
        );

        await user.click(
            screen.getByRole("button", { name: /delete/i })
        );

        expect(onDelete).toHaveBeenCalledWith(1);
    });

    it("calls sorting callback", async () => {
        const user = userEvent.setup();

        const onSort = vi.fn();

        render(
            <UserTable
                users={users}
                sortConfig={{ key: "", direction: "asc" }}
                onSort={onSort}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        await user.click(
            screen.getByText(/First Name/i)
        );

        expect(onSort).toHaveBeenCalledWith("firstName");
    });

    it("renders descending sort indicator arrow when direction is desc", () => {
        // ✅ Match the key with a real column data property like 'email'
        const mockSortConfig = { key: "email", direction: "desc" };
        const sampleUsers = [{ id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" }];

        render(
            <UserTable
                users={sampleUsers}
                sortConfig={mockSortConfig}
                onSort={() => { }}
            />
        );

        // ✅ Use a partial text matcher string option or a flexible regex lookup
        expect(screen.getByText(/Email/i)).toHaveTextContent("▼");
    });

    it("does not render any sorting arrows when sortConfig is empty", () => {
        const emptySortConfig = { key: "", direction: "" };
        const sampleUsers = [{ id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" }];

        render(
            <UserTable
                users={sampleUsers}
                sortConfig={emptySortConfig}
                onSort={() => { }}
            />
        );

        // Verify that neither the up arrow nor down arrow shows up in the table headers
        expect(screen.queryByText(/▲/)).not.toBeInTheDocument();
        expect(screen.queryByText(/▼/)).not.toBeInTheDocument();
    });

    it("renders ascending sort indicator arrow when direction is asc", () => {
        // ✅ This forces the ternary operator to hit the "true" branch
        const mockSortConfig = { key: "email", direction: "asc" };
        const sampleUsers = [{ id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" }];

        render(
            <UserTable
                users={sampleUsers}
                sortConfig={mockSortConfig}
                onSort={() => { }}
            />
        );

        expect(screen.getByText(/Email/i)).toHaveTextContent("▲");
    });



});
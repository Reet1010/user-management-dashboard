import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import UserModal from "../../components/UserModal";

describe("UserModal", () => {
    it("renders Add User mode", () => {
        render(
            <UserModal
                user={null}
                onClose={vi.fn()}
                onSubmit={vi.fn()}
            />
        );

        expect(
            screen.getByText(/Add User/i)
        ).toBeInTheDocument();
    });

    it("renders Edit User mode", () => {
        render(
            <UserModal
                user={{
                    id: 1,
                    firstName: "John",
                    lastName: "Doe",
                    email: "john@test.com",
                    phone: "999999999",
                    department: "Engineering",
                }}
                onClose={vi.fn()}
                onSubmit={vi.fn()}
            />
        );

        expect(
            screen.getByText(/Edit User/i)
        ).toBeInTheDocument();

        expect(
            screen.getByDisplayValue("John")
        ).toBeInTheDocument();
    });

    it("calls onClose when Cancel is clicked", async () => {
        const user = userEvent.setup();

        const onClose = vi.fn();

        render(
            <UserModal
                user={null}
                onClose={onClose}
                onSubmit={vi.fn()}
            />
        );

        await user.click(
            screen.getByRole("button", { name: /cancel/i })
        );

        expect(onClose).toHaveBeenCalled();
    });

    it("submits valid form", async () => {
        const user = userEvent.setup();

        const onSubmit = vi.fn();

        render(
            <UserModal
                user={null}
                onClose={vi.fn()}
                onSubmit={onSubmit}
            />
        );

        await user.type(
            screen.getByPlaceholderText(/firstName/i),
            "John"
        );

        await user.type(
            screen.getByPlaceholderText(/lastName/i),
            "Doe"
        );

        await user.type(
            screen.getByPlaceholderText(/email/i),
            "john@test.com"
        );

        await user.type(
            screen.getByPlaceholderText(/phone/i),
            "999999999"
        );

        await user.click(
            screen.getByRole("button", {
                name: /create/i,
            })
        );

        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it("does not submit invalid form", async () => {
        const user = userEvent.setup();

        const onSubmit = vi.fn();

        render(
            <UserModal
                user={null}
                onClose={vi.fn()}
                onSubmit={onSubmit}
            />
        );

        await user.click(
            screen.getByRole("button", {
                name: /create/i,
            })
        );

        expect(onSubmit).not.toHaveBeenCalled();
    });
});
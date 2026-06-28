import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Pagination from "../../components/Pagination";

describe("Pagination", () => {
    it("displays Page 0 of 0 when totalPages is 0", () => {
        render(<Pagination page={1} totalPages={0} setPage={() => { }} />);

        expect(screen.getByText(/Page 0 of 0/i)).toBeInTheDocument();
    });

    it("renders current page", () => {
        render(
            <Pagination
                page={2}
                totalPages={5}
                pageSize={10}
                setPage={vi.fn()}
                setPageSize={vi.fn()}
            />
        );

        expect(
            screen.getByText(/Page 2 of 5/i)
        ).toBeInTheDocument();
    });

    it("calls setPage when Next is clicked", async () => {
        const user = userEvent.setup();

        const setPage = vi.fn();

        render(
            <Pagination
                page={1}
                totalPages={5}
                pageSize={10}
                setPage={setPage}
                setPageSize={vi.fn()}
            />
        );

        await user.click(
            screen.getByRole("button", { name: /next/i })
        );

        expect(setPage).toHaveBeenCalledWith(2);
    });

    it("calls setPage when Previous is clicked", async () => {
        const user = userEvent.setup();

        const setPage = vi.fn();

        render(
            <Pagination
                page={3}
                totalPages={5}
                pageSize={10}
                setPage={setPage}
                setPageSize={vi.fn()}
            />
        );

        await user.click(
            screen.getByRole("button", { name: /previous/i })
        );

        expect(setPage).toHaveBeenCalledWith(2);
    });

    it("changes page size", async () => {
        const user = userEvent.setup();

        const setPageSize = vi.fn();

        render(
            <Pagination
                page={1}
                totalPages={5}
                pageSize={10}
                setPage={vi.fn()}
                setPageSize={setPageSize}
            />
        );

        await user.selectOptions(
            screen.getByRole("combobox"),
            "25"
        );

        expect(setPageSize).toHaveBeenCalledWith(25);
    });

    it("disables Previous button on first page", () => {
        render(
            <Pagination
                page={1}
                totalPages={5}
                pageSize={10}
                setPage={vi.fn()}
                setPageSize={vi.fn()}
            />
        );

        expect(
            screen.getByRole("button", { name: /previous/i })
        ).toBeDisabled();
    });
});
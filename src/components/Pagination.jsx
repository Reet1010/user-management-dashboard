export default function Pagination({
    page,
    totalPages,
    pageSize,
    setPage,
    setPageSize,
}) {
    return (
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">

            <div>

                <label className="mr-2">
                    Rows per page
                </label>

                <select
                    value={pageSize}
                    onChange={(e) =>
                        setPageSize(Number(e.target.value))
                    }
                    className="border rounded px-3 py-2"
                >
                    {[10, 25, 50, 100].map((size) => (
                        <option
                            key={size}
                            value={size}
                        >
                            {size}
                        </option>
                    ))}
                </select>

            </div>

            <div className="flex items-center gap-4">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span>
                    Page {totalPages === 0 ? 0 : page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>

            </div>

        </div>
    );
}
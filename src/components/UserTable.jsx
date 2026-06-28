export default function UserTable({
    users,
    sortConfig,
    onSort,
    onEdit,
    onDelete,
}) {
    const columns = [
        { label: "First Name", key: "firstName" },
        { label: "Last Name", key: "lastName" },
        { label: "Email", key: "email" },
        { label: "Department", key: "department" },
        { label: "Phone", key: "phone" },
    ];

    function getArrow(key) {
        if (sortConfig.key !== key) return "";

        return sortConfig.direction === "asc" ? " ▲" : " ▼";
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-left">

                <thead className="bg-gray-100">

                    <tr>

                        {columns.map((column) => (
                            <th
                                key={column.key}
                                onClick={() => onSort(column.key)}
                                className="px-5 py-4 cursor-pointer font-semibold whitespace-nowrap select-none"
                            >
                                {column.label}
                                {getArrow(column.key)}
                            </th>
                        ))}

                        <th className="px-5 py-4">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {users.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="text-center py-10 text-gray-500"
                            >
                                No users found.
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-5 py-4">
                                    {user.firstName}
                                </td>

                                <td className="px-5 py-4">
                                    {user.lastName}
                                </td>

                                <td className="px-5 py-4">
                                    {user.email}
                                </td>

                                <td className="px-5 py-4">
                                    {user.department}
                                </td>

                                <td className="px-5 py-4">
                                    {user.phone}
                                </td>

                                <td className="px-5 py-4 space-x-2">

                                    <button
                                        onClick={() => onEdit(user)}
                                        className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => onDelete(user.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))
                    )}

                </tbody>

            </table>
        </div>
    );
}
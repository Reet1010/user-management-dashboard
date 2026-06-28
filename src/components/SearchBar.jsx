import { DEPARTMENTS } from "../utils/constants";

export default function SearchBar({
    search,
    setSearch,
    department,
    setDepartment,
    onAdd,
}) {
    return (
        <div className="bg-white rounded-lg shadow p-5 mb-6">

            <div className="flex flex-col md:flex-row gap-4">

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
            flex-1
            border
            rounded-md
            px-4
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
                />

                {/* Department */}

                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="
            border
            rounded-md
            px-4
            py-2
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
                >
                    <option value="All">All Departments</option>

                    {DEPARTMENTS.map((dept) => (
                        <option
                            key={dept}
                            value={dept}
                        >
                            {dept}
                        </option>
                    ))}
                </select>

                {/* Add Button */}

                <button
                    onClick={onAdd}
                    className="
            bg-blue-600
            text-white
            px-5
            py-2
            rounded-md
            hover:bg-blue-700
            transition-colors
          "
                >
                    Add User
                </button>

            </div>

        </div>
    );
}
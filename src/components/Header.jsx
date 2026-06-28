export default function Header() {
    return (
        <header className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-5">
                <h1 className="text-3xl font-bold text-gray-800">
                    User Management Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage users with search, filtering, sorting, pagination and CRUD
                    operations.
                </p>
            </div>
        </header>
    );
}
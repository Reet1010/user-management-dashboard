import { useEffect, useMemo, useState } from "react";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./api/users";

import { transformUsers } from "./utils/transformUsers";
import { sortUsers } from "./utils/sortUsers";

import Header from "./components/Header";
import Loader from "./components/Loader";
import AlertBanner from "./components/AlertBanner";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import UserModal from "./components/UserModal";

function App() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("All");

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  // ==========================
  // Fetch Users
  // ==========================

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(transformUsers(data));
    } catch (err) {
      showAlert("error", "Unable to fetch users.");
    } finally {
      setLoading(false);
    }
  }

  // ==========================
  // Alerts
  // ==========================

  function showAlert(type, message) {
    setAlert({
      type,
      message,
    });

    setTimeout(() => {
      setAlert({
        type: "",
        message: "",
      });
    }, 3000);
  }

  // ==========================
  // Add User
  // ==========================

  async function handleAddUser(user) {
    try {
      const createdUser = await createUser(user);

      setUsers((prev) => [
        {
          ...user,
          id: createdUser.id,
        },
        ...prev,
      ]);

      showAlert("success", "User added successfully.");

      setModalOpen(false);
    } catch {
      showAlert("error", "Unable to add user.");
    }
  }

  // ==========================
  // Edit User
  // ==========================

  async function handleUpdateUser(user) {
    try {
      const updatedUser = await updateUser(user);

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? {
              ...u,
              ...updatedUser,
            }
            : u
        )
      );

      showAlert("success", "User updated.");

      setEditingUser(null);

      setModalOpen(false);
    } catch {
      showAlert("error", "Unable to update user.");
    }
  }

  // ==========================
  // Delete
  // ==========================

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this user?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(id);

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );

      showAlert("success", "User deleted.");
    } catch {
      showAlert("error", "Delete failed.");
    }
  }

  // ==========================
  // Search + Filter
  // ==========================

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        user.firstName.toLowerCase().includes(keyword) ||
        user.lastName.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword);

      const matchesDepartment =
        departmentFilter === "All" ||
        user.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });
  }, [users, search, departmentFilter]);

  // ==========================
  // Sorting
  // ==========================

  const sortedUsers = useMemo(() => {
    return sortUsers(filteredUsers, sortConfig);
  }, [filteredUsers, sortConfig]);

  // ==========================
  // Pagination
  // ==========================

  const totalPages = Math.ceil(
    sortedUsers.length / pageSize
  );

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;

    return sortedUsers.slice(
      start,
      start + pageSize
    );
  }, [sortedUsers, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search, departmentFilter, pageSize]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // ==========================
  // Sort Click
  // ==========================

  function handleSort(column) {
    let direction = "asc";

    if (
      sortConfig.key === column &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({
      key: column,
      direction,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {alert.message && (
          <AlertBanner
            type={alert.type}
            message={alert.message}
          />
        )}

        <SearchBar
          search={search}
          setSearch={setSearch}
          department={departmentFilter}
          setDepartment={setDepartmentFilter}
          onAdd={() => {
            setEditingUser(null);
            setModalOpen(true);
          }}
        />

        {loading ? (
          <Loader />
        ) : (
          <>
            <UserTable
              users={paginatedUsers}
              sortConfig={sortConfig}
              onSort={handleSort}
              onEdit={(user) => {
                setEditingUser(user);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
            />

            <Pagination
              page={page}
              totalPages={totalPages}
              pageSize={pageSize}
              setPage={setPage}
              setPageSize={setPageSize}
            />
          </>
        )}

        {modalOpen && (
          <UserModal
            user={editingUser}
            onClose={() => {
              setModalOpen(false);
              setEditingUser(null);
            }}
            onSubmit={
              editingUser
                ? handleUpdateUser
                : handleAddUser
            }
          />
        )}

      </div>

    </div>
  );
}

export default App;
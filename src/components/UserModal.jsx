import { useEffect, useState } from "react";
import { DEPARTMENTS } from "../utils/constants";

export default function UserModal({
    user,
    onClose,
    onSubmit,
}) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: DEPARTMENTS[0],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    function validate() {
        const validationErrors = {};

        if (!formData.firstName.trim()) {
            validationErrors.firstName =
                "First name is required";
        }

        if (!formData.lastName.trim()) {
            validationErrors.lastName =
                "Last name is required";
        }

        if (!formData.email.trim()) {
            validationErrors.email =
                "Email is required";
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            formData.email &&
            !emailRegex.test(formData.email)
        ) {
            validationErrors.email =
                "Enter a valid email";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) return;

        onSubmit(formData);
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white rounded-lg w-full max-w-lg p-6">

                <h2 className="text-2xl font-semibold mb-5">

                    {user ? "Edit User" : "Add User"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-4"
                >
                    {[
                        "firstName",
                        "lastName",
                        "email",
                        "phone",
                    ].map((field) => (
                        <div key={field}>
                            <input
                                type={
                                    field === "email"
                                        ? "email"
                                        : "text"
                                }
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={field}
                                required={field !== "phone"}
                                className="w-full border rounded px-4 py-2"
                            />

                            {errors[field] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors[field]}
                                </p>
                            )}
                        </div>
                    ))}

                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full border rounded px-4 py-2"
                    >
                        {DEPARTMENTS.map((department) => (
                            <option
                                key={department}
                                value={department}
                            >
                                {department}
                            </option>
                        ))}
                    </select>

                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            {user ? "Update" : "Create"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
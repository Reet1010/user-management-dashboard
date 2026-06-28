export default function AlertBanner({ type, message }) {
    if (!message) return null;

    const bgColor =
        type === "success"
            ? "bg-green-100 border-green-400 text-green-700"
            : "bg-red-100 border-red-400 text-red-700";

    return (
        <div
            className={`mb-6 rounded border px-4 py-3 ${bgColor}`}
        >
            {message}
        </div>
    );
}
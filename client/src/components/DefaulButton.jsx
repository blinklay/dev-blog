export default function DefaulButton({ children }) {
  return (
    <button className="py-2 px-6 border border-transparent text-white bg-blue-500 rounded-md cursor-pointer hover:text-blue-500 hover:bg-transparent transition hover:border-blue-500">
      {children}
    </button>
  );
}

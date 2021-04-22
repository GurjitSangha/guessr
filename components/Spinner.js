export default function Spinner({ size = 8 }) {
  return (
    <div
      className={`w-${size} h-${size} border-b-2 border-t-2 rounded-full animate-spin border-gray-900 dark:border-red-100`}
    />
  );
}

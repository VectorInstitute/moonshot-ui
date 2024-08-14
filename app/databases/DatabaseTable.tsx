'use client';

import Link from 'next/link';

export default function DatabaseTable({ databases }: { databases: string[] }) {
  return (
    <div className="h-full overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Database Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {databases.map((db) => (
            <tr key={db} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {db}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Link href={`/databases/${encodeURIComponent(db)}`} className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150">
                  View Chat History
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
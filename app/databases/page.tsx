import fs from 'fs/promises';
import DatabaseTable from './DatabaseTable';

export default async function DatabasesPage() {
  const dbDir = '/build/moonshot/moonshot-data/generated-outputs/databases';
  const files = await fs.readdir(dbDir);
  const databases = files.filter(file => file.endsWith('.db'));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Database Files</h1>
        <div className="h-[calc(100vh-12rem)] bg-white shadow-lg rounded-lg overflow-hidden">
          <DatabaseTable databases={databases} />
        </div>
      </main>
    </div>
  );
}
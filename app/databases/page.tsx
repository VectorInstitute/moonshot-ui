import fs from 'fs/promises';
import DatabaseTable from './DatabaseTable';
import { revalidatePath } from 'next/cache';

export const revalidate = 0; // This ensures the page is always dynamically rendered

async function getDatabases(): Promise<string[]> {
  const dbDir = '/build/moonshot/moonshot-data/generated-outputs/databases';
  const files = await fs.readdir(dbDir);
  return files.filter(file => file.endsWith('.db'));
}

export default async function DatabasesPage() {
  const databases = await getDatabases();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Session histories</h1>
        <div className="h-[calc(100vh-12rem)] bg-white shadow-lg rounded-lg overflow-hidden">
          <DatabaseTable databases={databases} />
        </div>
      </main>
    </div>
  );
}
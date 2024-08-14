import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import ChatHistory from './ChatHistory';
import Link from 'next/link';

interface DbChatMessage {
  id: number;
  connection_id: string;
  prompt: string;
  prepared_prompt: string;
  predicted_result: string;
  prompt_time: string;
}

interface ChatMessage extends DbChatMessage {
  model: string;
}

export default async function ChatHistoryPage({ params }: { params: { dbName: string } }) {
  const dbPath = path.join('/mnt/data/src/mlhc-hackathon/moonshot-data/generated-outputs/databases', params.dbName);
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Get all table names
  const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT IN ('sqlite_sequence', 'session_metadata_table', 'runner_cache_table')");

  let allMessages: ChatMessage[] = [];

  for (const table of tables) {
    const tableName = table.name;
    try {
      const messages = await db.all<DbChatMessage[]>(`SELECT id, connection_id, prompt, prepared_prompt, predicted_result, prompt_time FROM ${tableName} ORDER BY prompt_time DESC`);
      allMessages = allMessages.concat(messages.map(msg => ({ ...msg, model: tableName })));
    } catch (error) {
      console.error(`Error fetching data from table ${tableName}:`, error);
    }
  }

  await db.close();

  // Sort all messages by prompt_time
  allMessages.sort((a, b) => new Date(b.prompt_time).getTime() - new Date(a.prompt_time).getTime());

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chat History: {params.dbName}</h1>
        <Link href="/databases" className="text-blue-600 hover:underline">
          Back to Databases
        </Link>
      </div>
      <ChatHistory chatHistory={allMessages} />
    </div>
  );
}
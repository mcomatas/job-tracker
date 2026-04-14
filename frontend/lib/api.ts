const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getApplications() {
  const res = await fetch(`${API_URL}/applications`);
  const json = await res.json();
  return json.data;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// GET all applications (for full table)
export async function getApplications() {
  const res = await fetch(`${API_URL}/applications`);
  const json = await res.json();
  return json.data;
}

// GET single application
export async function getApplication(id) {
  const res = await fetch(`${API_URL}/applications/${id}`);
  const json = await res.json();
  return json.data;
}

import { ApplicationStatus } from "../types/application";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface CreateApplicationInput {
  company: string;
  role: string;
  status: ApplicationStatus;
  location: string;
  appliedDate: string;
  jobUrl?: string;
  salaryRange?: string;
  notes?: string;
}

// GET all applications (for full table)
export async function getApplications() {
  const res = await fetch(`${API_URL}/applications`);
  const json = await res.json();
  return json.data;
}

// GET single application
export async function getApplication(id: string) {
  const res = await fetch(`${API_URL}/applications/${id}`);
  const json = await res.json();
  return json.data;
}

export async function createApplication(application: CreateApplicationInput) {
  const res = await fetch(`${API_URL}/applications/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(application),
  });
  const json = await res.json();
  return json.data;
}

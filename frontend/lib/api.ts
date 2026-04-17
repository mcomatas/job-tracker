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

type UpdateApplicationInput = Partial<CreateApplicationInput>;

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

// CREATE new application
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

// UPDATE existing application
export async function updateApplication(
  id: string,
  application: UpdateApplicationInput,
) {
  const res = await fetch(`${API_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(application),
  });
  const json = await res.json();
  return json.data;
}

// DELETE application
export async function deleteApplication(id: string) {
  const res = await fetch(`${API_URL}/applications/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  return json.data;
}

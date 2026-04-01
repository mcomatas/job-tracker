import ApplicationTable from "@/components/applicationTable";
import { Application, ApplicationStatus } from "@/types/application";

export default function Home() {
  const applications: Application[] = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      status: ApplicationStatus.Applied,
      appliedDate: "2026-03-15",
      jobUrl: "https://careers.google.com/jobs/1",
      salaryRange: "$150-180k",
      createdAt: "2026-03-15",
      updated_at: "2026-03-15",
    },
    {
      id: 2,
      company: "Stripe",
      role: "Backend Engineer",
      status: ApplicationStatus.Interview,
      appliedDate: "2026-03-10",
      jobUrl: "https://stripe.com/jobs/2",
      salaryRange: "$140-170k",
      createdAt: "2026-03-10",
      updated_at: "2026-03-22",
    },
    {
      id: 3,
      company: "Vercel",
      role: "Full Stack Developer",
      status: ApplicationStatus.TakeHomeAssignment,
      appliedDate: "2026-03-08",
      jobUrl: "https://vercel.com/careers/3",
      salaryRange: "$130-160k",
      createdAt: "2026-03-08",
      updated_at: "2026-03-20",
    },
    {
      id: 4,
      company: "Shopify",
      role: "Software Engineer",
      status: ApplicationStatus.Rejected,
      appliedDate: "2026-03-01",
      jobUrl: "https://shopify.com/careers/4",
      salaryRange: "$120-150k",
      createdAt: "2026-03-01",
      updated_at: "2026-03-18",
    },
    {
      id: 5,
      company: "Datadog",
      role: "Platform Engineer",
      status: ApplicationStatus.Offer,
      appliedDate: "2026-02-25",
      jobUrl: "https://careers.datadoghq.com/5",
      salaryRange: "$160-190k",
      createdAt: "2026-02-25",
      updated_at: "2026-03-28",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-950/95 text-white flex items-center justify-center">
      <div className="text-center space-y-2">
        <ApplicationTable applications={applications} />
      </div>
    </main>
  );
}

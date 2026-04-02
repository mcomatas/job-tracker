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
      location: "New York, NY",
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
      location: "San Francisco, CA",
      salaryRange: "$140-170k",
      createdAt: "2026-03-10",
      updated_at: "2026-03-22",
    },
    {
      id: 3,
      company: "Vercel",
      role: "Full Stack Developer",
      status: ApplicationStatus.TakeHome,
      appliedDate: "2026-03-08",
      jobUrl: "https://vercel.com/careers/3",
      location: "Remote",
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
      location: "Toronto, ON",
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
      location: "Boston, MA",
      salaryRange: "$160-190k",
      createdAt: "2026-02-25",
      updated_at: "2026-03-28",
    },
  ];

  return (
    <main className="min-h-screen bg-stone-900/95 flex items-center justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-left text-stone-100">
          Job Tracker
        </h1>
        <ApplicationTable applications={applications} />
      </div>
    </main>
  );
}

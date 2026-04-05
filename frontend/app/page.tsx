"use client";

import ApplicationTable from "@/components/applicationTable";
import AddModal from "@/components/addModal";
import { Application, ApplicationStatus } from "@/types/application";

function Stat({ num, title }: { num: number; title: string }) {
  return (
    <div>
      <h2 className="text-3xl font-semibold">{num}</h2>
      <p className="text-sm text-stone-400">{title}</p>
    </div>
  );
}

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
      notes:
        "Head of talent reached out directly. Node.js + TypeScript + PostgreSQL stack. Onsite in NY — confirm location before next call.",
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
      notes:
        "Phone screen went well. Technical interview scheduled for next week — focus on system design.",
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
      notes:
        "Take-home is a Next.js app with API routes. Due in 5 days. Keep it clean and well-tested.",
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
      notes:
        "Rejected after resume screen. Recruiter mentioned they were looking for more Rails experience.",
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
      notes:
        "Offer at $175k base + equity. Need to respond by April 5. Compare with other pipelines before deciding.",
    },
    {
      id: 6,
      company: "Cloudflare",
      role: "Systems Engineer",
      status: ApplicationStatus.FollowedUp,
      appliedDate: "2026-03-12",
      jobUrl: "https://cloudflare.com/careers/6",
      location: "Austin, TX",
      salaryRange: "$145-175k",
      createdAt: "2026-03-12",
      updated_at: "2026-03-25",
      notes:
        "No response after two weeks. Sent follow-up email to recruiter on LinkedIn.",
    },
    {
      id: 7,
      company: "Netflix",
      role: "Senior Software Engineer",
      status: ApplicationStatus.RejectedAfterInterview,
      appliedDate: "2026-02-20",
      jobUrl: "https://jobs.netflix.com/7",
      location: "Los Gatos, CA",
      salaryRange: "$200-250k",
      createdAt: "2026-02-20",
      updated_at: "2026-03-30",
      notes:
        "Made it to final round but didn't pass the system design interview. Feedback: needed stronger distributed systems knowledge.",
    },
    {
      id: 8,
      company: "Twilio",
      role: "Backend Developer",
      status: ApplicationStatus.Expired,
      appliedDate: "2026-02-10",
      jobUrl: "https://twilio.com/careers/8",
      location: "Remote",
      salaryRange: "$130-155k",
      createdAt: "2026-02-10",
      updated_at: "2026-03-15",
      notes:
        "Posting was taken down before hearing back. Role may have been filled internally.",
    },
    {
      id: 9,
      company: "Linear",
      role: "Software Engineer",
      status: ApplicationStatus.Saved,
      appliedDate: "",
      jobUrl: "https://linear.app/careers/9",
      location: "Remote",
      salaryRange: "$140-170k",
      createdAt: "2026-03-30",
      updated_at: "2026-03-30",
      notes:
        "Great product, small team. Wait until take-home for Vercel is done before applying.",
    },
  ];

  return (
    <main className="min-h-screen bg-stone-900/95 flex items-start pt-30">
      <div className="text-center space-y-2 text-stone-100 max-w-6xl w-full mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-left pb-2">Job Tracker</h1>
          <AddModal />
        </div>
        <div className="text-left justify-between p-3 flex flex-row">
          <Stat num={8} title="Total" />
          <Stat num={3} title="Applied" />
          <Stat num={2} title="In progress" />
          <Stat num={3} title="Rejected" />
        </div>
        <ApplicationTable applications={applications} />
      </div>
    </main>
  );
}

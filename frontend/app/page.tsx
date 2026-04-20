"use client";

import ApplicationTable from "@/components/applicationTable";
import AddModal from "@/components/addModal";
import { Application, ApplicationStatus } from "@/types/application";
import { getApplications } from "../lib/api";
import { useState, useEffect } from "react";

function Stat({ num, title }: { num: number; title: string }) {
  return (
    <div>
      <h2 className="text-3xl font-semibold">{num}</h2>
      <p className="text-sm text-stone-400">{title}</p>
    </div>
  );
}

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);
  const rejectedStatuses = [
    ApplicationStatus.Rejected,
    ApplicationStatus.RejectedAfterInterview,
  ];
  const inProgressStatuses = [
    ApplicationStatus.Screening,
    ApplicationStatus.Interview,
    ApplicationStatus.TakeHome,
    ApplicationStatus.FollowedUp,
  ];

  const refreshApplications = () => {
    getApplications().then(setApplications);
  };

  useEffect(() => {
    refreshApplications();
  }, []);

  return (
    <main className="min-h-screen bg-stone-900/95 flex items-start pt-30 pb-30">
      <div className="text-center space-y-2 text-stone-100 max-w-6xl w-full mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-left pb-2">Job Tracker</h1>
          <AddModal onApplicationAdded={refreshApplications} />
        </div>
        <div className="text-left justify-between p-3 flex flex-row">
          <Stat num={applications.length} title="Total" />
          <Stat
            num={
              applications.filter((a) => a.status === ApplicationStatus.Applied)
                .length
            }
            title="Applied"
          />
          <Stat
            num={
              applications.filter((a) => inProgressStatuses.includes(a.status))
                .length
            }
            title="In progress"
          />
          <Stat
            num={
              applications.filter((a) => rejectedStatuses.includes(a.status))
                .length
            }
            title="Rejected"
          />
        </div>
        <ApplicationTable
          applications={applications}
          onApplicationEdited={refreshApplications}
        />
      </div>
    </main>
  );
}

"use client";

import { Application, StatusEvents } from "@/types/application";
import StatusBadge from "@/components/statusBadge";
import DetailPanel from "@/components/detailPanel";
import { useState, useEffect } from "react";
import { getApplication } from "../lib/api";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function ApplicationTableHeader({ header }: { header: string }) {
  return (
    <th className="border-b border-gray-500/40 text-stone-400 font-semibold text-left">
      {header}
    </th>
  );
}

function ApplicationTableData({ children }: { children: React.ReactNode }) {
  return (
    <td className="border-b border-gray-500/40 text-stone-100/95 text-left font-semibold">
      {children}
    </td>
  );
}

export default function ApplicationTable({
  applications,
}: {
  applications: Application[];
}) {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const [events, setEvents] = useState<StatusEvents[] | null>(null);

  useEffect(() => {
    if (selectedApplication) {
      getApplication(selectedApplication.id).then((data) => {
        setEvents(data.statusEvents);
      });
    }
  }, [selectedApplication]);

  return (
    <>
      <div className="rounded-lg border border-gray-500/40 overflow-hidden tracking-tight relative z-30">
        <table className="text-md table-auto bg-stone-700/40 w-full">
          <thead>
            <tr>
              <ApplicationTableHeader header="Company / Role" />
              <ApplicationTableHeader header="Status" />
              <ApplicationTableHeader header="Salary" />
              <ApplicationTableHeader header="Applied" />
              <ApplicationTableHeader header="Location / Type" />
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr
                key={application.id}
                className="hover:bg-stone-900/50 cursor-pointer"
                onClick={() =>
                  setSelectedApplication(
                    selectedApplication?.id !== application.id
                      ? application
                      : null,
                  )
                }
              >
                <ApplicationTableData>
                  <div className="flex flex-col">
                    <p>{application.company}</p>
                    <p className="text-sm text-stone-400">{application.role}</p>
                  </div>
                </ApplicationTableData>
                <ApplicationTableData>
                  {/*<p>{capitalize(application.status.split("_")).join(" ")}</p>*/}
                  <StatusBadge status={application.status} />
                </ApplicationTableData>
                <ApplicationTableData>
                  <p>{application.salaryRange}</p>
                </ApplicationTableData>
                <ApplicationTableData>
                  {/*I will need to change the format of this once I interact with backend */}
                  <p>{formatDate(application.appliedDate)}</p>
                </ApplicationTableData>
                <ApplicationTableData>
                  <p>{application.location}</p>
                </ApplicationTableData>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedApplication && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-20"
            onClick={() => setSelectedApplication(null)}
          />
          <div className="flex items-center fixed top-0 right-0 h-full w-[500px] bg-stone-800 shadow-lg z-40 overflow-y-auto p-4">
            <DetailPanel application={selectedApplication} events={events} />
          </div>
        </>
      )}
    </>
  );
}

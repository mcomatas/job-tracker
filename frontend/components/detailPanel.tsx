import {
  Application,
  ApplicationStatus,
  StatusEvent,
} from "@/types/application";
import StatusBadge from "@/components/statusBadge";
import { useState } from "react";
import { updateApplication } from "../lib/api";

function GridPane({
  header,
  children,
  isEditing,
  value,
  onChange,
}: {
  header: string;
  children: React.ReactNode;
  isEditing?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col bg-gray-900/30 rounded-md px-4 py-2 text-left font-semibold">
      <p className="text-sm text-stone-400">{header}</p>
      {isEditing ? (
        <input
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="bg-transparent text-stone-100 outline-none"
        />
      ) : (
        <p className="overflow-hidden">{children}</p>
      )}
    </div>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatStatus(status: string): string {
  return status
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function StatusUpdate({ event }: { event: StatusEvent }) {
  const statusColors: Record<ApplicationStatus, string> = {
    [ApplicationStatus.Applied]: "bg-yellow-500",
    [ApplicationStatus.Screening]: "bg-amber-500",
    [ApplicationStatus.Interview]: "bg-blue-500",
    [ApplicationStatus.Offer]: "bg-green-500",
    [ApplicationStatus.Rejected]: "bg-red-500",
    [ApplicationStatus.FollowedUp]: "bg-sky-500",
    [ApplicationStatus.TakeHome]: "bg-purple-500",
    [ApplicationStatus.RejectedAfterInterview]: "bg-rose-500",
    [ApplicationStatus.Expired]: "bg-stone-500",
    [ApplicationStatus.Saved]: "bg-gray-500",
  };

  return (
    <div className="flex gap-3 py-2 font-semibold text-sm">
      <div className="flex flex-col items-center">
        <div
          className={`w-2.5 h-2.5 rounded-full ${statusColors[event.toStatus]}`}
        />
        <div className="w-0.25 flex-1 bg-stone-600" />
      </div>
      <div className="text-sm">
        <p>Moved to {formatStatus(event.toStatus)}</p>
        <p className="text-sm text-stone-400">{formatDate(event.createdAt)}</p>
      </div>
    </div>
  );
}

function Note({
  note,
  isEditing,
  onChange,
}: {
  note: string | null;
  isEditing?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col bg-gray-900/30 rounded-md px-4 py-2 text-left text-sm text-stone-400">
      {isEditing ? (
        <textarea
          value={note ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          rows={3}
          className="bg-transparent text-stone-400 outline-none resize-none"
        />
      ) : (
        note
      )}
    </div>
  );
}

export default function DetailPanel({
  application,
  events,
  onApplicationEdited,
}: {
  application: Application;
  events: StatusEvents[];
  onApplicationEdited: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [company, setCompany] = useState(application.company);
  const [role, setRole] = useState(application.role);
  const [status, setStatus] = useState(application.status);
  const [location, setLocation] = useState(application.location);
  const [appliedDate, setAppliedDate] = useState(application.appliedDate);
  const [jobUrl, setJobUrl] = useState(application.jobUrl);
  const [salaryRange, setSalaryRange] = useState(application.salaryRange);
  const [notes, setNotes] = useState(application.notes);

  return (
    <div>
      <div className="flex flex-row">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center border-2 px-4 py-2 rounded-xl border-gray-400/30 font-semibold hover:bg-stone-900/50 cursor-pointer active:bg-stone-900 mb-4 ml-auto"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <button
            onClick={async () => {
              await updateApplication(application.id, {
                company,
                role,
                status,
                location,
                appliedDate: appliedDate
                  ? new Date(appliedDate).toISOString()
                  : undefined,
                jobUrl: jobUrl || undefined,
                salaryRange: salaryRange || undefined,
                notes: notes || undefined,
              });
              onApplicationEdited();
              setIsEditing(false);
            }}
            className="flex items-center border-2 px-4 py-2 rounded-xl border-green-400/30 font-semibold hover:bg-stone-900/50 cursor-pointer active:bg-stone-900 mb-4 ml-3"
          >
            Save
          </button>
        )}
      </div>
      <div className="rounded-lg border border-gray-500/40 overflow-hidden tracking-tight bg-stone-700 max-w-2xl">
        <div className="flex flex-row items-center justify-between text-md w-full px-4 py-1.5">
          <div className="flex flex-col font-semibold text-left">
            {isEditing ? (
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="text-xl font-semibold bg-transparent text-stone-100 outline-none border-b border-stone-400/50"
              />
            ) : (
              <p className="text-xl">{application.company}</p>
            )}
            {isEditing ? (
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="text-md font-semibold bg-transparent text-stone-400 outline-none border-b border-stone-400/50"
              />
            ) : (
              <p className="text-md text-stone-400">{application.role}</p>
            )}
          </div>
          <div className="font-semibold">
            {isEditing ? (
              <div className="flex flex-col items-end gap-1">
                <StatusBadge status={status} />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                  className="bg-stone-700 text-stone-100 rounded-lg px-2 py-1 outline-none text-sm"
                >
                  {Object.values(ApplicationStatus).map((s) => (
                    <option key={s} value={s}>
                      {formatStatus(s)}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <StatusBadge status={application.status} />
            )}
          </div>
        </div>

        <div className="px-4 py-2">
          <div className="border-b border-gray-500/40" />
        </div>

        <div className="grid grid-cols-2 gap-2 px-4 py-2 text-left">
          <GridPane
            header="Applied"
            isEditing={isEditing}
            value={appliedDate ?? ""}
            onChange={setAppliedDate}
          >
            {application.appliedDate
              ? formatDate(application.appliedDate)
              : "—"}
          </GridPane>
          <GridPane
            header="Salary range"
            isEditing={isEditing}
            value={salaryRange ?? ""}
            onChange={setSalaryRange}
          >
            {application.salaryRange}
          </GridPane>
          <GridPane
            header="Job URL"
            isEditing={isEditing}
            value={jobUrl ?? ""}
            onChange={setJobUrl}
          >
            {application.jobUrl}
          </GridPane>
          <GridPane
            header="Location"
            isEditing={isEditing}
            value={location ?? ""}
            onChange={setLocation}
          >
            {application.location}
          </GridPane>
        </div>

        <div className="px-4 py-2 text-left">
          <p className="text-stone-400 text-sm font-semibold py-2">
            STATUS HISTORY
          </p>
          {events?.map((event) => (
            <StatusUpdate key={event.id} event={event} />
          ))}
        </div>

        <div className="px-4 py-2 text-left">
          <p className="text-stone-400 text-sm font-semibold pb-2">NOTES</p>
          <Note note={notes} isEditing={isEditing} onChange={setNotes} />
        </div>
      </div>
    </div>
  );
}

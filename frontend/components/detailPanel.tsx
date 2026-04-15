import {
  Application,
  ApplicationStatus,
  StatusEvent,
} from "@/types/application";
import StatusBadge from "@/components/statusBadge";

function GridPane({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-gray-900/30 rounded-md px-4 py-2 text-left font-semibold">
      <p className="text-sm text-stone-400">{header}</p>
      <p className="overflow-hidden">{children}</p>
    </div>
  );
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
        <p>Moved to {event.toStatus.split("_").join(" ")}</p>
        <p className="text-sm text-stone-400">{event.createdAt}</p>
      </div>
    </div>
  );
}

function Note({ note }: { note: string | null }) {
  return (
    <div className="flex flex-col bg-gray-900/30 rounded-md px-4 py-2 text-left text-sm text-stone-400">
      {note}
    </div>
  );
}

export default function DetailPanel({
  application,
  events,
}: {
  application: Application;
  events: StatusEvents[];
}) {
  return (
    <div className="rounded-lg border border-gray-500/40 overflow-hidden tracking-tight bg-stone-700 max-w-2xl">
      <div className="flex flex-row items-center justify-between text-md w-full px-4 py-1.5">
        <div className="flex flex-col font-semibold text-left">
          <p className="text-xl">{application.company}</p>
          <p className="text-md text-stone-400">{application.role}</p>
        </div>
        <div className="font-semibold">
          <StatusBadge status={application.status} />
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="border-b border-gray-500/40" />
      </div>

      <div className="grid grid-cols-2 gap-2 px-4 py-2 text-left">
        <GridPane header="Applied">{application.appliedDate}</GridPane>
        <GridPane header="Salary range">{application.salaryRange}</GridPane>
        <GridPane header="Job URL">{application.jobUrl}</GridPane>
        <GridPane header="Location">{application.location}</GridPane>
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
        <Note note={application.notes} />
      </div>
    </div>
  );
}

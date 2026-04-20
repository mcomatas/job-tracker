import { ApplicationStatus } from "@/types/application";

function formatStatus(status: string): string {
  return status
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  const statusColors: Record<ApplicationStatus, string> = {
    [ApplicationStatus.Applied]: "bg-yellow-500/20 text-yellow-300",
    [ApplicationStatus.Screening]: "bg-amber-500/20 text-amber-300",
    [ApplicationStatus.Interview]: "bg-blue-500/20 text-blue-300",
    [ApplicationStatus.Offer]: "bg-green-500/20 text-green-300",
    [ApplicationStatus.Rejected]: "bg-red-500/20 text-red-300",
    [ApplicationStatus.FollowedUp]: "bg-sky-500/20 text-sky-300",
    [ApplicationStatus.TakeHome]: "bg-purple-500/20 text-purple-300",
    [ApplicationStatus.RejectedAfterInterview]: "bg-rose-500/20 text-rose-300",
    [ApplicationStatus.Expired]: "bg-stone-500/20 text-stone-300",
    [ApplicationStatus.Saved]: "bg-gray-500/20 text-gray-300",
  };

  return (
    <div
      className={`rounded-4xl px-2.5 py-1 w-fit text-sm whitespace-nowrap ${statusColors[status]}`}
    >
      {formatStatus(status)}
    </div>
  );
}

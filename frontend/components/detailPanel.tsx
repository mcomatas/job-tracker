import { Application } from "@/types/application";
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
      <p>{children}</p>
    </div>
  );
}

export default function DetailPanel({
  application,
}: {
  application: Application;
}) {
  return (
    <div className="rounded-lg border border-gray-500/40 overflow-hidden tracking-tight bg-stone-700/40 max-w-2xl">
      <div className="flex flex-row items-center justify-between text-md table-auto bg-stone-700/40 w-full px-4 py-1.5">
        <div className="flex flex-col font-semibold text-left">
          <p className="text-xl">{application.company}</p>
          <p className="text-md text-stone-400">{application.role}</p>
        </div>
        <div className="font-semibold">
          <StatusBadge status={application.status} />
        </div>
      </div>

      <div className="border-b border-gray-400/40 px-4" />

      <div className="grid grid-cols-2 gap-2 px-4 py-2 text-left">
        <GridPane header="Applied">{application.appliedDate}</GridPane>
        <GridPane header="Salary range">{application.salaryRange}</GridPane>
        <GridPane header="Job URL">{application.jobUrl}</GridPane>
        <GridPane header="Location">{application.location}</GridPane>
      </div>

      <p>STATUS HISTORY</p>
    </div>
  );
}

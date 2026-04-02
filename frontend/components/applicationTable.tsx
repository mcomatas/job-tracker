import { Application } from "@/types/application";
import StatusBadge from "@/components/statusBadge";
import DetailPanel from "@/components/detailPanel";

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
  return (
    <>
      <div className="rounded-lg border border-gray-500/40 overflow-hidden tracking-tight">
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
                  <p>{application.appliedDate}</p>
                </ApplicationTableData>
                <ApplicationTableData>
                  <p>{application.location}</p>
                </ApplicationTableData>
              </tr>
            ))}
            <tr>
              <td className="font-semibold">Twilio</td>
            </tr>
          </tbody>
        </table>
      </div>
      <DetailPanel application={applications[0]} />
    </>
  );
}

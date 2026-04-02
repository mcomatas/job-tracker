import { Application } from "@/types/application";

function capitalize(words: string[]): string[] {
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words;
}

function ApplicationTableHeader({ header }: { header: string }) {
  return (
    <th className="border-b border-gray-500/40 text-stone-100 font-semibold text-left">
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
    <div className="rounded-lg border border-gray-500/40 overflow-hidden min-w-200 tracking-tight">
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
                <p>{capitalize(application.status.split("_")).join(" ")}</p>
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
        </tbody>
      </table>
    </div>
  );
}

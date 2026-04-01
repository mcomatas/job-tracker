import { Application } from "@/types/application";

export default function ApplicationTable({
  applications,
}: {
  applications: Application[];
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Role</th>
          <th>Location/Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => (
          <tr key={application.id}>
            <td>{application.company}</td>
            <td>{application.role}</td>
            <td>{application.location}</td>
            <td>{application.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

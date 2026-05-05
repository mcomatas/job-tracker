import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import { createApplication } from "../lib/api";
import { ApplicationStatus } from "@/types/application";

export default function AddModal({
  onApplicationAdded,
}: {
  onApplicationAdded: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setCompany("");
    setRole("");
    setLocation("");
    setAppliedDate("");
    setJobUrl("");
    setSalaryRange("");
    setNotes("");
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    resetForm();
  };

  return (
    <>
      <div
        className="flex items-center border-2 px-4 py-2 rounded-xl border-gray-400/30 font-semibold hover:bg-stone-900/50 cursor-pointer active:bg-stone-900"
        onClick={openModal}
      >
        <IoAdd size={20} />
        <h1 className="px-2">Add Application</h1>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="bg-stone-800 w-[500px] rounded-2xl relative shadow-lg p-6">
            <h2 className="text-xl font-semibold text-stone-100 pb-4">
              Add Application
            </h2>
            <form
              className="flex flex-col space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                await createApplication({
                  company,
                  role,
                  status: ApplicationStatus.Applied,
                  location: location || undefined,
                  appliedDate: new Date(appliedDate).toISOString(),
                  jobUrl: jobUrl || undefined,
                  salaryRange: salaryRange || undefined,
                  notes: notes || undefined,
                });
                onApplicationAdded();
                closeModal();
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-stone-700 text-stone-100 placeholder-stone-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-stone-500"
                />
                <input
                  placeholder="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-stone-700 text-stone-100 placeholder-stone-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-stone-700 text-stone-100 placeholder-stone-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-stone-500"
                />
                <input
                  placeholder="Applied Date"
                  type="date"
                  value={appliedDate}
                  onChange={(e) => setAppliedDate(e.target.value)}
                  className="bg-stone-700 text-stone-100 placeholder-stone-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Job URL"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  className="bg-stone-700 text-stone-100 placeholder-stone-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-stone-500"
                />
                <input
                  placeholder="Salary Range"
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                  className="bg-stone-700 text-stone-100 placeholder-stone-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>
              <textarea
                placeholder="Notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-stone-700 text-stone-100 placeholder-stone-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-stone-500 resize-none"
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-600/20 hover:text-red-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-stone-600 text-stone-100 font-semibold hover:bg-stone-500 cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

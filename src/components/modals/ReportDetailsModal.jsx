import React from "react";

const ReportDetailsModal = ({ selectedReport, setSelectedStudent, setIsResponseModalOpen, setIsReportViewModalOpen }) => {
  return (
    <div className="fixed inset-0 bg-opacity-40 text-black flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white border-2 border-black p-6 rounded-lg w-[500px] shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">📄 Report Details</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Student:</strong> {selectedReport.studentName || "N/A"}</p>
          <p><strong>Name of Person:</strong> {selectedReport.nameOfPerson || "N/A"}</p>
          <p><strong>ID Number:</strong> {selectedReport.idNumberOfPerson || "N/A"}</p>
          <p><strong>Reason:</strong> {selectedReport.reason || "N/A"}</p>
          <div>
            <p className="font-semibold mb-1">📝 Description:</p>
            <div className="border border-gray-400 p-3 rounded max-h-60 overflow-y-auto text-sm text-black whitespace-pre-line">
              {selectedReport.description?.trim()
                ? selectedReport.description
                : "No description provided."}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setSelectedStudent({
                name: selectedReport.studentName,
                id: selectedReport.studentId,
                notifId: selectedReport.id,
                schoolId: selectedReport.schoolId,
                reportId: selectedReport.reportId,
              });
              setIsResponseModalOpen(true);
              setIsReportViewModalOpen(false);
            }}
            className="bg-[#0B0D21] text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Respond
          </button>
          <button
            onClick={() => setIsReportViewModalOpen(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsModal;

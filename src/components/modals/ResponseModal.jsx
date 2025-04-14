import { useSubmissions } from "../../contexts/SubmissionsContext";
import { sendSubmissionResponse, sendReportResponse } from "../../api/saoAPI";

const ResponseModal = ({
  student,
  onClose,
  subject,
  setSubject,
  message,
  setMessage,
  markAsRead,
}) => {
  const { refreshSubmissions } = useSubmissions();

  if (!student) return null;

  const sendResponse = async () => {
    if (!subject.trim() || !message.trim()) {
      alert("Please fill in both the subject and message.");
      return;
    }

    try {
      if (student.reportId) {
        console.log("📤 Sending report response with payload:", {
          studentId: student.id,
          studentName: student.name,
          reportId: student.reportId,
          subject,
          message,
        });

        await sendReportResponse({
          studentId: student.id,
          studentName: student.name,
          reportId: student.reportId,
          subject,
          message,
        });

        await markAsRead(student.schoolId, "report", student.notifId);
      } else {
        const payload = {
          studentId: student.id,
          studentName: student.name,
          subject,
          message,
          submissionId: student.submissionId,
        };

        console.log("📤 Sending submission response with payload:", payload);

        await sendSubmissionResponse(payload);

        console.log("✅ Response sent to backend for submission:", payload.submissionId);

        await markAsRead(student.schoolId, "studentSubmissions", student.notifId);
        console.log("📍 Notification marked as read:", student.notifId);

        await refreshSubmissions();
        console.log("🔄 Refetched updated submissions after response");
      }

      alert("Response sent successfully!");
      setSubject("");
      setMessage("");
      onClose();
    } catch (err) {
      console.error("❌ Failed to send response:", err);
      alert("Something went wrong while sending the response.");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 text-black flex justify-center items-center z-50 backdrop-blur-xs">
      <div className="bg-white w-[90%] max-w-2xl rounded-lg shadow-lg p-6 relative">
        <h2 className="text-lg font-semibold text-[#0B0D21] mb-4">
          Send to {student?.name || "Student"}
        </h2>

        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          value={student?.name || ""}
          readOnly
        />
        <input
          type="text"
          placeholder="Subject"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Your message..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 h-40 mb-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={sendResponse}
            className="bg-[#0B0D21] text-white px-6 py-2 rounded hover:bg-gray-900"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;

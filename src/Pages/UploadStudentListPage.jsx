import React, { useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SideNav from '../components/SideNav';
import { FaFileUpload, FaSearch } from 'react-icons/fa';
import useStudentUpload from '../hooks/useStudentUpload';
import { fetchUploadedStudents } from '../api/saoAPI';

const UploadStudentListPage = () => {
  const token = localStorage.getItem('saoToken');
  const schoolId = localStorage.getItem('schoolId');

  const {
    file,
    status,
    loading,
    handleFileChange,
    handleUpload
  } = useStudentUpload();

  const [uploadedStudents, setUploadedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('saoToken');
    const schoolId = localStorage.getItem('schoolId');

    if (!schoolId || !token) {
      console.warn("⚠️ Missing schoolId or token. Skipping fetch.");
      return;
    }

    const loadStudents = async () => {
      try {
        const students = await fetchUploadedStudents(schoolId, token);
        setUploadedStudents(students);
      } catch (err) {
        console.error('❌ Error fetching students:', err);
      }
    };

    loadStudents();
  }, [status]);

  const filteredStudents = uploadedStudents.filter(student => {
    const query = searchTerm.toLowerCase();
    return (
      student.studentId?.toString().includes(query) ||
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(query) ||
      student.course?.toLowerCase().includes(query) ||
      student.section?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 p-6 text-white">
        <DashboardHeader />

        {/* Upload Form */}
        <div className="bg-white text-gray-900 rounded-2xl shadow-xl p-8 mt-20 ml-auto mr-auto w-full max-w-8xl">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaFileUpload className="text-blue-600 mr-2" />
            Upload Student List (.xlsx)
          </h2>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Select Excel File</span>
              <input
                type="file"
                accept=".xlsx"
                onChange={(e) => handleFileChange(e)}
                className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              />
            </label>

            <button
              onClick={() => handleUpload(token, schoolId)}
              disabled={loading}
              className={`w-full flex justify-center items-center px-4 py-2 rounded-lg text-white font-semibold transition 
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              <FaFileUpload className="mr-2" />
              {loading ? 'Uploading...' : 'Upload File'}
            </button>

            {status && (
              <div className={`mt-4 text-sm px-4 py-2 rounded-md font-medium 
                ${status.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {status}
              </div>
            )}
          </div>
        </div>

        {/* Uploaded Students Table */}
        <div className="bg-white text-gray-900 rounded-2xl shadow-xl p-6 mt-8 ml-auto mr-auto w-full max-w-8xl overflow-auto">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span role="img" aria-label="clipboard" className="mr-2">📋</span>
            Uploaded Students
          </h2>

          {/* 🔍 Search Bar */}
          <div className="mb-4 flex items-center space-x-2">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, student ID, course, or section"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filteredStudents.length === 0 ? (
            <p className="text-sm text-gray-600">No uploaded records found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-sm border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-semibold">
                    <th className="px-4 py-2 text-left">Student ID</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Course</th>
                    <th className="px-4 py-2 text-left">Year</th>
                    <th className="px-4 py-2 text-left">Section</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{student.studentId}</td>
                      <td className="px-4 py-2">{student.firstName} {student.lastName}</td>
                      <td className="px-4 py-2">{student.course}</td>
                      <td className="px-4 py-2">{student.year}</td>
                      <td className="px-4 py-2">{student.section}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadStudentListPage;

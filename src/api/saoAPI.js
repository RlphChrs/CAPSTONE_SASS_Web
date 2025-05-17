import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const Upload_URL = import.meta.env.VITE_UPLOAD_URL;
const SUB_URL = import.meta.env.VITE_SUB_URL;
const SAO_URL = import.meta.env.VITE_SAO_URL;
const BASE_URL = import.meta.env.VITE_SAO_URL;

//Registration
export const registerSAO = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register/sao`, formData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data?.message);
    throw error;
  }
};

export const loginSAO = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const user = response.data.user;

    localStorage.setItem("saoToken", response.data.token);
    localStorage.setItem("saoUser", JSON.stringify(user));
    localStorage.setItem("schoolId", user.schoolId); 
    localStorage.setItem("saoName", user.firstName + ' ' + user.lastName);

    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data?.message);
    throw error;
  }
};



export const uploadFile = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append("File", file); 

    const response = await axios.post(
      `${Upload_URL}/uploads/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", 
          Authorization: `Bearer ${token}`, 
        },
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload Progress:",
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      }
    );

    return response.data; 
  } catch (error) {
    console.error("File upload failed:", error.response?.data?.message);
    throw error;
  }
};

//Get Uploaded Files
export const getUploadedFiles = async (token) => {
  try {
    const response = await axios.get(`${Upload_URL}/uploads/files`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error.response?.data?.message);
    throw error;
  }
};

//Delete File
export const deleteFile = async (fileId, fileUrl, token) => {
  try {
    // Extract fileName and schoolId from the URL
    const decodedUrl = decodeURIComponent(fileUrl);
    const parts = decodedUrl.split("/");

    const fileName = parts.pop();
    const schoolIndex = parts.indexOf("schools");
    const schoolId = schoolIndex !== -1 ? parts[schoolIndex + 1] : null;

    if (!schoolId || !fileName) {
      throw new Error("Failed to extract schoolId or fileName from fileUrl.");
    }

    const response = await axios.delete(`${Upload_URL}/delete-file`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        fileId,
        fileUrl,
        schoolId,
        fileName,
      },
    });

    return response.data;
  } catch (error) {
    console.error("File deletion failed:", error.response?.data?.message || error.message);
    throw error;
  }
};


// fetch plans
export const fetchPlans = async () => {
  try {
    const response = await axios.get(SUB_URL);
    return { success: true, data: response.data.plans };
  } catch (error) {
    console.error("Error fetching plans:", error);
    return { success: false };
  }
};

// Fetch student Submissions (Letters)

export const getSAOSubmissions = async () => {
  const token = localStorage.getItem("token");
  console.log("🔑 Using SAO token:", token);

  const response = await axios.get(`${SAO_URL}/submissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const getSAONotifications = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${SAO_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.notifications; 
};

export const getSAOCombinedNotifications = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${SAO_URL}/notifications/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.notifications;
};

export const markNotificationAsRead = async (schoolId, type, id) => {
  const token = localStorage.getItem("token");

  return await axios.post(
    `${import.meta.env.VITE_SAO_URL}/notifications/mark-read`,
    {
      type, 
      id    
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Fetch appointment notifications 
export const getAppointmentNotifications = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${SAO_URL}/notifications/appointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.notifications;
};


export const fetchReportById = async (reportId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${SAO_URL}/reports/${reportId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.report; 
};


export const respondToReport = async (responseData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${SAO_URL}/respond/respond-report`,
    responseData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getStudentList = async () => {
  const token = localStorage.getItem("saoToken");

  const response = await axios.get(`${SAO_URL}/students/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.students;
};

// Fetch all reports
export const getSAOReports = async () => {
  const token = localStorage.getItem("saoToken");
  const response = await axios.get(`${SAO_URL}/reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; 
};

export const markSubmissionAsViewed = async (submissionId) => {
  const token = localStorage.getItem("saoToken");

  const response = await axios.post(
    `${SAO_URL}/submissions/submissions/mark-viewed`, 
    { submissionId },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const sendSubmissionResponse = async (payload) => {
  const token = localStorage.getItem("token");
  console.log("📦 Sending to /notifications/respond:", payload);

  return axios.post(
    `${BASE_URL}/notifications/respond`,
    {
      submissionId: payload.submissionId,
      studentId: payload.studentId,
      studentName: payload.studentName,
      subject: payload.subject,
      feedback: payload.message,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const sendReportResponse = async ({ studentId, studentName, reportId, subject, message }) => {
  const token = localStorage.getItem("token");
  const payload = { studentId, studentName, subject, message, reportId };

  return axios.post(`${BASE_URL}/respond/respond-report`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const uploadStudentList = async (formData, token) => {
  const res = await fetch(`${import.meta.env.VITE_SAO_URL}/match/upload-excel`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to upload student list');
  return res.json();
};


export const fetchUploadedStudents = async (schoolId, token) => {
  const response = await fetch(`${import.meta.env.VITE_SAO_URL}/match/list/${schoolId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch uploaded students');
  }

  return await response.json();
};

export const checkChatbotReady = async (token, schoolId) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sao/chatbot/ready?school_id=${schoolId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to check chatbot readiness");
  }

  return res.json(); 
};



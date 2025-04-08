import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const Upload_URL = import.meta.env.VITE_UPLOAD_URL;
const SUB_URL = import.meta.env.VITE_SUB_URL;
const SAO_URL = import.meta.env.VITE_SAO_URL;

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

    localStorage.setItem("saoToken", response.data.token);
    localStorage.setItem("saoUser", JSON.stringify(response.data.user)); 

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
    const response = await axios.delete(`${Upload_URL}/delete-file`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { fileId, fileUrl },
    });

    return response.data;
  } catch (error) {
    console.error("File deletion failed:", error.response?.data?.message);
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






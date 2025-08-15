// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://notebooklm-backend-o5qo.onrender.com',
  ENDPOINTS: {
    HEALTH: '/api/health',
    UPLOAD: '/api/upload',
    CHAT: '/api/chat',
    DOCUMENT: '/api/document',
    DOCUMENTS: '/api/documents',
  },
  TIMEOUT: 30000, // 30 seconds
};

// API utility functions
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Remove Content-Type for FormData requests
  if (options.body instanceof FormData) {
    delete defaultOptions.headers;
  }

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Specific API functions
export const uploadPDF = async (file: File) => {
  const formData = new FormData();
  formData.append('pdf', file);
  
  return apiRequest(API_CONFIG.ENDPOINTS.UPLOAD, {
    method: 'POST',
    body: formData,
  });
};

export const sendChatMessage = async (message: string, documentId: string) => {
  return apiRequest(API_CONFIG.ENDPOINTS.CHAT, {
    method: 'POST',
    body: JSON.stringify({ message, documentId }),
  });
};

export const getDocumentInfo = async (documentId: string) => {
  return apiRequest(`${API_CONFIG.ENDPOINTS.DOCUMENT}/${documentId}`);
};

export const checkHealth = async () => {
  return apiRequest(API_CONFIG.ENDPOINTS.HEALTH);
};
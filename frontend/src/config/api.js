const API_BASE_URL = '';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  GOOGLE_AUTH: `${API_BASE_URL}/api/auth/google`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  ME: `${API_BASE_URL}/api/auth/me`,

  // Dashboard
  METRICS: `${API_BASE_URL}/api/metrics`,
  REVENUE: `${API_BASE_URL}/api/revenue`,
  NOTIFICATIONS: `${API_BASE_URL}/api/notifications`,

  // Users
  USERS: `${API_BASE_URL}/api/users`,
  USERS_SEARCH: `${API_BASE_URL}/api/users/search`,
  USER_BY_ID: (id) => `${API_BASE_URL}/api/users/${id}`,
  USERS_BULK_ACTIONS: `${API_BASE_URL}/api/users/bulk-actions`,

  // Analytics
  ANALYTICS_TRAFFIC: `${API_BASE_URL}/api/analytics/traffic`,
  ANALYTICS_RETENTION: `${API_BASE_URL}/api/analytics/retention`,
  ANALYTICS_FEATURES: `${API_BASE_URL}/api/analytics/features`,

  // Settings
  SETTINGS: `${API_BASE_URL}/api/settings`,
};
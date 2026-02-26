const API_BASE_URL = '';

export const API_ENDPOINTS = {
  // Dashboard
  GET_METRICS: `${API_BASE_URL}/api/metrics`,
  GET_REVENUE: `${API_BASE_URL}/api/revenue`,

  // Users
  GET_USERS: `${API_BASE_URL}/api/users`,
  SEARCH_USERS: `${API_BASE_URL}/api/users/search`,
  UPDATE_USER: (id) => `${API_BASE_URL}/api/users/${id}`,
  BULK_USERS_ACTIONS: `${API_BASE_URL}/api/users/bulk-actions`,

  // Analytics
  GET_ANALYTICS_TRAFFIC: `${API_BASE_URL}/api/analytics/traffic`,
  GET_ANALYTICS_RETENTION: `${API_BASE_URL}/api/analytics/retention`,
  GET_ANALYTICS_FEATURES: `${API_BASE_URL}/api/analytics/features`,

  // Notifications
  GET_NOTIFICATIONS: `${API_BASE_URL}/api/notifications`,
  MARK_NOTIFICATIONS_READ: `${API_BASE_URL}/api/notifications/mark-read`,
  CLEAR_NOTIFICATIONS: `${API_BASE_URL}/api/notifications/clear`,

  // Settings
  GET_SETTINGS: `${API_BASE_URL}/api/settings`,
  UPDATE_SETTINGS: `${API_BASE_URL}/api/settings`,
  GET_BILLING: `${API_BASE_URL}/api/billing`,
  GET_TEAM: `${API_BASE_URL}/api/team`,
  INVITE_TEAM: `${API_BASE_URL}/api/team`,
  GET_INTEGRATIONS: `${API_BASE_URL}/api/integrations`,
  GET_API_KEYS: `${API_BASE_URL}/api/api-keys`,
  GENERATE_API_KEY: `${API_BASE_URL}/api/api-keys`,

  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  GOOGLE_AUTH: `${API_BASE_URL}/api/auth/google`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  REFRESH_TOKEN: `${API_BASE_URL}/api/auth/refresh`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  GET_ME: `${API_BASE_URL}/api/auth/me`,
};
import api from '../services/api';

// Request/Response logging for debugging
const logRequest = (method, url, data) => {
  console.log(`[Profile API] ${method} ${url}`, data || '');
};

const logResponse = (method, url, response) => {
  console.log(`[Profile API] ${method} ${url} - Success:`, response.data);
};

const logError = (method, url, error) => {
  console.error(`[Profile API] ${method} ${url} - Error:`, error.response?.data || error.message);
};

// Retry logic for failed requests
const retryRequest = async (fn, retries = 2) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.response?.status >= 500) {
      console.log(`[Profile API] Retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};

/**
 * Create user profile
 * @param {Object} profileData - Profile information
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export const createProfile = async (profileData) => {
  try {
    logRequest('POST', '/profile/complete', profileData);
    
    const response = await retryRequest(() => 
      api.post('/profile/complete', profileData)
    );
    
    logResponse('POST', '/profile/complete', response);
    
    return {
      data: response.data.data,
      error: null
    };
  } catch (error) {
    logError('POST', '/profile/complete', error);
    
    return {
      data: null,
      error: error.response?.data?.message || error.message || 'Failed to create profile'
    };
  }
};

/**
 * Get current user's profile
 * Updated 4 December 2025: Return both profile and calculations from Backend
 * @returns {Promise<{data: Object|null, calculations: Object|null, error: string|null}>}
 */
export const getProfile = async () => {
  try {
    logRequest('GET', '/profile');
    
    const response = await retryRequest(() =>
      api.get('/profile')
    );
    
    logResponse('GET', '/profile', response);
    
    return {
      data: response.data.data,
      calculations: response.data.calculations || null,
      error: null
    };
  } catch (error) {
    logError('GET', '/profile', error);
    
    // 404 means profile doesn't exist yet - not really an error
    // 400 with "not found" message also means profile doesn't exist
    if (error.response?.status === 404 || 
        (error.response?.status === 400 && error.response?.data?.message?.includes('not found'))) {
      return {
        data: null,
        calculations: null,
        error: null
      };
    }
    
    return {
      data: null,
      calculations: null,
      error: error.response?.data?.message || error.message || 'Failed to fetch profile'
    };
  }
};

/**
 * Update user profile
 * @param {Object} profileData - Updated profile information
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export const updateProfile = async (profileData) => {
  try {
    logRequest('PUT', '/profile', profileData);
    
    const response = await retryRequest(() =>
      api.put('/profile', profileData)
    );
    
    logResponse('PUT', '/profile', response);
    
    return {
      data: response.data.data,
      error: null
    };
  } catch (error) {
    logError('PUT', '/profile', error);
    
    return {
      data: null,
      error: error.response?.data?.message || error.message || 'Failed to update profile'
    };
  }
};

/**
 * Delete user profile
 * @returns {Promise<{data: boolean, error: string|null}>}
 */
export const deleteProfile = async () => {
  try {
    logRequest('DELETE', '/profile');
    
    const response = await retryRequest(() =>
      api.delete('/profile')
    );
    
    logResponse('DELETE', '/profile', response);
    
    return {
      data: true,
      error: null
    };
  } catch (error) {
    logError('DELETE', '/profile', error);
    
    return {
      data: false,
      error: error.response?.data?.message || error.message || 'Failed to delete profile'
    };
  }
};

export default {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile
};
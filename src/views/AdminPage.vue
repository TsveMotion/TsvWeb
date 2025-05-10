<template>
  <div class="admin-container">
    <!-- Login Form -->
    <div v-if="!isAuthenticated" class="login-container">
      <div class="login-form-wrapper">
        <div class="login-logo">
          <img src="../assets/TsvWeb1.png" alt="TSVWeb Logo" />
        </div>
        <h2>Admin Login</h2>
        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              v-model="loginForm.username" 
              required 
              placeholder="Enter username"
            />
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="loginForm.password" 
              required 
              placeholder="Enter password"
            />
          </div>
          
          <button type="submit" class="login-btn" :disabled="isLoggingIn">
            <span v-if="isLoggingIn">Logging in...</span>
            <span v-else>Login</span>
          </button>
          
          <div v-if="loginError" class="login-error">
            {{ loginError }}
          </div>
        </form>
      </div>
    </div>
    
    <!-- Admin Dashboard -->
    <div v-else>
      <div class="admin-header">
        <div class="container">
          <h1>Admin Dashboard</h1>
          <div class="admin-controls">
            <div class="search-container">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search submissions..." 
                class="search-input"
              />
            </div>
            <div class="filter-container">
              <select v-model="statusFilter" class="status-filter">
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button @click="logout" class="logout-btn">Logout</button>
          </div>
        </div>
      </div>

    <div class="admin-content">
      <div class="container">
        <div class="admin-stats">
          <div class="stat-card">
            <div class="stat-value">{{ totalSubmissions }}</div>
            <div class="stat-label">Total Submissions</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ pendingCount }}</div>
            <div class="stat-label">Pending</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ confirmedCount }}</div>
            <div class="stat-label">Confirmed</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ completedCount }}</div>
            <div class="stat-label">Completed</div>
          </div>
        </div>

        <div class="submissions-table-wrapper">
          <table class="submissions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredSubmissions.length === 0">
                <td colspan="8" class="no-data">No submissions found</td>
              </tr>
              <tr v-for="submission in filteredSubmissions" :key="submission.id" :class="{'status-pending': submission.status === 'Pending', 'status-confirmed': submission.status === 'Confirmed', 'status-completed': submission.status === 'Completed', 'status-cancelled': submission.status === 'Cancelled'}">
                <td>#{{ submission.id }}</td>
                <td>{{ submission.name }}</td>
                <td>{{ submission.email }}</td>
                <td class="message-cell">{{ truncateText(submission.message, 50) }}</td>
                <td>{{ submission.date }}</td>
                <td>{{ submission.time }}</td>
                <td>
                  <span class="status-badge" :class="getStatusClass(submission.status)">
                    {{ submission.status }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button @click="viewDetails(submission)" class="action-btn view-btn">
                      <span class="btn-icon">👁️</span>
                    </button>
                    <button @click="updateStatus(submission.id, 'Confirmed')" class="action-btn confirm-btn" :disabled="submission.status === 'Confirmed'">
                      <span class="btn-icon">✅</span>
                    </button>
                    <button @click="updateStatus(submission.id, 'Completed')" class="action-btn complete-btn" :disabled="submission.status === 'Completed'">
                      <span class="btn-icon">🏁</span>
                    </button>
                    <button @click="updateStatus(submission.id, 'Cancelled')" class="action-btn cancel-btn" :disabled="submission.status === 'Cancelled'">
                      <span class="btn-icon">❌</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal for viewing submission details -->
    <div v-if="selectedSubmission" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Submission Details</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="detail-item">
            <div class="detail-label">ID:</div>
            <div class="detail-value">#{{ selectedSubmission.id }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Name:</div>
            <div class="detail-value">{{ selectedSubmission.name }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Email:</div>
            <div class="detail-value">{{ selectedSubmission.email }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Date:</div>
            <div class="detail-value">{{ selectedSubmission.date }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Time:</div>
            <div class="detail-value">{{ selectedSubmission.time }}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Status:</div>
            <div class="detail-value">
              <span class="status-badge" :class="getStatusClass(selectedSubmission.status)">
                {{ selectedSubmission.status }}
              </span>
            </div>
          </div>
          <div class="detail-item full-width">
            <div class="detail-label">Message:</div>
            <div class="detail-value message-box">{{ selectedSubmission.message }}</div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="status-buttons">
            <button @click="updateStatus(selectedSubmission.id, 'Confirmed')" class="status-btn confirm-btn" :disabled="selectedSubmission.status === 'Confirmed'">
              Confirm
            </button>
            <button @click="updateStatus(selectedSubmission.id, 'Completed')" class="status-btn complete-btn" :disabled="selectedSubmission.status === 'Completed'">
              Complete
            </button>
            <button @click="updateStatus(selectedSubmission.id, 'Cancelled')" class="status-btn cancel-btn" :disabled="selectedSubmission.status === 'Cancelled'">
              Cancel
            </button>
            <button @click="updateStatus(selectedSubmission.id, 'Pending')" class="status-btn pending-btn" :disabled="selectedSubmission.status === 'Pending'">
              Set Pending
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useContactStore } from '../store/contactStore'

const contactStore = useContactStore()
const searchQuery = ref('')
const statusFilter = ref('all')
const selectedSubmission = ref(null)

// Authentication state
const isAuthenticated = ref(false)
const isLoggingIn = ref(false)
const loginError = ref('')
const loginForm = ref({
  username: '',
  password: ''
})

// Check if user is already authenticated
onMounted(() => {
  const authStatus = localStorage.getItem('adminAuth')
  if (authStatus === 'true') {
    isAuthenticated.value = true
  }
})

// Handle login
async function login() {
  isLoggingIn.value = true
  loginError.value = ''
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Get credentials from environment variables
    const validUsername = import.meta.env.VITE_ADMIN_USERNAME
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD
    
    if (loginForm.value.username === validUsername && loginForm.value.password === validPassword) {
      isAuthenticated.value = true
      localStorage.setItem('adminAuth', 'true')
      loginForm.value = { username: '', password: '' }
    } else {
      loginError.value = 'Invalid username or password'
    }
  } catch (error) {
    loginError.value = 'Login failed. Please try again.'
    console.error('Login error:', error)
  } finally {
    isLoggingIn.value = false
  }
}

// Handle logout
function logout() {
  isAuthenticated.value = false
  localStorage.removeItem('adminAuth')
}

// Computed values for statistics
const totalSubmissions = computed(() => contactStore.submissions.length)

const pendingCount = computed(() => 
  contactStore.submissions.filter(sub => sub.status === 'Pending').length
)

const confirmedCount = computed(() => 
  contactStore.submissions.filter(sub => sub.status === 'Confirmed').length
)

const completedCount = computed(() => 
  contactStore.submissions.filter(sub => sub.status === 'Completed').length
)

// Filtered submissions based on search and status filter
const filteredSubmissions = computed(() => {
  let result = [...contactStore.submissions]
  
  // Apply status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(submission => submission.status === statusFilter.value)
  }
  
  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(submission => 
      submission.name.toLowerCase().includes(query) ||
      submission.email.toLowerCase().includes(query) ||
      submission.message.toLowerCase().includes(query)
    )
  }
  
  // Sort by ID (latest first)
  return result.sort((a, b) => b.id - a.id)
})

// Utility function to truncate text
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Get class for status badge
function getStatusClass(status) {
  return {
    'Pending': 'status-pending-badge',
    'Confirmed': 'status-confirmed-badge',
    'Completed': 'status-completed-badge',
    'Cancelled': 'status-cancelled-badge'
  }[status] || ''
}

// View submission details
function viewDetails(submission) {
  selectedSubmission.value = { ...submission }
}

// Close modal
function closeModal() {
  selectedSubmission.value = null
}

// Update submission status
function updateStatus(id, status) {
  contactStore.updateStatus(id, status)
  
  // If we're viewing the details, update the selected submission status
  if (selectedSubmission.value && selectedSubmission.value.id === id) {
    selectedSubmission.value.status = status
  }
}
</script>

<style scoped>
.admin-container {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-dark);
  color: var(--text-light);
}

/* Login Form Styles */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, var(--bg-darker) 100%);
}

.login-form-wrapper {
  background-color: var(--card-bg);
  padding: 2.5rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  border: 1px solid rgba(0, 255, 231, 0.2);
  box-shadow: 0 0 30px rgba(0, 255, 231, 0.1);
}

.login-logo {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-logo img {
  height: 60px;
  margin-bottom: 1rem;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Orbitron', sans-serif;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.login-form .form-group {
  margin-bottom: 1.5rem;
}

.login-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-family: 'Orbitron', sans-serif;
  color: var(--primary);
}

.login-form input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(10, 15, 30, 0.8);
  border: 1px solid var(--primary-dark);
  border-radius: 4px;
  color: var(--text-light);
  font-family: 'Fira Mono', monospace;
  transition: all 0.3s ease;
}

.login-form input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 255, 231, 0.3);
  border-color: var(--primary);
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary);
  color: var(--text-dark);
  border: none;
  border-radius: 4px;
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-error {
  color: var(--accent);
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.admin-header {
  background-color: var(--card-bg);
  padding: 1.5rem 0;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.logout-btn {
  background-color: var(--accent);
  color: var(--text-light);
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #ff0055;
  transform: translateY(-2px);
}

.admin-header {
  background: rgba(10, 15, 30, 0.95);
  padding: 1.5rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 70px;
  z-index: 10;
}

.admin-header h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.admin-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-container {
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 20, 35, 0.8);
  color: var(--text-light);
  font-family: 'Fira Mono', monospace;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(0, 255, 231, 0.2);
}

.status-filter {
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 20, 35, 0.8);
  color: var(--text-light);
  appearance: none;
  font-family: 'Fira Mono', monospace;
  min-width: 150px;
}

.status-filter:focus {
  outline: none;
  border-color: var(--primary);
}

.admin-content {
  padding: 2rem 0;
}

.admin-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(15, 20, 35, 0.8);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.submissions-table-wrapper {
  background: rgba(15, 20, 35, 0.8);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  margin-bottom: 3rem;
}

.submissions-table {
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
}

.submissions-table th {
  background: rgba(10, 15, 30, 0.9);
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.submissions-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}

.submissions-table tr:hover td {
  background: rgba(0, 255, 231, 0.05);
}

.message-cell {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.no-data {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  padding: 2rem !important;
}

.status-badge {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-pending-badge {
  background: rgba(241, 196, 15, 0.1);
  color: #f1c40f;
  border: 1px solid rgba(241, 196, 15, 0.3);
}

.status-confirmed-badge {
  background: rgba(0, 255, 231, 0.1);
  color: var(--primary);
  border: 1px solid rgba(0, 255, 231, 0.3);
}

.status-completed-badge {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  border: 1px solid rgba(46, 204, 113, 0.3);
}

.status-cancelled-badge {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.3);
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.view-btn {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.view-btn:hover:not(:disabled) {
  background: rgba(52, 152, 219, 0.2);
}

.confirm-btn {
  background: rgba(0, 255, 231, 0.1);
  color: var(--primary);
}

.confirm-btn:hover:not(:disabled) {
  background: rgba(0, 255, 231, 0.2);
}

.complete-btn {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.complete-btn:hover:not(:disabled) {
  background: rgba(46, 204, 113, 0.2);
}

.cancel-btn {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.cancel-btn:hover:not(:disabled) {
  background: rgba(231, 76, 60, 0.2);
}

/* Status row colors */
.status-pending {
  background: rgba(241, 196, 15, 0.03);
}

.status-confirmed {
  background: rgba(0, 255, 231, 0.03);
}

.status-completed {
  background: rgba(46, 204, 113, 0.03);
}

.status-cancelled {
  background: rgba(231, 76, 60, 0.03);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: var(--card-bg);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: var(--primary);
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: var(--primary);
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.detail-item {
  flex: 1 0 45%;
}

.full-width {
  flex: 1 0 100%;
}

.detail-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.3rem;
}

.detail-value {
  font-size: 1rem;
  color: var(--text-light);
}

.message-box {
  background: rgba(15, 20, 35, 0.5);
  border-radius: 8px;
  padding: 1rem;
  white-space: pre-wrap;
  font-family: 'Fira Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  max-height: 200px;
  overflow-y: auto;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.status-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.status-btn {
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.status-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pending-btn {
  background: rgba(241, 196, 15, 0.1);
  color: #f1c40f;
  border: 1px solid rgba(241, 196, 15, 0.3);
}

.pending-btn:hover:not(:disabled) {
  background: rgba(241, 196, 15, 0.2);
}

.confirm-btn {
  background: rgba(0, 255, 231, 0.1);
  color: var(--primary);
  border: 1px solid rgba(0, 255, 231, 0.3);
}

.confirm-btn:hover:not(:disabled) {
  background: rgba(0, 255, 231, 0.2);
}

.complete-btn {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  border: 1px solid rgba(46, 204, 113, 0.3);
}

.complete-btn:hover:not(:disabled) {
  background: rgba(46, 204, 113, 0.2);
}

.cancel-btn {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.3);
}

.cancel-btn:hover:not(:disabled) {
  background: rgba(231, 76, 60, 0.2);
}

/* Responsive styles */
@media (max-width: 992px) {
  .admin-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .submissions-table {
    display: block;
    overflow-x: auto;
  }
  
  .action-buttons {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .admin-content {
    padding: 1rem 0;
  }
  
  .admin-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .modal-content {
    width: 95%;
  }
  
  .detail-item {
    flex: 1 0 100%;
  }
}

@media (max-width: 480px) {
  .admin-stats {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-value {
    font-size: 1.8rem;
  }
  
  .submissions-table th, 
  .submissions-table td {
    padding: 0.7rem;
    font-size: 0.8rem;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
}
</style>

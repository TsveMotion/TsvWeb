import { defineStore } from 'pinia'

export const useContactStore = defineStore('contact', {
  state: () => ({
    submissions: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        message: 'I need a website for my business',
        date: '2025-05-08',
        time: '10:00 AM',
        status: 'Pending'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'Looking for a mobile app developer',
        date: '2025-05-10',
        time: '2:30 PM',
        status: 'Confirmed'
      }
    ]
  }),
  
  actions: {
    addSubmission(submission) {
      const newSubmission = {
        id: this.submissions.length + 1,
        ...submission,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0]
      }
      this.submissions.push(newSubmission)
      
      // In a real app, you would save to a database here
      // For demo purposes, we're just storing in memory
      
      return newSubmission
    },
    
    updateStatus(id, status) {
      const submission = this.submissions.find(sub => sub.id === id)
      if (submission) {
        submission.status = status
      }
    },
    
    // In a real app, you would add methods to fetch from API
    // and persist changes to a database
  }
})

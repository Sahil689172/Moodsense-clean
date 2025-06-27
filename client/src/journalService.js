import { db } from './firebase';
import { collection, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';
import { auth } from './firebase';

// Save a journal entry for a user on a specific date using backend API
export async function saveJournalEntry(userId, date, content) {
  const token = await auth.currentUser.getIdToken();
  const response = await fetch('https://moodsense-backend.onrender.com/api/journal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ date, content })
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to save journal entry');
  }
}

// Get all journal entries for a user using backend API
export async function getJournalEntries(userId) {
  const token = await auth.currentUser.getIdToken();
  const response = await fetch('https://moodsense-backend.onrender.com/api/journal', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to fetch journal entries');
  }
  return await response.json();
}

// Get a single journal entry by date using backend API
export async function getJournalEntryByDate(userId, date) {
  const token = await auth.currentUser.getIdToken();
  const response = await fetch(`https://moodsense-backend.onrender.com/api/journal/${date}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    if (response.status === 404) return null;
    const data = await response.json();
    throw new Error(data.message || 'Failed to fetch journal entry');
  }
  return await response.json();
}

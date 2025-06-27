import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveJournalEntry, getJournalEntries, getJournalEntryByDate } from '../journalService';
import { useAuth } from '../contexts/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function formatDateTimeDisplay(date) {
  return date.toLocaleString('en-GB', {
    weekday: 'long', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false
  });
}

function getTodayKey() {
  const today = new Date();
  return today.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function Journal() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [journalText, setJournalText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Fetch all entries on mount
  useEffect(() => {
    if (!currentUser) return;
    setLoading(true);
    getJournalEntries(currentUser.uid).then(fetched => {
      const formatted = fetched.map(e => ({
        key: e.date,
        date: new Date(e.date),
        text: e.content || ''
      })).sort((a, b) => b.date - a.date);
      setEntries(formatted);
      setLoading(false);
    });
  }, [currentUser]);

  // When activeKey changes, fetch entry if not already loaded
  useEffect(() => {
    if (!currentUser || !activeKey) return;
    const found = entries.find(e => e.key === activeKey);
    if (found) {
      setJournalText(found.text || '');
    } else {
      // Try to fetch from backend if not in entries
      getJournalEntryByDate(currentUser.uid, activeKey).then(e => {
        if (e) {
          setEntries(prev => [{ key: e.date, date: new Date(e.date), text: e.content || '' }, ...prev]);
          setJournalText(e.content || '');
        } else {
          setJournalText('');
        }
      });
    }
  }, [activeKey, currentUser, entries]);

  // Save handler for Save button
  const handleSave = async () => {
    if (!currentUser || !activeKey) return;
    setSaving(true);
    setSaved(false);
    await saveJournalEntry(currentUser.uid, activeKey, journalText);
    setEntries(prev => {
      const exists = prev.some(e => e.key === activeKey);
      if (exists) {
        return prev.map(e => e.key === activeKey ? { ...e, text: journalText } : e);
      } else {
        return [{ key: activeKey, date: new Date(activeKey), text: journalText }, ...prev];
      }
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  // Add Journal handler (show date picker)
  const handleAddNew = () => {
    setShowDatePicker(true);
    setDatePickerDate(new Date());
  };

  // When user selects a date in the date picker
  const handleDateSelected = (date) => {
    setShowDatePicker(false);
    if (!date) return;
    const dateKey = date.toISOString().slice(0, 10);
    setActiveKey(dateKey);
    // If entry for this date doesn't exist, clear notepad
    const found = entries.find(e => e.key === dateKey);
    setJournalText(found ? found.text : '');
    // If not present, add a card for this date (will be filled on save)
    setEntries(prev => {
      if (!prev.some(e => e.key === dateKey)) {
        return [{ key: dateKey, date: new Date(dateKey), text: '' }, ...prev];
      }
      return prev;
    });
  };

  // Date card click handler
  const handleDateCardClick = (dateKey) => {
    setActiveKey(dateKey);
  };

  // Only logged-in users can use the journal
  if (!currentUser) {
    return <div className="text-white p-8">Please log in to view your journal.</div>;
  }

  // Deduplicate entries by date key before rendering
  const uniqueEntries = [];
  const seen = new Set();
  for (const entry of entries) {
    if (!seen.has(entry.key)) {
      uniqueEntries.push(entry);
      seen.add(entry.key);
    }
  }
  // Sort by date descending
  uniqueEntries.sort((a, b) => b.date - a.date);

  return (
    <div className="relative flex min-h-screen flex-col bg-black font-sans overflow-x-hidden" style={{ fontFamily: 'Space Grotesk, Noto Sans, sans-serif' }}>
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283039] px-10 py-3">
        <div className="flex items-center gap-4 text-white">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Moodsense</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9"><a className="text-white text-sm font-medium leading-normal" href="#" onClick={() => navigate('/')}>Home</a></div>
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#283039] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            onClick={() => navigate('/chatbot')}
          >
            <span className="truncate">chatbot</span>
          </button>
        </div>
      </header>
      {/* Main Content */}
      <div className="gap-1 px-6 flex flex-1 justify-center py-5">
        {/* Left column */}
        <div className="flex flex-col w-80 items-center mx-auto">
          {/* Image */}
          <div className="w-full flex flex-col justify-end items-start overflow-hidden bg-black rounded-xl min-h-[320px] mb-4">
            <img src="mountain_waterfall.png" alt="Mountain with waterfall" className="rounded-xl object-cover bg-black" style={{ width: '100%', maxWidth: '1400px', height: '320px' }} />
          </div>
          {/* Add Journal Card - below image */}
          <div className="flex items-center gap-2 rounded-lg border border-[#3b4754] bg-[#1b2127] p-2 mt-2 mb-2 cursor-pointer hover:bg-[#232a32] transition w-full" style={{ maxWidth: '1400px' }} onClick={handleAddNew}>
            <div className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
              </svg>
            </div>
            <h2 className="text-white text-sm font-bold leading-tight">Add Journal</h2>
          </div>
          {/* Date Picker Modal */}
          {showDatePicker && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-xl p-6 flex flex-col items-center">
                <h3 className="mb-2 text-lg font-bold text-black">Select a date for your journal</h3>
                <DatePicker
                  selected={datePickerDate}
                  onChange={date => { setDatePickerDate(date); handleDateSelected(date); }}
                  inline
                  maxDate={new Date()}
                />
                <button className="mt-4 px-4 py-2 bg-gray-200 rounded" onClick={() => setShowDatePicker(false)}>Cancel</button>
              </div>
            </div>
          )}
          {/* Date Cards Grid - show all unique entries */}
          <div className="grid grid-cols-4 gap-3 justify-start mt-2 mb-6 w-full max-w-3xl">
            {uniqueEntries.map((entry, i) => (
              <div
                key={entry.key}
                className={`min-w-[100px] h-20 flex items-center justify-center rounded-lg border border-[#3b4754] bg-[#232a32] shadow cursor-pointer transition ${activeKey === entry.key ? 'ring-2 ring-pink-400' : ''}`}
                onClick={() => handleDateCardClick(entry.key)}
              >
                <span className="text-white text-base font-semibold text-center w-full">
                  {entry.date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Right column */}
        <div className="flex flex-col max-w-6xl w-full flex-1 mx-auto">
          {/* Heading above textarea */}
          <h2 className="text-3xl font-bold text-white text-center mb-4" style={{ fontFamily: 'Poppins, Montserrat, Inter, sans-serif' }}>JOURNAL</h2>
          <div className="flex w-full flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <textarea
                placeholder="Write your journal entry here..."
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-black focus:outline-0 focus:ring-0 border-4 border-solid border-white bg-white min-h-[2000px] placeholder:text-[#9cabba] p-4 text-xl font-normal leading-normal"
                value={journalText}
                onChange={e => setJournalText(e.target.value)}
                disabled={!activeKey}
              ></textarea>
            </label>
          </div>
          <div className="border-4 border-solid border-white rounded-xl p-6 pt-2 mt-4 max-w-7xl w-full mx-auto flex-1" style={{ background: 'repeating-linear-gradient(to bottom, #262626 0px, #262626 39px, #fff 39px, #fff 41px), linear-gradient(to right, transparent 79px, #ff69b4 79px, #ff69b4 81px, transparent 81px)' }}>
            <p className="text-white text-xl font-normal break-words whitespace-pre-line" style={{ lineHeight: '40px', fontFamily: 'Bookman Old Style, serif' }}>
              {journalText}
            </p>
          </div>
          {/* Save Button at the bottom of the right column */}
          <div className="w-full flex justify-center pt-10 mb-10">
            <button className="px-8 py-3 bg-white text-black rounded-xl font-bold text-lg shadow hover:bg-gray-200 transition" onClick={handleSave} disabled={saving || !activeKey}>{saving ? 'Saving...' : saved ? 'Saved' : 'Save'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}



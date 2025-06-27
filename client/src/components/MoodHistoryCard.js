import React, { useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const moodData = [
  { mood: 'Happy', value: 12, color: '#60a5fa' },
  { mood: 'Sad', value: 5, color: '#f87171' },
  { mood: 'Anxious', value: 3, color: '#fbbf24' },
  { mood: 'Calm', value: 7, color: '#34d399' },
  { mood: 'Excited', value: 8, color: '#a78bfa' },
];

const moodHistory = [
  { date: 'Mon', score: 4 },
  { date: 'Tue', score: 3 },
  { date: 'Wed', score: 5 },
  { date: 'Thu', score: 2 },
  { date: 'Fri', score: 4 },
  { date: 'Sat', score: 5 },
  { date: 'Sun', score: 3 },
];

const summary = {
  mostCommon: 'Happy',
  avgScore: 3.7,
  moodShift: '+1',
  positiveDays: 4,
  negativeDays: 3,
};

const chartTabs = [
  { label: 'Summary', value: 'summary' },
  { label: 'Pie Chart', value: 'pie' },
  { label: 'Line Chart', value: 'line' },
];

export default function MoodHistoryCard() {
  const [tab, setTab] = useState('summary');

  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-lg p-6 w-full md:w-96 min-w-[260px] max-w-md flex flex-col items-center animate-fadeIn">
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-200" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Mood History
        </h3>
        <div className="flex gap-2">
          {chartTabs.map(t => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition shadow-sm ${tab === t.value ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-600'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        {tab === 'summary' && (
          <div className="w-full text-sm text-gray-700 dark:text-gray-200 space-y-2 mt-2">
            <div><span className="font-bold">Most common mood:</span> {summary.mostCommon}</div>
            <div><span className="font-bold">Average mood score:</span> {summary.avgScore}</div>
            <div><span className="font-bold">Mood shift:</span> <span className={summary.moodShift.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{summary.moodShift}</span></div>
            <div><span className="font-bold">Positive days:</span> {summary.positiveDays}</div>
            <div><span className="font-bold">Negative days:</span> {summary.negativeDays}</div>
          </div>
        )}
        {tab === 'pie' && (
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={moodData} dataKey="value" nameKey="mood" cx="50%" cy="50%" outerRadius={60} label>
                {moodData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
        {tab === 'line' && (
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={moodHistory} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
              <XAxis dataKey="date" stroke="#8884d8" />
              <YAxis domain={[0, 5]} hide />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
} 
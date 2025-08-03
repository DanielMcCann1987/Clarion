import React, { createContext, useContext, useState } from 'react';

// Initial mock entries (can be replaced with real persistence later)
const INITIAL_ENTRIES = [
  {
    id: '1',
    identity_sentence: "I'm choosing clarity over the old nicotine story.",
    entry_text: 'Felt anxious after drinking, realized the urge was just a pattern...',
    created_at: new Date().toISOString(),
    favorite: false,
    analysis: null,
    analysis_markdown: `I no longer have to absorb the damage I witness; stepping away doesn’t mean abandoning—it means choosing clarity while witnessing without being consumed.`,
  },
  {
    id: '2',
    identity_sentence: "I’m reclaiming my nervous system.",
    entry_text: 'Morning reflection: discomfort is information, not threat...',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    favorite: true,
    analysis: null,
    analysis_markdown: null,
  },
  {
    id: '3',
    identity_sentence: 'I step away from passive repetition and choose my own direction.',
    entry_text:
      'Dreamt of a bus crash—again. I kept walking away, yet still saw the crashes behind me.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    favorite: false,
    analysis: null,
    analysis_markdown: `This symbolizes recurring emotional damage even when growth has started. You're not trapped in the crash—you are walking away from it.`,
  },
];

const EntriesContext = createContext();

export function EntriesProvider({ children }) {
  const [entries, setEntries] = useState(INITIAL_ENTRIES);

  const toggleFavorite = (id) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, favorite: !e.favorite } : e))
    );
  };

  const upsertEntry = (entry) => {
    setEntries((prev) => {
      if (!entry.id) {
        // assign id if missing
        entry.id = Date.now().toString();
      }
      const existing = prev.find((e) => e.id === entry.id);
      if (existing) {
        return prev.map((e) => (e.id === entry.id ? { ...existing, ...entry } : e));
      } else {
        return [entry, ...prev];
      }
    });
  };

  return (
    <EntriesContext.Provider value={{ entries, toggleFavorite, upsertEntry }}>
      {children}
    </EntriesContext.Provider>
  );
}

export const useEntries = () => {
  const ctx = useContext(EntriesContext);
  if (!ctx) throw new Error('useEntries must be used within EntriesProvider');
  return ctx;
};

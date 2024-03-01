import React, { useState, useEffect } from 'react';
import { getUserPreferences } from '../utills/LocalStorageUtil';

const SettingsPage = ({ sources, categories, onSave }) => {
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const preferences = getUserPreferences();
    if (preferences?.sources) {
      setSelectedSources(preferences?.sources);
    }
    if (preferences?.categories) {
      setSelectedCategories(preferences?.categories);
    }
  }, []);

  const handleSave = () => {
    // Save user preferences
    onSave({
      sources: selectedSources,
      categories: selectedCategories
    });
  };

  const handleResetSave = () => {
    const reset = [];
    setSelectedSources(reset);
    setSelectedCategories(reset)
    onSave({
      sources: reset,
      categories: reset,
    });
  }

  return (
    <div className='settings-page'>
      <h3>Customize Your News Feed</h3>
      <div className='settings-content'>
        <h4>Select Preferred Sources:</h4>
        {sources.map(source => (
          <label key={source}>
            <input
              type="checkbox"
              value={source}
              checked={selectedSources.includes(`${source}`)}
              onChange={e => {
                const { checked, value } = e.target;
                setSelectedSources(prev => checked ? [...prev, value] : prev.filter(s => s !== value));
              }}
            /> {source}
          </label>
        ))}
        <br />
        <br />
        <h4>Select Preferred Categories:</h4>
        {categories.map(category => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={e => {
                const { checked, value } = e.target;
                setSelectedCategories(prev => checked ? [...prev, value] : prev.filter(c => c !== value));
              }}
            /> {category}
          </label>
        ))}
        <br />
        <div className='button-actions'>
          <button class="btn btn-outline-dark" onClick={handleSave}>Save Preferences</button>
          <button class="btn btn-outline-dark" onClick={handleResetSave}>Reset Preferences</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

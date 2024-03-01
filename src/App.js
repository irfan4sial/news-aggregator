import React, { useState, useEffect, useCallback } from 'react';
import ArticleList from './components/ArticleList';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import FilterByDate from './components/FilterByDate';
import NewsAPIService from './services/NewsAPIService';
import OpenNewsAPIService from './services/OpenNewsAPIService';
import TheGuardianAPIService from './services/TheGuardianAPIService';
import SettingsPage from './components/SettingsPage';
import { getUserPreferences, saveUserPreferences } from './utills/LocalStorageUtil';
import moment from 'moment/moment';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSearch, setSelectedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [userPreferences, setUserPreferences] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const newsAPIArticles = await NewsAPIService.getArticles();
        const openNewsAPIArticles = await OpenNewsAPIService.getArticles();
        const guardianAPIArticles = await TheGuardianAPIService.getArticles()
        // console.log("openNewsAPIArticles:", guardianAPIArticles)
        const allArticles = [...newsAPIArticles, ...openNewsAPIArticles, ...guardianAPIArticles];
        setArticles(allArticles);
        setFilteredArticles(allArticles);
        setCategories([...new Set(allArticles.map(article => article.category))]);
        setSources([...new Set(allArticles.map(article => article.source))]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = searchTerm => {
    setSelectedSearch(searchTerm.toLowerCase());
  };

  useEffect(() => {
    const preferences = getUserPreferences();
    if (preferences) {
      setUserPreferences(preferences);
    }
  }, []);

  const applyFilters = useCallback((search, category, source, date, pref) => {
    let filtered = articles;
    if (search) {
      filtered = filtered.filter(article => {
        return (article.title.toLowerCase().includes(search.toLowerCase()) || article.content.toLowerCase().includes(search.toLowerCase()))
      });
    }
    if (category) {
      filtered = filtered.filter(article => article.category === category);
    }
    if (source) {
      filtered = filtered.filter(article => article.source === source);
    }
    if (date) {
      filtered = filtered.filter((obj) => {
        return moment.utc(obj.publishedAt).format("DD MMM yyyy") === moment(date).format("DD MMM yyyy")
      })
    }
    if (pref) {
      if (pref.sources.length > 0) {
        filtered = filtered.filter(article => pref.sources.includes(article.source));
      }
      if (pref.categories.length > 0) {
        filtered = filtered.filter(article => pref.categories.includes(article.category));
      }
    }
    setFilteredArticles(filtered);
  }, [articles]);

  // const applyFilters = (search, category, source, date, pref) => {

  // }

  useEffect(() => {
    applyFilters(selectedSearch, selectedCategory, selectedSource, selectedDate, userPreferences);
  }, [selectedSearch, selectedCategory, selectedSource, selectedDate, articles, userPreferences, applyFilters]);

  const handleSavePreferences = preferences => {
    saveUserPreferences(preferences);
    setUserPreferences(preferences)
  };


  return (
    <div className='app-container'>
      <h3>Frontend Take-Home Challenge</h3>
      {loading ? (
        <>
          <div className='data-loading'>
            <p>Please wait, Data is loading...</p>
          </div>
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div class="container text-center">
            <div class="row">
              <div class="col-6">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div class="col-6">
                <FilterByDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
              </div>
            </div>
            <div class="row select-container">
              <Filter
                setSelectedCategory={setSelectedCategory}
                setSelectedSource={setSelectedSource}
                categories={categories}
                sources={sources}
              />
            </div>
          </div>
          <div className="container">
            <SettingsPage sources={sources} categories={categories} onSave={handleSavePreferences} />
            <hr />
            {filteredArticles.length === 0 ? (
              <div className='data-not-match'>
                <p>Sorry! Results are not matching. Please try again</p>
              </div>
            ) : (
              <ArticleList articles={filteredArticles} />
            )}
          </div>
        </>
      )}

    </div>
  );
}

export default App;

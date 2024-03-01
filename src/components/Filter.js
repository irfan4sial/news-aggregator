import React from 'react';

const Filter = ({setSelectedCategory, setSelectedSource, categories, sources }) => {
  
  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  const handleSourceChange = event => {
    setSelectedSource(event.target.value);
  };

  return (
    <>
      <div class="col-6">
        <select onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div class="col-6">
        <select onChange={handleSourceChange}>
          <option value="">Select Source</option>
          {sources.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Filter;

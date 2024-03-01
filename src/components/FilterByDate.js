import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterByDate = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className='filter-date'>
      <DatePicker placeholderText='Filters By Date' className="date-picker" selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
    </div>
  );
}

export default FilterByDate;

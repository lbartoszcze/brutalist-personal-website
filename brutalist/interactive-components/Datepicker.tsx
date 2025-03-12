import React, { useState, useRef, useEffect } from 'react';

// Helper functions for date operations
const daysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const getDayNames = (short: boolean = false) => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return short ? dayNames.map(day => day.substring(0, 3)) : dayNames;
};

const getMonthNames = (short: boolean = false) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return short ? monthNames.map(month => month.substring(0, 3)) : monthNames;
};

const formatDate = (date: Date, format: string = 'yyyy-MM-dd') => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return format
    .replace('yyyy', year.toString())
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('dd', day.toString().padStart(2, '0'));
};

const parseDate = (dateString: string, format: string = 'yyyy-MM-dd'): Date | null => {
  if (!dateString) return null;
  
  const yearIndex = format.indexOf('yyyy');
  const monthIndex = format.indexOf('MM');
  const dayIndex = format.indexOf('dd');
  
  if (yearIndex === -1 || monthIndex === -1 || dayIndex === -1) {
    return null;
  }
  
  const year = parseInt(dateString.substring(yearIndex, yearIndex + 4), 10);
  const month = parseInt(dateString.substring(monthIndex, monthIndex + 2), 10) - 1;
  const day = parseInt(dateString.substring(dayIndex, dayIndex + 2), 10);
  
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }
  
  const date = new Date(year, month, day);
  return date;
};

// DatePicker component
interface DatepickerProps {
  selectedDate?: Date;
  onChange?: (date: Date) => void;
  dateFormat?: string;
  placeholder?: string;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  required?: boolean;
  variant?: 'default' | 'bordered' | 'cutout';
  size?: 'small' | 'medium' | 'large';
  error?: string;
  clearable?: boolean;
  className?: string;
}

export const Datepicker: React.FC<DatepickerProps> = ({
  selectedDate,
  onChange,
  dateFormat = 'yyyy-MM-dd',
  placeholder = 'Select date',
  label,
  minDate,
  maxDate,
  disabled = false,
  required = false,
  variant = 'default',
  size = 'medium',
  error,
  clearable = true,
  className = '',
}) => {
  // State for the calendar UI
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selectedDate?.getMonth() || new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate?.getFullYear() || new Date().getFullYear());
  const [inputValue, setInputValue] = useState(selectedDate ? formatDate(selectedDate, dateFormat) : '');
  
  // Refs for handling outside clicks
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Update the input value when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setInputValue(formatDate(selectedDate, dateFormat));
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    } else {
      setInputValue('');
    }
  }, [selectedDate, dateFormat]);
  
  // Handle outside clicks to close the calendar
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        calendarRef.current && 
        !calendarRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);
  
  // Size classes
  const sizeClasses = {
    small: 'h-8 px-2 text-sm',
    medium: 'h-10 px-3 text-base',
    large: 'h-12 px-4 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    default: 'border-2 border-black bg-white',
    bordered: 'border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    cutout: 'border-2 border-black bg-white transform rotate-[-0.5deg]',
  };
  
  // Generate calendar grid cells
  const generateCalendarCells = () => {
    const days = daysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const cells = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= days; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth && 
        selectedDate.getFullYear() === currentYear;
      
      const isDisabled = 
        (minDate && date < minDate) || 
        (maxDate && date > maxDate);
      
      const isToday = 
        date.getDate() === new Date().getDate() && 
        date.getMonth() === new Date().getMonth() && 
        date.getFullYear() === new Date().getFullYear();
      
      cells.push(
        <button
          key={`day-${day}`}
          className={`
            h-8 w-8 font-mono flex items-center justify-center
            ${isDisabled ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
            ${isSelected ? 'bg-black text-white' : ''}
            ${isToday && !isSelected ? 'border border-black' : ''}
          `}
          onClick={() => handleDateSelect(date)}
          disabled={isDisabled}
        >
          {day}
        </button>
      );
    }
    
    return cells;
  };
  
  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (onChange) {
      onChange(date);
    }
    setIsOpen(false);
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Try to parse the entered date
    const parsedDate = parseDate(value, dateFormat);
    if (parsedDate && onChange) {
      onChange(parsedDate);
    }
  };
  
  // Handle calendar navigation
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Handle clearing the date
  const handleClear = () => {
    setInputValue('');
    if (onChange) {
      onChange(null as any);
    }
  };
  
  // Generate month and year options for select dropdowns
  const yearOptions = [];
  const startYear = minDate ? minDate.getFullYear() : currentYear - 10;
  const endYear = maxDate ? maxDate.getFullYear() : currentYear + 10;
  
  for (let year = startYear; year <= endYear; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label className="block mb-1 font-mono">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      
      {/* Input field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(true)}
          className={`
            w-full font-mono
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${error ? 'border-red-600' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          readOnly
        />
        
        {/* Calendar icon */}
        <div 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        
        {/* Clear button */}
        {clearable && inputValue && !disabled && (
          <button
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
            onClick={handleClear}
            type="button"
          >
            ×
          </button>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 font-mono">
          {error}
        </p>
      )}
      
      {/* Calendar dropdown */}
      {isOpen && (
        <div 
          ref={calendarRef}
          className={`
            absolute z-10 mt-1 p-4 bg-white border-2 border-black
            ${variant === 'bordered' ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : ''}
            ${variant === 'cutout' ? 'transform rotate-[-0.5deg]' : ''}
          `}
          style={{ width: '280px' }}
        >
          {/* Month and year navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              className="px-2 py-1 border-2 border-black font-mono hover:bg-gray-100"
              onClick={goToPreviousMonth}
            >
              ❮
            </button>
            
            <div className="flex space-x-2">
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(parseInt(e.target.value, 10))}
                className="border-2 border-black px-2 py-1 font-mono"
              >
                {getMonthNames().map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(parseInt(e.target.value, 10))}
                className="border-2 border-black px-2 py-1 font-mono"
              >
                {yearOptions}
              </select>
            </div>
            
            <button
              className="px-2 py-1 border-2 border-black font-mono hover:bg-gray-100"
              onClick={goToNextMonth}
            >
              ❯
            </button>
          </div>
          
          {/* Day names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {getDayNames(true).map((day) => (
              <div 
                key={day} 
                className="h-8 font-mono text-sm flex items-center justify-center font-bold"
              >
                {day.charAt(0)}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarCells()}
          </div>
          
          {/* Today button */}
          <div className="mt-4 flex justify-center">
            <button
              className="px-3 py-1 border-2 border-black font-mono text-sm hover:bg-gray-100"
              onClick={() => handleDateSelect(new Date())}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Date range picker component
interface DateRangePickerProps extends Omit<DatepickerProps, 'selectedDate' | 'onChange'> {
  startDate?: Date;
  endDate?: Date;
  onChangeStart?: (date: Date) => void;
  onChangeEnd?: (date: Date) => void;
  onChange?: (startDate: Date, endDate: Date) => void;
  startLabel?: string;
  endLabel?: string;
  separator?: React.ReactNode;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
  onChange,
  startLabel = 'Start date',
  endLabel = 'End date',
  separator = '—',
  dateFormat = 'yyyy-MM-dd',
  minDate,
  maxDate,
  disabled = false,
  required = false,
  variant = 'default',
  size = 'medium',
  error,
  className = '',
}) => {
  // Handle start date change
  const handleStartDateChange = (date: Date) => {
    if (onChangeStart) {
      onChangeStart(date);
    }
    
    if (onChange && endDate) {
      onChange(date, endDate);
    }
  };
  
  // Handle end date change
  const handleEndDateChange = (date: Date) => {
    if (onChangeEnd) {
      onChangeEnd(date);
    }
    
    if (onChange && startDate) {
      onChange(startDate, date);
    }
  };
  
  return (
    <div className={`${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <Datepicker
            selectedDate={startDate}
            onChange={handleStartDateChange}
            dateFormat={dateFormat}
            label={startLabel}
            minDate={minDate}
            maxDate={endDate || maxDate}
            disabled={disabled}
            required={required}
            variant={variant}
            size={size}
            error={error}
          />
        </div>
        
        <div className="hidden sm:flex items-center justify-center">
          <span className="font-mono">{separator}</span>
        </div>
        
        <div className="flex-1">
          <Datepicker
            selectedDate={endDate}
            onChange={handleEndDateChange}
            dateFormat={dateFormat}
            label={endLabel}
            minDate={startDate || minDate}
            maxDate={maxDate}
            disabled={disabled}
            required={required}
            variant={variant}
            size={size}
            error={error}
          />
        </div>
      </div>
      
      {/* Error message (if not displayed in individual datepickers) */}
      {error && (
        <p className="mt-1 text-sm text-red-600 font-mono">
          {error}
        </p>
      )}
    </div>
  );
};

export const DatepickerExamples: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );
  
  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-3xl font-mono font-bold mb-6 uppercase">Datepicker</h2>
      <p className="mb-8 font-sans">
        Date selection components with brutalist styling for selecting single dates or date ranges.
      </p>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Basic Datepicker</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Datepicker
                label="Select a date"
                selectedDate={selectedDate}
                onChange={setSelectedDate}
                placeholder="YYYY-MM-DD"
              />
            </div>
            
            <div className="p-4 border-2 border-black">
              <p className="font-mono">
                Selected date: {selectedDate ? formatDate(selectedDate) : 'None'}
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Datepicker Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Datepicker
                label="Default"
                variant="default"
                placeholder="YYYY-MM-DD"
              />
            </div>
            
            <div>
              <Datepicker
                label="Bordered"
                variant="bordered"
                placeholder="YYYY-MM-DD"
              />
            </div>
            
            <div>
              <Datepicker
                label="Cutout"
                variant="cutout"
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Datepicker Sizes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Datepicker
                label="Small"
                size="small"
                placeholder="YYYY-MM-DD"
              />
            </div>
            
            <div>
              <Datepicker
                label="Medium (default)"
                size="medium"
                placeholder="YYYY-MM-DD"
              />
            </div>
            
            <div>
              <Datepicker
                label="Large"
                size="large"
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Datepicker States</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Datepicker
                label="With error"
                error="This date is required"
                placeholder="YYYY-MM-DD"
              />
            </div>
            
            <div>
              <Datepicker
                label="Disabled"
                disabled
                placeholder="YYYY-MM-DD"
              />
            </div>
            
            <div>
              <Datepicker
                label="Required"
                required
                placeholder="YYYY-MM-DD"
              />
            </div>
            
            <div>
              <Datepicker
                label="With date format"
                dateFormat="MM/dd/yyyy"
                placeholder="MM/DD/YYYY"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Date Range Picker</h3>
          <div className="space-y-6">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onChangeStart={setStartDate}
              onChangeEnd={setEndDate}
              startLabel="Check-in"
              endLabel="Check-out"
              required
            />
            
            <div className="p-4 border-2 border-black">
              <p className="font-mono">
                Selected range: {startDate ? formatDate(startDate) : 'None'} to {endDate ? formatDate(endDate) : 'None'}
              </p>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <DateRangePicker
                  variant="bordered"
                  startLabel="From"
                  endLabel="To"
                  separator="→"
                />
              </div>
              
              <div>
                <DateRangePicker
                  variant="cutout"
                  dateFormat="MM/dd/yyyy"
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-mono font-bold mb-4 uppercase">Date Constraints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Datepicker
                label="Min date (today)"
                minDate={new Date()}
                placeholder="YYYY-MM-DD"
              />
            </div>
            
            <div>
              <Datepicker
                label="Max date (today + 30 days)"
                maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
                placeholder="YYYY-MM-DD"
              />
            </div>
            
            <div>
              <Datepicker
                label="Date range (next 7 days)"
                minDate={new Date()}
                maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
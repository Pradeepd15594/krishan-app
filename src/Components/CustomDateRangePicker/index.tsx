import React, {useRef} from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { FormControl, InputLabel } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { PickersShortcutsItem } from '@mui/x-date-pickers';
import { DateRange, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';

interface DateRangeModel{
    onChange:(e:any)=>void;
}

const CustomDateRangePicker=({onChange}:DateRangeModel)=> {
  const range:any=useRef({startDate:"", endDate:""})

  const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
    {
      label: 'This Week',
      getValue: () => {
        const today = dayjs();
        return [today.startOf('week'), today.endOf('week')];
      },
    },
    {
      label: 'Last Week',
      getValue: () => {
        const today = dayjs();
        const prevWeek = today.subtract(7, 'day');
        return [prevWeek.startOf('week'), prevWeek.endOf('week')];
      },
    },
    {
      label: 'Last 7 Days',
      getValue: () => {
        const today = dayjs();
        return [today.subtract(7, 'day'), today];
      },
    },
    {
      label: 'Current Month',
      getValue: () => {
        const today = dayjs();
        return [today.startOf('month'), today.endOf('month')];
      },
    },
    {
      label: 'Next Month',
      getValue: () => {
        const today = dayjs();
        const startOfNextMonth = today.endOf('month').add(1, 'day');
        return [startOfNextMonth, startOfNextMonth.endOf('month')];
      },
    },
    { label: 'Reset', getValue: () => [null, null] },
  ];


  const dateRangePickerOpened = () => {
    setTimeout(() => {
      const elements = document.getElementsByClassName('MuiDateRangeCalendar-root');
      if (elements.length > 0) {
        // Get the first element in the HTMLCollection
        const firstElement = elements[0];
        // Find the first div inside this element
        const firstDiv = firstElement.querySelector('div'); // This selects the first <div> inside the element
        if (firstDiv) {
          // Remove the text content of the first <div>
          firstDiv.textContent = ''; // Clears the text inside the div
        }
      }
    }, 10);
  }


    // Function to handle date range changes
    const handleDateChange = (newValue: [Dayjs | null, Dayjs | null]) => {
      const [startDate, endDate] = newValue;
      range.current={
        startDate:startDate ? startDate.format('YYYY-MM-DD') : '',
        endDate:endDate ? endDate.format('YYYY-MM-DD') : ''
      };
    };


    // Function to handle date range changes
    const searchDate = () => {
      // const [startDate, endDate] = range.current;
       // Only trigger action if end date is selected
      if(range.current.startDate && range.current.endDate) {
        console.log('Start Date:', range.current.startDate);
        console.log('End Date:', range.current.endDate);
        onChange(range.current);
      }
    };
  


  return (
    <FormControl fullWidth style={{ marginTop: '-15px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateRangePicker']}>
          <DateRangePicker
            onOpen={() => dateRangePickerOpened()}
            onChange={handleDateChange}
            onClose={()=>searchDate()}
            localeText={{ start: "", end: "" }}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '14px', // Slightly larger font size for input field
                height: '35px', // Slightly taller input field
                width: '100%', // Full width for better fit
                borderRadius: '8px', // Rounded corners
                backgroundColor: '#fff', // White background for the input
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for the input
              },
              '& .MuiInputBase-input': {
                padding: '0px 12px', // Adjust padding inside input field
              },
              '& .MuiPickersDay-root': {
                fontSize: '14px', // Adjust font size inside the calendar
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2', // Custom border color (MUI primary blue)
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </FormControl>
  )
}

export default CustomDateRangePicker;
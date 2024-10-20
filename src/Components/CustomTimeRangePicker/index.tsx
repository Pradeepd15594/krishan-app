import React, { useRef } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { FormControl } from '@mui/material';
import dayjs from 'dayjs';

interface TimeRangeModel {
  startTime: any;
  endTime: any;
  onChange: (e: any) => void;
  sx: any;
}

const CustomTimeRangePicker = ({ startTime, endTime, onChange, sx }: TimeRangeModel) => {
  const timeRange = useRef({ startTime: '', endTime: '' });

  const handleTimeChange = (date: any | null, type: string) => {
    if (date && type === 'start') {
      timeRange.current['startTime'] = dayjs(date).format('HH:mm');
    }

    if (date && type === 'end') {
      timeRange.current['endTime'] = dayjs(date).format('HH:mm');
    }

    if (timeRange.current['startTime'] && timeRange.current['endTime']) {
      onChange(timeRange.current);
    }
  };

  return (
    <FormControl fullWidth style={{ marginTop: '-15px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker', 'TimePicker']}>
          <TimePicker
            label="Start Time"
            value={startTime}
            onChange={(newValue: any) => handleTimeChange(newValue, 'start')}
            sx={sx}
          />
          <TimePicker
            label="End Time"
            value={endTime}
            onChange={(newValue: any) => handleTimeChange(newValue, 'end')}
            sx={sx}
          />
        </DemoContainer>
      </LocalizationProvider>
    </FormControl>
  );
};

export default CustomTimeRangePicker;
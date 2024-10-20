import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewClass, getGuruListData } from './../../Redux/Actions/SagaAction';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Select, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomTimeRangePicker from './../../Components/CustomTimeRangePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const CreateClass = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const guruList = useSelector((state: any) => state.AppReducer.guruList);
  const isLoading = useSelector((state: any) => state.AppReducer.isLoading);

  useEffect(() => {
    dispatch(getGuruListData());
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    guruName: Yup.string().required('Guru Name is required'),
    name: Yup.string().required('Class Name is required'),
    description: Yup.string().required('Description is required'),
    startDateTime: Yup.date().nullable().required('Start Time is required'),
    endDateTime: Yup.date()
      .nullable()
      .required('End Time is required')
      .min(Yup.ref('startDateTime'), 'End Time cannot be before Start Time'),
  });

  const handleSubmit = (values: any) => {
    const { name, description, guruName, startDateTime, endDateTime } = values;
  
    // Convert start and end times to IST and format as ISO strings
    const body = {
      className: name,
      description,
      guruName,
      startDateTime: dayjs.utc(startDateTime).tz('Asia/Kolkata').toISOString(), // Convert to ISO string
      endDateTime: dayjs.utc(endDateTime).tz('Asia/Kolkata').toISOString(),     // Convert to ISO string
    };
  
    dispatch(addNewClass(body));
  };

  return (
    <div style={{ padding: '15px' }}>
      <Formik
        initialValues={{
          guruName: '',
          name: '',
          description: '',
          startDateTime: null as Date | null,
          endDateTime: null as Date | null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            {/* Guru Name Dropdown */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="guruName-label">Select Guru</InputLabel>
              <Field
                name="guruName"
                as={Select}
                label="Select Guru"
                labelId="guruName-label"
                value={values.guruName}
                onChange={(event: any) => setFieldValue('guruName', event.target.value)}
                input={<OutlinedInput label="Select Guru" />}
                error={touched.guruName && !!errors.guruName}
              >
                {guruList.map((guru: any) => (
                  <MenuItem key={guru.id} value={guru.name}>
                    {guru.name}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage name="guruName" component="div" />
            </FormControl>

            {/* Class Name */}
            <div style={{ marginBottom: '15px' }}>
              <Field
                as={TextField}
                name="name"
                label="Class Name"
                fullWidth
                error={touched.name && !!errors.name}
                helperText={<ErrorMessage name="name" component="div" />}
                sx={{ width: '100%', marginBottom: 2 }}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '15px' }}>
              <Field
                as={TextField}
                name="description"
                label="Description"
                multiline
                fullWidth
                error={touched.description && !!errors.description}
                helperText={<ErrorMessage name="description" component="div" />}
                sx={{ width: '100%', marginBottom: 2 }}
              />
            </div>

            {/* Time Picker */}
            <div style={{ marginBottom: '15px' }}>
            <CustomTimeRangePicker
                    startTime={dayjs(values.startDateTime)} // Ensure it's a Dayjs object
                    endTime={dayjs(values.endDateTime)}     // Ensure it's a Dayjs object
                    onChange={(range) => {
                        const today = dayjs(); // Get today's date

                        // Convert the startTime and endTime (strings) back into Dayjs objects
                        const startDateTime = dayjs(`${today.format('YYYY-MM-DD')} ${range.startTime}`, 'YYYY-MM-DD HH:mm');
                        const endDateTime = dayjs(`${today.format('YYYY-MM-DD')} ${range.endTime}`, 'YYYY-MM-DD HH:mm');

                        // Set the form field values with Dayjs objects (you can convert to Date later)
                        setFieldValue('startDateTime', startDateTime);
                        setFieldValue('endDateTime', endDateTime);

                        console.log({ startDateTime, endDateTime }, 'range-3-range');
                    }}
                    sx={{ width: '100%' }}
                    />
              <div style={{ display: 'flex', color: '#e53835', fontSize: '12px', flexDirection: 'row', justifyContent: 'space-around' }}>
                <ErrorMessage name="startDateTime" component="div" />
                <ErrorMessage name="endDateTime" component="div" />
              </div>
            </div>

            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <Button variant="outlined" type="submit" sx={{ width: '100%', padding: 2 }}>
                Create Class
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateClass;
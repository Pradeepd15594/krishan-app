import React, { useEffect, useRef, useState } from 'react';
import MainCard from './../../Components/MainCard';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';
import { getStudentList, getStudentsTimelineByStudentId } from './../../Redux/Actions/SagaAction';
import { useDispatch, useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { StudentTimelineModel } from '../../Redux/Reducers/Models/Reducers.Model';
import CourseTimeline from './../../Components/CourseTimeline'
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { SearchOutlined } from '@mui/icons-material';
import CustomDateRangePicker from '../../Components/CustomDateRangePicker';

const ManageStudents = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({ pageNo: 0, perPage: 10 });
  const [value, setValue] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);
  const tempDateData=useRef(null);

  // Get studentList and totalStudentCount from Redux store
  const studentList: any[] = useSelector((state: any) => state.AppReducer.studentList);
  const totalStudentCount: number = useSelector((state: any) => state.AppReducer.totalStudentCount);
  const studentTimelineList: StudentTimelineModel[] = useSelector((state: any) => state.AppReducer.studentTimelineList);
  const [openUserData, setOpenUserData] = useState({ studentId: "", openPopup: false });
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    dispatch(getStudentList(pagination)); // Fetch data on mount and when pagination changes
  }, [pagination, dispatch]);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination((prev) => ({ ...prev, pageNo: newPage }));
  };


  const handleUserInfo = (studentId: string) => {
    setOpenUserData({ studentId: studentId, openPopup: true });
  };

  useEffect(() => {
    dispatch(getStudentsTimelineByStudentId(openUserData.studentId)); // Fetch data on mount and when pagination changes
  }, [openUserData.studentId]);

  const closeUserInfo = () => {
    setOpenUserData((prev: any) => ({ ...prev, openPopup: false }));
  };

  const columns: readonly string[] = ["#", "Student Name", "Mobile", "Address", "Date", "Action"];

  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={7}>
          <div role="presentation" style={{ marginBottom: 20 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Manage Students
              </Link>
              <Typography sx={{ color: 'text.primary' }}>Students List</Typography>
            </Breadcrumbs>
          </div>
        </Grid>
        <Grid size={5}>
          {/* Date Range Picker can be added here */}

          <div style={{display:'flex', flexDirection:'row', justifyContent:'center', gap:'10px', alignItems:'center'}}>
          <div style={{maxWidth:270}}>
            <CustomDateRangePicker onChange={(e: any) => { tempDateData.current=e; }} />
          </div>
          <Button style={{marginTop:-7}} variant="outlined">Search</Button>

          </div>
          {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            size={'small'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  // onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                   <SearchOutlined />
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl> */}
        </Grid>
        {/* <Grid size={2}>
          <Button style={{ marginTop: '-7.5px' }} variant="outlined" onClick={createNewStudent}>
            Create Student
          </Button>
        </Grid> */}
      </Grid>

      <MainCard title="" content={false} border={true} boxShadow={true}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index: number) => (
                  <TableCell
                    key={`col-id-${index}`}
                    align={'left'}
                    sx={[
                      {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        paddingY: '10px',
                      },
                      index === 0 ? { maxWidth: 40, paddingRight: 0 } : { maxWidth: 300 },
                    ]}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {studentList.map((item: any, index: number) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                  <TableCell sx={{ maxWidth: 40, paddingRight: 0, paddingY: '6px' }} align={'left'}>
                    {pagination.pageNo * pagination.perPage + index + 1}
                  </TableCell>
                  <TableCell sx={{ paddingY: '6px' }} align={'left'}>
                    {item.fullName}
                  </TableCell>
                  <TableCell sx={{ paddingY: '6px' }} align={'left'}>
                    {item.mobile}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300, paddingY: '6px' }} align={'left'}>
                    <Typography noWrap>{item.address}</Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: '6px' }} align={'left'}>
                    {dayjs(item.startDateTime).format('DD-MMM, YYYY h:mm A')} to {dayjs(item.endDateTime).format('h:mm A')}
                  </TableCell>
                  <TableCell align={'left'} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingY: '6px' }}>
                    <IconButton size={'medium'} onClick={() => handleUserInfo(item._id)} sx={{ color: theme.palette.info.light }}>
                      <RemoveRedEye sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton size={'medium'} sx={{ color: theme.palette.error.light }}>
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          className="custom-pagination"
          count={totalStudentCount} // Total number of rows from the Redux store
          rowsPerPage={pagination.perPage}
          page={pagination.pageNo}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[]}
        // onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>

      <Dialog
        fullScreen={fullScreen}
        open={openUserData.openPopup}
        onClose={closeUserInfo}
        aria-labelledby="responsive-dialog-title"
        maxWidth={'xl'}
      >
        <DialogTitle id="responsive-dialog-title">
          <Typography variant="h6" color="primary" gutterBottom>Participated in Classes—</Typography>
        </DialogTitle>
        <DialogContent style={{width:760}}>
          {/* Dialog content can be placed here */}
          <CourseTimeline data={studentTimelineList} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUserInfo} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageStudents;
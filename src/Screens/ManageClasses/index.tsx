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
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import dayjs, { Dayjs } from 'dayjs';
import { getClassListByDateRange, getClassListByDate } from './../../Redux/Actions/SagaAction'
import { useDispatch, useSelector } from 'react-redux';
import { ClassListModel } from '../../Redux/Reducers/Models/Reducers.Model';
import CustomDateRangePicker from './../../Components/CustomDateRangePicker'
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import CreateClass from './CreateClass';

const ManageClasses = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  // Get classList from Redux store
  const classList: ClassListModel[] = useSelector((state: any) => state.AppReducer.classListByDate);
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    let date = new Date();
    dispatch(getClassListByDate(date));
  }, [dispatch]);


  const handleToggle = () => {
    setOpen(!open);
  };


  const createNewClass = () => {
    setOpen(!open);
  };

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page
  };

  // Slice the classList based on current page and rowsPerPage
  const paginatedClasses = classList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const columns: readonly string[] = ["#", "Class Name", "Description", "Class Cancelled", "Date", "Action"];

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={7}>
          <div role="presentation" onClick={handleClick} style={{ marginBottom: 20 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">Manage&nbsp;Class</Link>
              <Typography sx={{ color: 'text.primary' }}>Class List</Typography>
            </Breadcrumbs>
          </div>
        </Grid>
        <Grid size={3}>
          <CustomDateRangePicker onChange={(e: any) => { dispatch(getClassListByDateRange(e)) }} />
        </Grid>
        <Grid size={2}>
          <Button
            style={{ marginTop: '-7.5px' }}
            variant="outlined"
            onClick={createNewClass}>Create&nbsp;Class</Button>
        </Grid>
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
                    sx={{
                      minWidth: 100,
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedClasses.map((item: any, index: number) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                  <TableCell align={'left'}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell align={'left'}>{item.className}</TableCell>
                  <TableCell align={'left'}>{item.description}</TableCell>
                  <TableCell align={'left'}>
                    <Chip size={'small'} style={{ width: '55px' }} label={item.isClassCanceled ? ' Yes ' : ' No '} variant="outlined" /></TableCell>
                  <TableCell align={'left'}>{dayjs(item.startDateTime).format('DD-MMM, YYYY h:mm A')} to {dayjs(item.endDateTime).format('h:mm A')}</TableCell>
                  <TableCell align={'left'} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton onClick={handleToggle} sx={{ color: theme.palette.info.light }}>
                      <RemoveRedEye />
                    </IconButton>
                    <IconButton sx={{ color: theme.palette.error.light }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}


              {paginatedClasses.length == 0 ? (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell colSpan={6} align={'left'}>
                    <div style={{ height: '450px', textAlign: 'center' }}>
                      <img style={{ height: '200px', marginTop: '100px' }} src={`${process.env.PUBLIC_URL}/Imgs/k1.png`} />
                      <Typography style={{ width: '50%', marginLeft: '25%', fontWeight: '600', textAlign: 'center' }}>Hare Krishna, No Classes Found.</Typography>
                      <Typography style={{ width: '50%', fontSize: '13px', marginLeft: '25%', textAlign: 'center' }}>Please check back later for upcoming spiritual sessions, or adjust your search criteria to find the perfect class for your journey.</Typography>
                    </div>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={classList.length} // Total number of rows
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>


      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleToggle}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <CreateClass />
          {/* <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleToggle}>
            Disagree
          </Button>
          <Button onClick={handleToggle} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageClasses;
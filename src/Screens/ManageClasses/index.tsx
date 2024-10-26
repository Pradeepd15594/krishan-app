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
import React, { useEffect, useRef, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import dayjs, { Dayjs } from 'dayjs';
import { cleanRedirect, getAttandanceListBYClassSelect, getClassWithPaginationAndDate } from './../../Redux/Actions/SagaAction'
import { useDispatch, useSelector } from 'react-redux';
import { AttandanceListOfClassModel, ClassListModel } from '../../Redux/Reducers/Models/Reducers.Model';
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
import { EditOutlined } from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { styled } from '@mui/system';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';


const ClampedTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: 2,  // Limit to 2 lines
  textOverflow: 'ellipsis', // Adds "..." for overflow text
  fontSize:12
});

const ManageClasses = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [viewInfo, setViewInfo] = useState({ show: false, className: "", description:""});
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [pagination, setPagination] = useState({ pageNo: 0, perPage: 10 });
  // Get classList from Redux store
  const totalClassCount: number = useSelector((state: any) => state.AppReducer.totalClassCount);
  const isLoading: boolean = useSelector((state: any) => state.AppReducer.isLoading);
  const redirect: string = useSelector((state: any) => state.AppReducer.redirect);
  const classList: ClassListModel[] = useSelector((state: any) => state.AppReducer.classListByDate);
  const attandanceListOfClass: AttandanceListOfClassModel[] = useSelector((state: any) => state.AppReducer.attandanceListOfClass);
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const tempDateData = useRef({ startDate: "", endDate: "" });

  useEffect(() => {
    let date = new Date();
    const obj: any = {
      pagination: pagination,
      body: tempDateData.current
    }
    dispatch(getClassWithPaginationAndDate(obj));
  }, [pagination]);


  useEffect(() => {
    if(redirect==='back'){
      setOpen(!open);
      // document.getElementById('closeBtn')?.click()
      const obj: any = {
        pagination: pagination,
        body: tempDateData.current
      }
      
      dispatch(getClassWithPaginationAndDate(obj));
      setTimeout(() => {
        dispatch(cleanRedirect());
      }, 500);
    };
  }, [redirect]);




  const handleToggle = () => {
    setOpen(!open);
  };


  const createNewClass = () => {
    setOpen(!open);
  };

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination((prev) => ({ ...prev, pageNo: newPage }));
  };


  // View Details
  const viewDetails = (item: any) => {
    dispatch(getAttandanceListBYClassSelect(item?._id));
    setViewInfo({ show: true, ...item })
  };
  // handleClose Details
  const handleClose = () => {
    setViewInfo({ show: false, className: "", description:"" })
  };


  // Handle page change
  const searchByDate = (e: any) => {
    tempDateData.current = e;
    const obj: any = {
      pagination: pagination,
      body: tempDateData.current
    }
    dispatch(getClassWithPaginationAndDate(obj));
  }




  // Slice the classList based on current page and rowsPerPage
  const paginatedClasses = classList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const columns: readonly string[] = ["#", "Class Name","Date", "Action"];

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
          <CustomDateRangePicker onChange={(e: any) => { searchByDate(e); }} />
        </Grid>
        <Grid size={2}>
          <Button
            style={{ marginTop: '-7.5px' }}
            variant="outlined"
            onClick={createNewClass}>Create&nbsp;Class</Button>
        </Grid>
      </Grid>

      <MainCard title="" content={false} border={true} boxShadow={true}>
        <TableContainer sx={{ maxHeight: 590 }}>
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
              {paginatedClasses.map((item: any, index: number) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={item._id}>
                  <TableCell sx={{ maxWidth: 40, paddingRight: 0, paddingY: '6px' }} align={'left'}>
                    {pagination.pageNo * pagination.perPage + index + 1}
                  </TableCell>
                  <TableCell align={'left'} sx={{ paddingY: '6px' }}>{item.className}</TableCell>

                  <TableCell align={'left'} sx={{ paddingY: '6px' }}>{dayjs(item.startDateTime).format('DD-MMM, YYYY h:mm A')} to {dayjs(item.endDateTime).format('h:mm A')}</TableCell>
                  <TableCell align={'left'} sx={{ paddingY: '6px', display: 'flex', justifyContent: 'center' }}>
                    <IconButton onClick={() => viewDetails(item)} size={'medium'} sx={{ color: theme.palette.info.light }}>
                      <RemoveRedEye sx={{ fontSize: 16 }} />
                    </IconButton>
                    {/* <IconButton onClick={handleToggle} size={'medium'} sx={{ color: theme.palette.error.light }}>
                      <EditOutlined sx={{ fontSize: 16 }} />
                    </IconButton> */}
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
       
        {paginatedClasses.length ? (
          <TablePagination
            component="div"
            className="custom-pagination"
            count={totalClassCount} // Total number of rows from the Redux store
            rowsPerPage={pagination.perPage}
            page={pagination.pageNo}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[]}
          />
        ):null}
       
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
        </DialogContent>
      </Dialog>



      <Dialog
        fullScreen={false}
        open={viewInfo.show}
        onClose={handleClose}
        sx={{borderRadius:24, overflow:'hidden'}}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Student Attendance Class (<b>{viewInfo?.className}</b>)</DialogTitle>
        <DialogContent sx={{ minWidth: 580, minHeight: 450 }}>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', border: '1px solid #ddd', justifyContent: 'space-between', backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, padding: '5px 15px', borderRadius: 5 }} >
            <div>Total No of Present Students  </div>
            <div><Chip label={attandanceListOfClass.length} color="primary" /></div>

          </div>
          <div style={{height:15}}></div>
          <Divider/>
          <div style={{height:10}}></div>

          <div style={{display:'flex', flexDirection:'row',}}>
          <Typography style={{fontSize:14}} variant={'h6'}>About Class:-</Typography>
          <Typography style={{fontSize:14}}>&nbsp;&nbsp;{viewInfo?.description}</Typography>
          </div>
          <div style={{height:12}}></div>
          <Divider/>

          {isLoading ? (
            <div style={{
              display:'flex', 
              justifyContent:'center', 
              alignItems:'center',
              flexDirection:'column',
              textAlign:'center', marginTop:25, position:'relative'
            }}>
              <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  sx={(theme) => ({
                    color: '#1a90ff',
                    animationDuration: '550ms',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                      strokeLinecap: 'round',
                    },
                    ...theme.applyStyles('dark', {
                      color: '#308fe8',
                    }),
                  })}
                  size={35}
                  thickness={4}
                  // {...props}
                />
                Loading...
            </div>
          ):null}
          <List dense={false}>
            {attandanceListOfClass.map((item: any) => (
              <React.Fragment>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{item.fullName.substr(0, 1)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.fullName}
                    secondary={`+91-${item.mobile}, ${item.email}`}
                  />
                </ListItem>
                <Divider variant={'inset'} />
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageClasses;
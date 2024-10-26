import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewClass, getGuruListData , getCountDashboardData} from './../../Redux/Actions/SagaAction';
import { CountDashboardDataModel } from '../../Redux/Reducers/Models/Reducers.Model';
import DashboardCountCard from './DashboardCountCard';
// material-ui
// import Typography from '@mui/material/Typography';

// project import
// import MainCard from './../../Components/MainCard';
// import ThemeSwitcher from './../../Components/ThemeSwitcher';


 const Dashboard=()=> {
  const dispatch = useDispatch();
  const countDashboardData: CountDashboardDataModel = useSelector((state: any) => state.AppReducer.countDashboardData);

  useEffect(()=>{
      dispatch(getCountDashboardData());

      console.log(countDashboardData, 'countDashboardData');
      
  },[])
  
  const totalAdmins = '01'; // Replace with actual admin count
  const totalStudents = 200; // Replace with actual student count
  const totalClasses = 15; 


  return (
    <div>
      <div style={{display:'flex', flexDirection:'row', marginTop:80, marginBottom:30, gap:'15px'}}>
      <DashboardCountCard title="Total No of Admin" width={'33%'} count={totalAdmins} imgPath={'k1.png'} bgColor={'rgba(252, 246, 234, 1)'} />
      <DashboardCountCard title="Total No of Student" width={'33%'} count={countDashboardData.totalStudentCount} imgPath={'k2.png'} bgColor={'#001dfc12'} />
      <DashboardCountCard title="Total No of Class Count" width={'33%'}  count={countDashboardData.totalGuruCount} imgPath={'k3.png'} bgColor={'#f52a2a1c'} />
      </div>

      {/* <MainCard title="">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
        reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
        officiate descent molls anim id est labours.
      </Typography>

      <ThemeSwitcher></ThemeSwitcher>
    </MainCard> */}
    </div>
  );
}

export default Dashboard;

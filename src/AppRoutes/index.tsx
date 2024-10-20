
import { createBrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// ==============================|| ROUTING RENDER ||============================== //
let routes:any[]=[LoginRoutes,MainRoutes ];
console.log(process.env.REACT_APP_STORAGE_KEY, 'process.env.STORAGE_KEY');
const result:any=JSON.parse(localStorage.getItem(`${process.env.REACT_APP_STORAGE_KEY}/auth`) || '{}');
if(result && result?._id){
    routes = [MainRoutes, LoginRoutes ]
}
let AppRouter = createBrowserRouter(routes, { basename: process.env.REACT_APP_BASE_NAME });
export default AppRouter;

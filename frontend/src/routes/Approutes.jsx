import {Routes,Route } from 'react-router-dom';
import {Login,SignUp,HomePage,Expenses,Dashboard,Profile} from '../pages'

function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/expenses' element={<Expenses/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
    )
}
export default AppRoutes;
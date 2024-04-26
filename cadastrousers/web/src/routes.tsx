import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'

import TeacherForm from 'pages/TeacherForm';

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
             
                <Route path='/'  Component={TeacherForm}/>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes
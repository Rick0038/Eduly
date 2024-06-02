import { Navigate, Route, Routes } from 'react-router';
import Demo from './Demo';
import NotFound from './NotFound/NotFound';

const RouteSwitcher = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Demo />} />
      <Route path='/test' element={<p>Hello</p>} />
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  );
};

export default RouteSwitcher;

import { Route, Routes } from 'react-router';
import Demo from './Demo';
import NotFound from './NotFound/NotFound';

const RouteSwitcher = () => {
  return (
    <Routes>
      <Route path='/' element={<Demo />} />
      <Route path='*' element={<NotFound />}></Route>
    </Routes>
  );
};

export default RouteSwitcher;

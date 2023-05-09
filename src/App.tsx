import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './main/main';
import Header from './component/header/header';
import AdminPage from './main/adminPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}`} element={<Main />} />
        <Route path={'/admin'} element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

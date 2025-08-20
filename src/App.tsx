import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Layout from './components/structure/layout';
import Sobre from './pages/sobre';
import Faq from './pages/faq';
import Utilizacao from './pages/utilizacao';
import Adequacao from './pages/adequacao';
import NotFound from './pages/NotFound';
import Login from './pages/login';
import Cadastrar from './pages/cadastrar';
import UserDashboard from './pages/user_dashboard';
import CandidateProfile from './pages/candidate_profile';
import PositionsList from './pages/positions_list';
import CompanyDashboard from './pages/company_dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />}/>
          <Route path='/saiba_mais' element={<Sobre />}></Route>
          <Route path='/faq' element={<Faq/>}></Route>
          <Route path='/utilizacao' element={<Utilizacao/>}></Route>
          <Route path='/adequacao' element={<Adequacao/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registrar' element={<Cadastrar/>}></Route>
          <Route path='/vagas' element={<PositionsList/>}></Route>
          <Route path='/usuarios/candidatos/:id/dashboard' element={<UserDashboard/>}></Route>
          <Route path='/usuarios/candidatos/:id/perfil' element={<CandidateProfile/>}></Route>
          <Route path='/usuarios/empresas/:id/dashboard' element={<CompanyDashboard/>}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

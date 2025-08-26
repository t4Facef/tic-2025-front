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
import UserProfile from './pages/user_profile';
import PositionsList from './pages/positions_list';
import CompanyDashboard from './pages/company_dashboard';
import AuthEntry from './pages/auth_entry';
import CompanyProfile from './pages/company_profile';
import CreateJobPosition from './pages/create_job_position';

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
          <Route path='/autenticacao' element={<AuthEntry/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registrar' element={<Cadastrar/>}></Route>
          <Route path='/vagas' element={<PositionsList/>}></Route>
          <Route path='/usuarios/candidatos/:id/dashboard' element={<UserDashboard/>}></Route>
          <Route path='/usuarios/candidatos/:id/perfil' element={<UserProfile/>}></Route>
          <Route path='/usuarios/empresas/:id/dashboard' element={<CompanyDashboard/>}></Route>
          <Route path='/usuarios/empresas/:id/perfil' element={<CompanyProfile/>}></Route>
          <Route path='/vagas/nova/:id' element={<CreateJobPosition/>}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

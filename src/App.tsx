import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Layout from './components/structure/layout';
import About from './pages/about';
import Faq from './pages/faq';
import Usage from './pages/usage';
import Adaptation from './pages/adaptation';
import NotFound from './pages/NotFound';
import Login from './pages/login';
import Register from './pages/register';
import CandidateDashboard from './pages/candidate_dashboard';
import CandidateProfile from './pages/candidate_profile';
import Jobs from './pages/jobs';
import CompanyDashboard from './pages/company_dashboard';
import AuthEntry from './pages/auth_entry';
import CompanyProfile from './pages/company_profile';
import JobNew from './pages/job_new';
import MainRegister from './pages/main_register';
import { ResetPassword } from './pages/reset_password_main';
import ResetPasswordNew from './pages/reset_passaword_new';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />}/>
          <Route path='/about' element={<About />}></Route>
          <Route path='/faq' element={<Faq/>}></Route>
          <Route path='/usage' element={<Usage/>}></Route>
          <Route path='/adaptation' element={<Adaptation/>}></Route>
          <Route path='/auth/entry' element={<AuthEntry/>}></Route>
          <Route path='/auth/login' element={<Login/>}></Route>
          <Route path='/auth/register/main' element={<MainRegister/>}></Route>
          <Route path='/auth/register/candidates' element={<Register/>}></Route>
          <Route path='/auth/register/companies' element={<Register/>}></Route>
          <Route path='/auth/reset' element={<ResetPassword/>}></Route>
          <Route path='/auth/reset/password' element={<ResetPasswordNew/>}></Route>
          <Route path='/jobs' element={<Jobs/>}></Route>
          <Route path='/candidates/:id/dashboard' element={<CandidateDashboard/>}></Route>
          <Route path='/candidates/:id/profile' element={<CandidateProfile/>}></Route>
          <Route path='/companies/:id/dashboard' element={<CompanyDashboard/>}></Route>
          <Route path='/companies/:id/profile' element={<CompanyProfile/>}></Route>
          <Route path='/jobs/new' element={<JobNew/>}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

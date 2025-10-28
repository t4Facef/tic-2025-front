import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import Home from './pages/home';
import Layout from './components/structure/layout';
import About from './pages/about';
import Faq from './pages/faq';
import Usage from './pages/usage';
import Adaptation from './pages/adaptation';
import NotFound from './pages/NotFound';
import Login from './pages/login';
import RegisterCandidate from './pages/register_candidate';
import RegisterCompanies from './pages/register_companies';
import CandidateDashboard from './pages/candidate_dashboard';
import CandidateProfile from './pages/candidate_profile';
import Jobs from './pages/jobs';
import CompanyDashboard from './pages/company_dashboard';
import AuthEntry from './pages/auth_entry';
import CompanyProfile from './pages/company_profile';
import JobNew from './pages/job_new';
import MainRegister from './pages/main_register';
import RegisterSuccess from './pages/register_success';
import { ResetPassword } from './pages/reset_password_main';
import ResetPasswordNew from './pages/reset_password_new';
import Notification from './pages/notification';
import TestPage from './pages/test';
import JobView from './pages/job_view';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
          <Route path='/auth/register/candidates' element={<RegisterCandidate/>}></Route>
          <Route path='/auth/register/companies' element={<RegisterCompanies/>}></Route>
          <Route path='/auth/register/success' element={<RegisterSuccess/>}></Route>
          <Route path='/auth/password/forgot' element={<ResetPassword/>}></Route>
          <Route path='/auth/password/reset' element={<ResetPasswordNew/>}></Route>
          <Route path='/candidates/dashboard' element={<CandidateDashboard/>}></Route>
          <Route path='/candidates/profile' element={<CandidateProfile/>}></Route>
          <Route path='/candidates/:id/profile' element={<CandidateProfile/>}></Route>
          <Route path='/companies/dashboard' element={<CompanyDashboard/>}></Route>
          <Route path='/companies/profile' element={<CompanyProfile/>}></Route>
          <Route path='/companies/:id/profile' element={<CompanyProfile/>}></Route>
          <Route path='/jobs' element={<Jobs/>}></Route>
          <Route path='/jobs/new' element={<JobNew/>}></Route>
          <Route path='/jobs/:id/view' element={<JobView/>}></Route>
          <Route path='/jobs/:id/edit' element={<JobNew/>}></Route>
          <Route path='/notifications' element={<Notification/>}></Route>
          <Route path='/test' element={<TestPage/>}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Layout from './components/structure/layout';
import Sobre from './pages/sobre';
import Faq from './pages/faq';
import Ultilizacao from './pages/ultilizacao';
import Adequacao from './pages/adequacao';
import NotFound from './pages/NotFound';
import Login from './pages/login';
import Cadastrar from './pages/cadastrar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />}/>
          <Route path='/saiba_mais' element={<Sobre />}></Route>
          <Route path='/faq' element={<Faq/>}></Route>
          <Route path='/ultilizacao' element={<Ultilizacao/>}></Route>
          <Route path='/adequacao' element={<Adequacao/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registrar' element={<Cadastrar/>}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

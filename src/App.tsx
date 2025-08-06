import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Layout from './components/structure/layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

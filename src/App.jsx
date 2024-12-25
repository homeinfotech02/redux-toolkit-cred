import './App.css'
import Header from './components/common/Header';
import Counter from './components/counterComponent/Counter'
import Dashboard from './components/credComponent/Dashboard'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Header />
      <Routes>
        {/* Counter DEMO */}
        <Route path="/" element={<Counter />} />
        {/* CRED DEMO */}
        <Route path="/cred" element={<Dashboard />} />
      </Routes>

    </>
  )
}

export default App

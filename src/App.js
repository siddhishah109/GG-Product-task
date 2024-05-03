import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import HomePage from './screen/HomePage';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;

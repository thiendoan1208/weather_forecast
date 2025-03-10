import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/theme-provider';

import Layout from './components/ui/layout';
import WeatherDashboard from './page/weather-dashboard';
import CityPage from './page/city-page';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<WeatherDashboard/>}/>
            <Route path='/city/:cityname' element={<CityPage/>}/>
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/theme-provider';

import Layout from './components/ui/layout';
import publicRoute from './Routes/routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Routes>
            {publicRoute.map((item, index) => (
              <Route key={`route-${index}`} path={item.path} element={item.component} />
            ))}
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;


import MatriculationExamination from './pages/MatriculationExamination'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/root/Layout';
import ErrorPage from './components/error/ErrorPage';
import { titles } from './data/titles';
import Contact from './pages/Contact';
import About from './pages/About';
import RoutesToUniversities from './pages/RoutesToUniversities';
import Help from './pages/Help';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout titles={titles}></Layout>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <MatriculationExamination />,
        },
        {
          path: '/ylioppilastutkinto',
          element: <MatriculationExamination />,
        },
        {
          path: '/ammatillinen-tutkinto',
          element: <MatriculationExamination />,
        },
        {
          path: '/yhteys',
          element: <Contact />,
        },
        {
          path: '/sivustosta',
          element: <About />,
        },
        {
          path: '/muut-reitit-korkeakouluun',
          element: <RoutesToUniversities/>,
        },
        {
          path: '/miten-kaytan-laskuria',
          element: <Help />,
        },
      ],
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App

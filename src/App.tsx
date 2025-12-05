
import MatriculationExamination from './pages/MatriculationExamination'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/root/Layout';
import ErrorPage from './components/error/ErrorPage';
import { titles } from './data/titles';
import Contact from './pages/Contact';
import About from './pages/About';
import RoutesToUniversities from './pages/RoutesToUniversities';
import Help from './pages/Help';
import VocationalDegree from './pages/VocationalDegree';
import IbDegree from './pages/IbDegree';
import Cooperation from './pages/Cooperation';
import Reform2026 from './pages/Reform2026';
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
          element: <VocationalDegree />,
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
        {
          path: '/yo-laskuri',
          element: <MatriculationExamination />,
        },
        {
          path: '/ammatillinen-laskuri',
          element: <VocationalDegree />,
        },
        {
          path: '/ib-tutkinto',
          element: <IbDegree />,
        },
        {
          path: '/yhteistyo',
          element: <Cooperation />,
        },
        {
          path: '/reform2026',
          element: <Reform2026 />,
        },
      ],
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App

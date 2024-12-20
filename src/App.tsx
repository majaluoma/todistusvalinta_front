
import MatriculationExamination from './pages/MatriculationExamination'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/root/Layout';
import ErrorPage from './components/error/ErrorPage';
import { titles } from './data/titles';

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
          element: <MatriculationExamination />,
        },
        {
          path: '/sivustosta',
          element: <MatriculationExamination />,
        },
        {
          path: '/muut-reitit-korkeakouluun',
          element: <MatriculationExamination />,
        },
        {
          path: '/miten-kaytan-laskuria',
          element: <MatriculationExamination />,
        },
      ],
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App

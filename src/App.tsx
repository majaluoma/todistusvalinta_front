
import './App.css'
import MatriculationExamination from './pages/MatriculationExamination'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root/Root';
import ErrorPage from './components/error/ErrorPage';

function App() {
  const titles = [
    {
      path: '/ylioppilastutkinto',
      title: 'Ylioppilastutkinto',
    },
    {
      path: '/ammatillinen-tutkinto',
      title: 'Ammatillinen perustutkinto',
    },
    {
      path: '/yhteys',
      title: 'Yhteys',
    },
    {
      path: '/sivustosta',
      title: 'Sivustosta',
    },
  ];

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root titles={titles}></Root>,
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
      ],
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App

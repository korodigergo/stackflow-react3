import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import EditQuestions from './pages/EditQuestions.jsx';
import Questions from './pages/Questions.jsx';
import QuestionPage from './pages/QuestionPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/addquestion",
        element: <EditQuestions />
      },
      {
        path: "/questions",
        element: <Questions />
      },
      {
        path: "/question/:id",
        element: <QuestionPage />
      }
    ]
  },

  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
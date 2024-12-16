
import './App.css'
import GradesForm from './features/gradesForm/GradesForm'


const gradeOptions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'F', label: 'F' },
]

const subjectOptions = [
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
  { value: 'history', label: 'History' },
  { value: 'literature', label: 'Literature' },
  { value: 'physics', label: 'Physics' },
]

function App() {
  return (

    <GradesForm gradeOptions={gradeOptions} subjectOptions={subjectOptions} />

  )
}

export default App

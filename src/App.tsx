
import './App.css'
import ResultContextProvider from './components/context/resultContext/ResultContext'
import GradesForm from './features/gradesForm/GradesForm'
import ThemeAccordion from './features/themeAccordion/ThemeAccordion'


const gradeOptions = [
  { value: 'l', label: 'L' },
  { value: 'e', label: 'E' },
  { value: 'm', label: 'M' },
  { value: 'c', label: 'C' },
  { value: 'b', label: 'B' },
]
       
const subjectOptions = [
  { value: "ai", label: "Äidinkieli" },
  { value: "s2", label: "Suomi toisena kielenä" },
  { value: "r2", label: "Ruotsi toisena kielenä" },
  { value: "ena", label: "Englanti, pitkä" },
  { value: "enb", label: "Englanti, lyhyt" },
  { value: "rua", label: "Toinen kotimainen kieli, pitkä" },
  { value: "rub", label: "Toinen kotimainen kieli, keskipitkä" },
  { value: "maa", label: "Matematiikka, pitkä" },
  { value: "mab", label: "Matematiikka, lyhyt" },
]

function App() {
  return (
    <ResultContextProvider>
      <GradesForm gradeOptions={gradeOptions} subjectOptions={subjectOptions} />
      <ThemeAccordion/>
    </ResultContextProvider>

  )
}

export default App

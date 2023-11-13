import { Route, Routes } from 'react-router-dom'

import AddExercise from './AddExercise';
import ShowExercises from './ShowExercises';
import EditExercise from './EditExercise';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ShowExercises />} />
      <Route path='/addExercise' element={<AddExercise />} />
      <Route path='/editExercise/:type/:id' element={<EditExercise />} />
    </Routes>
  );
}



export default App;

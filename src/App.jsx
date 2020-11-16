import React, { useState, useEffect } from 'react';

import './styles.scss'
import Students from './pages/students'
import Courses from './pages/courses'
import Registration from './pages/registrations'

import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';


function App(props) {

  const [action, setAction] = useState('')

  return (

    <div className="app">

      <div className="navbar-content">

        <img
          className="photo-profile"
          src="https://abmes.org.br/arquivos/noticias/eadabmes.png"
          alt="Imagem de Perfil"
        />

        <div>

          <div className="options-content">

            <div className="icon" title="Alunos" onClick={() => setAction('students')}><PeopleAltIcon /><p>ALUNOS</p></div>
            <div className="icon" title="Cursos" onClick={() => setAction('courses')}><MenuBookIcon /><p>CURSOS</p></div>
            <div className="icon" title="Matrículas" onClick={() => setAction('registration')}><LocalLibraryIcon /><p>MATRÍCULAS</p></div>

          </div>
        </div>

      </div>

      <div className="body-home">

        <div className="content">

          {action === 'students' ?
            <Students />
            : action === 'courses' ?
              <Courses />
              : action === 'registration' ?
                <Registration />
                : <></>
          }

        </div>
        <br />

      </div>

    </div >
  );
}

export default App;

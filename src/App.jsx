import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { Home } from './conponents/Home';
import { ListProjects } from './conponents/ListProjects';
import { ProjectPage } from './conponents/ProjectPage';
import { PageNoFound } from './conponents/PageNoFound';
import { useContext, useEffect } from 'react';
import { ProjectsContext } from './conponents/Context';

const upWindow = () => {
  window.scrollTo(0, 0);
}

const App = () => {
  const { setBtnActive } = useContext(ProjectsContext);
  const location = useLocation();

  useEffect(() => {
    setBtnActive({
      filterBtn: false,
      createProjectBtn: false,
      createTaskBtn: false,
    })
  }, [location, setBtnActive])
  return (
    <div className="page">
      <header className="header page__section">
        <div className="container">
          <div className="header__content">
            <Link to="/" className="link">
              <img src="./logo.png" alt="Logo" className='logo'/>
            </Link>

            <nav className="nav">
              <ul className="nav__list">
                <li className="nav__item">
                  <NavLink
                    to="home"
                    className={({ isActive }) => isActive ? 'nav__link active': 'nav__link'}
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav__item">
                  <NavLink
                    to="project"
                    className={({ isActive }) => isActive ? 'nav__link active': 'nav__link'}
                  >
                    Projects
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <Routes>
        <Route path='/'>
          <Route index  element={<Navigate to='/home' replace />}></Route>

          <Route path='home' element={<Home />}></Route>
        </Route>

        <Route path='project' >
          <Route index element={<ListProjects />} />

          <Route path=':id' element={<ProjectPage />} />
        </Route>

        <Route path='*' element={<PageNoFound />} />
      </Routes>
      
      
      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <button
              className='btn__up'
              onClick={upWindow}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;




import { useContext, useState } from "react"
import { ProjectsContext } from "./Context"
import cn from "classnames";
import { Link } from "react-router-dom";

export const ListProjects = () => {
  const {
    visibleProject,
    btnActive,
    handBtnActive,
    setFilter,
    filter,
    createProject,
  } = useContext(ProjectsContext);

  const handFilter = (key, value) => {
    setFilter(prevValue => {
      return {...prevValue, [key]: prevValue[key].includes(value) ? 
        [...prevValue[key]] :
        [...prevValue[key], value]};
    })
  }

  const handCompleted = (key, value) => {
    setFilter(prevValue => {
      return {...prevValue, [key]: [value]};
    })
  }

  const handSort = (key, value) => {
    setFilter(prevValue => {
      return {...prevValue, [key]: value};
    })
  }

  const handCancel = (key) => {
    setFilter(value => {
      return { ...value, [key]: [] };
    })
  }

  const [formValue, setFormValue] = useState({
    title: '',
    description: '',
    priority: '',
  })

  const handFormValue = (key, value) => {
    setFormValue(prev => {
      return { ...prev, [key] : value };
    })
  }

  const handSubmit = (e) => {
    e.preventDefault();
    createProject(formValue);
    handBtnActive('createProjectBtn')
    setFormValue({
      title: '',
      description: '',
      priority: '',
    })
  }

  return (
    <section className="page__section projects">
      <div className="container">
        <h1 className="page__section--title">
          All projects
        </h1>

        <div className="btn__block">
          <button
            className="btn__filter"
            onClick={() => handBtnActive('filterBtn')}
          >
            Filter
            <div
              className={cn(
                'icon',
                "icon__filter",
                {active: btnActive.filterBtn}
              )}
              />
          </button>

          <button
            className="btn__filter"
            onClick={() => handBtnActive('createProjectBtn')}
          >
            Create
            <div
              className={cn(
                'icon',
                "icon__create",
                {active: btnActive.createProjectBtn}
              )}
              />
          </button>
        </div>

        <div className="projects__settings">
          {btnActive.filterBtn && (
            <div className="filter">
              <div className="filter__content">
                <div className="filter__block-priority">
                  <div className="filter__title">Filter by priority</div>

                  <div className="labels__block">
                    <label className="filter__label">
                      <input
                        type="radio"
                        onChange={() => handFilter('priority', 'Low')}
                        checked={filter.priority.includes('Low')}
                      />
                      Low
                    </label>

                    <label className="filter__label">
                      <input
                        type="radio"
                        onChange={() => handFilter('priority', 'Medium')}
                        checked={filter.priority.includes('Medium')}
                      />

                      Medium
                    </label>

                    <label className="filter__label">
                      <input
                        type="radio"
                        onChange={() => handFilter('priority', 'High')}
                        checked={filter.priority.includes('High')}
                      />

                      High
                    </label>

                    <label className="filter__label">
                      <input
                        type="radio"
                        onChange={() => handCancel('priority')}
                        checked={!filter.priority.length}
                      />

                      Cancel
                    </label>
                  </div>
                </div>

                <div className="filter__block-comleted ">
                  <div className="filter__title">Filter by completed</div>

                  <div className="labels__block">
                    <label className="filter__label">
                      <input
                        type="radio"
                        onClick={() => handCompleted('completed', true)}
                        checked={filter.completed.includes(true)}
                      />
                      Completed
                    </label>

                    <label className="filter__label">
                      <input
                        type="radio"
                        onClick={() => handCompleted('completed', false)}
                        checked={filter.completed.includes(false)}
                      />

                      Incomplete
                    </label>

                    <label className="filter__label">
                      <input
                        type="radio"
                        onClick={() => handCancel('completed')}
                        checked={!filter.completed.length}
                      />

                      Cancel
                    </label>
                  </div>
                  
                </div>

                <div className="filter__block-sort">
                  <div className="filter__title">Sort by Date</div>

                  <div className="labels__block">
                    <label className="filter__label">
                      <input
                        type="radio"
                        onChange={() => handSort('sort', 'Up')}
                        checked={filter.sort.includes('Up')}
                      />
                      Up
                    </label>

                    <label className="filter__label">
                      <input
                        type="radio"
                        onChange={() => handSort('sort', 'Down')}
                        checked={filter.sort.includes('Down')}
                      />
                      Down
                    </label>

                    <label className="filter__label">
                      <input
                        type="radio"
                        onChange={() => handCancel('sort')}
                        checked={!filter.sort.length}
                      />

                      Cancel
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {btnActive.createProjectBtn && (
            <form onSubmit={handSubmit} className="form">
              <label className="form__label">
                Name:

                <input
                type="text"
                name="title"
                id=""
                className="form__field"
                value={formValue.title}
                onChange={(e) => handFormValue('title', e.target.value)}
                // minLength={10}
                />
              </label>

              <label className="form__label">
                Description:

                <input
                  type="text"
                  name="Description"
                  id=""
                  className="form__field"
                  // minLength={20}
                  value={formValue.description}
                  onChange={(e) => handFormValue('description', e.target.value)}
                />
              </label>

              <span>Priority:</span>

              <div className="labels__block">
                <label className="filter__label">
                  <input
                    type="radio"
                    name="priority"
                    onChange={() => handFormValue('priority','Low')}
                  />

                  Low
                </label>

                <label className="filter__label">
                  <input
                    type="radio"
                    name="priority"
                    onChange={() => handFormValue('priority','Medium')}
                  />

                  Medium
                </label>

                <label className="filter__label">
                  <input
                    type="radio"
                    name="priority"
                    onChange={() => handFormValue('priority','High')}
                  />

                  High
                </label>
              </div>

              <button
                className={cn(
                  "form__btn",
                  {disabled: !formValue.title || !formValue.description || !formValue.priority}
                )}
              >
                Create
              </button>
            </form>
          )}
        </div>

        <ul className="projects__list">
          {visibleProject.map(item => (
            <li className="projects__item" key={item.id}>
              {item.completed && <button className="projects__completed completed"></button>}
              
              <Link
                to={`./${item.projectLink}`}
                className={cn(
                  "projects__content",
                  {completed: item.completed}
                )}
              >
                <h3 className="projects__title">
                    {item.title.length < 55? item.title : item.title.slice(0, 51) + '...'}
                </h3>
    
                <span className="projects__description">
                  {item.description.length < 55? item.description : item.description.slice(0, 51) + '...'}
                </span>
    
                <div className="projects__info">
                  Priority:
    
                  <div
                    className={cn(
                      "projects__priority",
                      {low: item.priority === 'Low'},
                      {medium: item.priority === 'Medium'},
                      {high: item.priority === 'High'}
                    )}
                  >
                    {item.priority}
                  </div>
                </div>

                <div className="projects__info">
                  Create Date:
    
                  <div>
                    {item.date}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
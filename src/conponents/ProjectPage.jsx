import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ProjectsContext } from "./Context";
import cn from "classnames";

export const ProjectPage = () => {
  const { id } = useParams();
  const {
    selectedProject,
    selectProject,
    selectTask,
    handCompletedTask,
    handCompletedProject,
    createTask,
    handBtnActive,
    btnActive,
  } = useContext(ProjectsContext);
  const [titleTask, setTitleTask] = useState('');
  const disabledBtn = selectTask.some(item => item.completed === false);

  const handCreateTask = (e) => {
    e.preventDefault();
    createTask(titleTask);
    handBtnActive('createTaskBtn')
    setTitleTask('');
  }

  useEffect(() => {
    selectedProject(id);
  }, [id, selectedProject])

  return (
    <section className="page__section projects">
      <div className="container">
        <h1 className="page__section--title">
          {selectProject.title}
        </h1>

        <div className="description">
          Description: {selectProject.description}
        </div>

        {!selectProject.completed && (
          <button
            className="btn__filter"
            onClick={() => handBtnActive('createTaskBtn')}
          >
            Create
            <div
              className={cn(
                'icon',
                "icon__create",
                { active: btnActive.createTaskBtn },
              )}
              />
          </button>
        )}

        {btnActive.createTaskBtn && (
          <form
            onSubmit={handCreateTask}
            className="form"
          >
            <label className="form__label">
              Name:

              <input
                type="text"
                name="title"
                className="form__field"
                value={titleTask}
                onChange={(e) => setTitleTask(e.target.value)}
              />
            </label>
            
            <button
              className={cn(
                "form__btn",
                {disabled: !titleTask && selectProject.completed}
              )}
              disabled={!titleTask && selectProject.completed}
            >
              Create
            </button>
          </form>
        )}

        
        <div className="task__info-title">
          <span>
            Completed
          </span>
          
          <span>
            Title
          </span>
          
          <span>
            Date
          </span>
        </div>

        <ul className="task__list">
          {selectTask.map(item => (
            <li className="task__item" key={item.id}>
              <label className="task__label-completed">
                <input
                type="checkbox"
                name="Task completed"
                className="task__checkbox"
                onChange={() => !selectProject.completed? handCompletedTask(item.id): 0}
                checked={item.completed}
                />

                <div className={cn(
                  "task__completed",
                  {completed: item.completed}
                )}></div>
              </label>
              

              <span
              className={cn(
                "task__title",
                {completed: item.completed}
              )}
              >
                {item.title}
              </span>

              <div
                className={cn(
                  "task__date",
                  {completed: item.completed}
                )}
                
              >
                {item.date}
              </div>

            </li>
          ))}
        </ul>

        <div className="btn__block-completed">
          <button
            className={cn(
              "btn__end-project",
              {disabled: disabledBtn},
              {completed: selectProject.completed}
            )}
            disabled={disabledBtn}
            onClick={() => handCompletedProject(selectProject.id)}
          >
            {!selectProject.completed? 'End Project' : ''}
          </button>
        </div>
      </div>
    </section>
  )
}
import React, { useCallback, useEffect, useMemo, useState } from "react";

let projectsData = [
  {
    "id": 1,
    "projectLink": "разработка_веб_приложения",
    "title": "Разработка веб-приложения",
    "description": "Создание современного веб-приложения с использованием технологии React",
    "date": "2023.02.15",
    "priority": "High",
    "completed": true
  },
  {
    "id": 2,
    "projectLink": "обновление_базы_данных",
    "title": "Обновление базы данных",
    "description": "Обновление и оптимизация существующей базы данных для улучшения производительности",
    "date": "2023.03.10",
    "priority": "Medium",
    "completed": false
  },
  {
    "id": 3,
    "projectLink": "тестирование_безопасности",
    "title": "Тестирование безопасности",
    "description": "Проведение тестирования безопасности для выявления уязвимостей в системе",
    "date": "2023.01.25",
    "priority": "High",
    "completed": true
  },
  {
    "id": 4,
    "projectLink": "оптимизация_интерфейса_пользователя",
    "title": "Оптимизация интерфейса пользователя",
    "description": "Улучшение пользовательского интерфейса для повышения удобства использования",
    "date": "2023.04.05",
    "priority": "Medium",
    "completed": false
  },
  {
    "id": 5,
    "projectLink": "развертывание_на_сервере",
    "title": "Развертывание на сервере",
    "description": "Развертывание приложения на сервере и настройка окружения",
    "date": "2023.02.28",
    "priority": "Low",
    "completed": false
  }
]

let taskData = [
  {
    "id": 1,
    "projectId": 1,
    "title": "Implement User Authentication",
    "completed": true,
    "date": "2023.02.20"
  },
  {
    "id": 2,
    "projectId": 1,
    "title": "Design Database Schema",
    "completed": true,
    "date": "2023.02.18"
  },
  {
    "id": 3,
    "projectId": 2,
    "title": "Optimize SQL Queries",
    "completed": false,
    "date": "2023.03.15"
  },
  {
    "id": 4,
    "projectId": 2,
    "title": "Backup Database",
    "completed": false,
    "date": "2023.03.08"
  },
  {
    "id": 5,
    "projectId": 3,
    "title": "Conduct Penetration Testing",
    "completed": true,
    "date": "2023.01.28"
  },
  {
    "id": 6,
    "projectId": 3,
    "title": "Review Security Policies",
    "completed": true,
    "date": "2023.01.30"
  },
  {
    "id": 7,
    "projectId": 4,
    "title": "Update UI Components",
    "completed": false,
    "date": "2023.04.02"
  },
  {
    "id": 8,
    "projectId": 4,
    "title": "Test User Interactions",
    "completed": false,
    "date": "2023.04.03"
  },
  {
    "id": 9,
    "projectId": 5,
    "title": "Configure Server Environment",
    "completed": false,
    "date": "2023.02.25"
  },
  {
    "id": 10,
    "projectId": 5,
    "title": "Deploy Application",
    "completed": false,
    "date": "2023.02.28"
  }
];

export const ProjectsContext = React.createContext({});

export const ProjectsProvider = ({ children }) => {
  const [visibleProject, setVisibleProject] = useState([]); 
  const [btnActive, setBtnActive] = useState({
    filterBtn: false,
    createProjectBtn: false,
    createTaskBtn: false,
  });
  const [filter, setFilter] = useState({
    priority: [],
    completed: [],
    sort: [],
  });
  const [selectProject, setSeleletProject] = useState({});
  const [selectTask, setSelectTask] = useState([]);

  const selectedProject = (link) => {
    const findProject = projectsData.find(item => item.projectLink === link);
    const findTask = taskData.filter(item => item.projectId === findProject.id);
    setSelectTask(findTask)
    setSeleletProject(findProject);
  }

  const handCompletedTask = (id) => {
    taskData = taskData.map(item => {
      return item.id === id? { ...item, completed: !item.completed } : { ...item };
    })

    setSelectTask(value => {
      return value.map(item => {
        return item.id === id? { ...item, completed: !item.completed } : { ...item };
      })
    })
  }

  const handCompletedProject = (id) => {
    projectsData = projectsData.map(item => {
      return item.id === id ? { ...item, completed: !item.completed } : { ...item };
    });
    setSeleletProject(prev => {
      return { ...prev, completed: !prev.completed };
    })
    setVisibleProject(prevValue => {
      return prevValue.map(item => {
        return item.id === id ? { ...item, completed: !item.completed } : { ...item };
      })
    });
  }

  const handBtnActive = (btn) => {
    setBtnActive(prevValue => {
      return { ...prevValue, [btn]: !prevValue[btn] };
    })
  }

  const createTask = useCallback((title) => {
    const newTask = {
      id: taskData.length + 1,
      projectId: selectProject.id,
      title,
      completed: false,
      date: new Date().toLocaleDateString(),
    }

    setSelectTask(prev => {
      return [ ...prev, newTask ];
    })

    taskData = [...taskData,  newTask];
  }, [selectProject])

  const createProject = ({ title, description, priority }) => {
    const newProject = {
      id: projectsData.length + 1,
      projectLink: title.replace(' ', '_').toLowerCase(),
      title,
      description,
      date: new Date().toLocaleDateString(),
      priority,
      completed: false,
    }
    
    projectsData = [ ...projectsData, newProject ]
    setVisibleProject(projectsData);
  }
  
  useEffect(() => {
    setVisibleProject(
      projectsData.filter(item => {
        return filter.priority.length ?
        filter.priority.includes(item.priority) : true
          && filter.completed.length ?
          filter.completed.includes(item.completed) : true
      })
      .sort((a, b) => {
        switch (filter.sort) {
          case 'Up':
            return new Date(a.date) - new Date(b.date);
        
          case 'Down':
            return new Date(b.date) - new Date(a.date);

          default:
            return 0;
        }
      })
    )
  }, [filter]);

  const value = useMemo(() => ({
    selectTask,
    visibleProject,
    btnActive,
    handBtnActive,
    setFilter,
    filter,
    selectedProject,
    selectProject,
    handCompletedTask,
    handCompletedProject,
    createProject,
    createTask,
    setBtnActive,
  }), [createTask, btnActive, filter, visibleProject, selectProject, selectTask])

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  )
}
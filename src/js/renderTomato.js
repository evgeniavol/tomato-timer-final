import { Tomato } from './tomato';
import {ControlTomato} from './controlTomato'



export class RenderTomato {
  constructor() {
    this.render();
		this.addToPage()
		
  }

  createTimerGroup() {
    const timer = document.createElement('p');
    timer.classList.add('window__timer-text');
    timer.textContent = '25:00';

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('window__buttons');

    const btnStart = document.createElement('button');
    btnStart.classList.add('button');
    btnStart.classList.add('button-primary');
    btnStart.textContent = 'Старт';

    const btnStop = document.createElement('button');
    btnStop.classList.add('button');
    btnStop.classList.add('button-secondary');
    btnStop.textContent = 'Стоп';

    buttonGroup.append(btnStart, btnStop);

    const timerBody = document
      .querySelector('.window__body')
      .append(timer, buttonGroup);
    return timerBody;
  }

  createAddTaskForm() {
    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML(
      'afterbegin',
      `
				<input type="text" class="task-name input-primary" name="task-name" id="task-name" placeholder="название задачи">
        <button type="button" class="button button-importance default" aria-label="Указать важность"></button>
        <button type="submit" class="button button-primary task-form__add-button">Добавить</button>
		`
    );

    return document.querySelector('.pomodoro-form').append(form);
  }

  createTask() {
    const tasksFromTomato = new Tomato();
    const tasksList = document.querySelector('.pomodoro-tasks__quest-tasks');
		const prevItemList = document.querySelectorAll('.pomodoro-tasks__list-task')

		prevItemList.forEach(li => {
			li.remove()
		})

    tasksFromTomato.tasks.forEach((task) => {
      tasksList.insertAdjacentHTML(
        'beforeend',
        `
			<li class="pomodoro-tasks__list-task ${task.importance}">
				<span class="count-number">${task.id}</span>
				<button class="pomodoro-tasks__task-text pomodoro-tasks__task-text_active">
					${task.taskTitle}
				</button>
				<button class="pomodoro-tasks__task-button"></button>

				<div class="burger-popup">
          <button class="popup-button burger-popup__edit-button">Редактировать</button>
          <button class="popup-button burger-popup__delete-button">Удалить</button>
        </div>
			</li>
			`
      );
    });

		
  }

	addToPage() {
		const btn = document.querySelector('.task-form__add-button')

		btn.addEventListener('click', ()=>{
			this.createTask()
			this.popupMenuControl();
			this.setActiveTask()
		})
	}

  popupMenuControl() {
    const openCloseBtns = document.querySelectorAll(
      '.pomodoro-tasks__task-button'
    );

    openCloseBtns.forEach((btn) => {
      btn.addEventListener('click', ({ target }) => {
				target.nextElementSibling.classList.toggle('burger-popup_active');
      });
    });
  }

	setActiveTask(task) {
    const liItems = document.querySelectorAll('.pomodoro-tasks__task-text')
		const title = document.querySelector('.window__panel-title')
		const taskNum = document.querySelector('.window__panel-task-text')


    if(liItems) {
      liItems.forEach((item, index)=> {
        item.addEventListener('click', ({target}) => {
					title.textContent = target.textContent
					taskNum.textContent = `Томат: ${index += 1}`
        })
      })
    }
  }



  render() {
    this.createTimerGroup();
    this.createAddTaskForm();
		new ControlTomato
  }
}

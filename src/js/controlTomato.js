import { AddNewTask } from './tomato';

export class ControlTomato {
  constructor() {
    this.color = null;
    this.taskArray = [];

    this.addTaskToArray();
    this.getSetTimer();
    this.change()
  }

  addTaskToArray() {
    const input = document.querySelector('.task-name');
    const addBtn = document.querySelector('.task-form__add-button');
    let obj = {};
    let id = 0;


    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (input.value.length) {
        id++;
        obj = {
          taskTitle: input.value,
          importance: this.color,
        };

        this.taskArray.push(obj);

        new AddNewTask({
          id: id,
          taskTitle: obj.taskTitle,
          importance: obj.importance,
        });
      } else {
        alert('Добавьте задачу!');
      }
      input.value = '';
    });
  }

  change() {
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.button-importance')) {
        if (target.closest('.default')) {
          target.classList.remove('default');
          target.classList.add('so-so');
          this.color = 'so-so'
        } else if (target.closest('.so-so')) {
          target.classList.remove('so-so');
          target.classList.add('important');
          this.color = 'important'
        } else if (target.closest('.important')) {
          target.classList.remove('important');
          target.classList.add('default');
          this.color = 'default'
        }
      }
    });
  }

  getSetTimer() {
    const timerCount = document.querySelector('.window__timer-text');
    const title = document.querySelector('.window__panel-title');

    let countMinute = 24;
    let countSeconds = 59;
    let timer = null;

    const btnStart = document.querySelector('.button-primary');
    const stopBtn = document.querySelector('.button-secondary');

    btnStart.addEventListener('click', () => {
      if (title.textContent != 'Задача') {
        btnStart.disabled = true;
        btnStart.style.backgroundColor = 'grey';
        timer = setInterval(() => {
          timerCount.textContent = `${countMinute} : ${countSeconds}`;
          countSeconds--;
          if (countSeconds <= -1) {
            countMinute--;
            countSeconds = 59;
          }
          if (countMinute <= -1) {
            clearInterval(timer);
          }
        }, 1000);
      } else {
        alert('Добавьте активную задачу');
      }
    });

    stopBtn.addEventListener('click', () => {
      btnStart.disabled = false;
      btnStart.style.backgroundColor = '#cc0017';

      clearInterval(timer);
    });
  }
}

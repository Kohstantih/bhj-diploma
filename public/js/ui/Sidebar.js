/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const btn = document.querySelector('.sidebar-toggle');
    const body = document.querySelector('body')

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const btnsBox = document.querySelector('.sidebar-menu');

    btnsBox.addEventListener('click', (e) => {
      e.preventDefault();      

      const parentTarget = e.target.closest('li');

      if(parentTarget.classList.contains('menu-item_register')) {
        App.getModal('register').open();
      } else if(parentTarget.classList.contains('menu-item_login')) {
        App.getModal('login').open();
      } else if(parentTarget.classList.contains('menu-item_logout')) {
        User.logout((err, response) => {
          if(err) return alert(err);

          if(response.success) {           
            App.setState('init')
            User.unsetCurrent()
          } else {
            alert(response.error)
          }
        })
      }
    })
  }
}
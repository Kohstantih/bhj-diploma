/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if(err) alert(err);

      if(response.success) {
        const selectExpense = document.getElementById('expense-accounts-list');
        const selectIncome = document.getElementById('income-accounts-list');

        const optionsBox = document.querySelectorAll('option').forEach(el => el.remove())

        response.data.forEach(el => {
          const option = new Option(el.name, el.id);
          selectExpense.appendChild(option.cloneNode(true));
          selectIncome.appendChild(option.cloneNode(true));
        })
      } else {
        return alert(response.error)
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(err) alert(err);

      if(response.success) {
        this.element.reset()

        App.getModal('newIncome').close()
        App.getModal('newExpense').close()

        App.update();
      } else {
        return alert(response.error)
      }
    })
  }
}
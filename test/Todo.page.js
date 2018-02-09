const itemSelector = index => `.todo-list li:nth-child(${index + 1})`;

class TodoPage {
  open() {
    browser.reload();
    browser.url('/');
    browser.waitUntil(
      () => browser.isVisible('.new-todo'),
      2000,
    );
  }

  addNewItem(todo) {
    browser.setValue('.new-todo', `${todo}\uE006`);
  }

  gettodoText(index) {
    return $(itemSelector(index)).getText();
  }

  get itemsCount() {
    if (!($('.todo-list').isVisible())) {
      return 0;
    }

    return browser.elements('.todo-list li').value.length;
  }

  get itemsCounterValue() {
    return parseInt($('.todo-count strong').getText(), 10);
  }

  get title() {
    return browser.getTitle();
  }
}

export default new TodoPage();

import { expect } from 'chai';
import todoPage from './Todo.page';

describe('spec2', () => {
  beforeEach(() => {
    todoPage.open();
  });

  it('should add new item to list', () => {
    // given
    const todoItemText = 'new item';

    // when
    todoPage.addNewItem(todoItemText);

    // then
    expect(todoPage.gettodoText(0)).to.equal(todoItemText);
    expect(todoPage.itemsCount).to.eql(1);
  });

  it('should display valid items count', () => {
    // when
    todoPage.addNewItem('first');
    todoPage.addNewItem('second');

    // then
    expect(todoPage.itemsCounterValue).to.eql(2);
  });
});

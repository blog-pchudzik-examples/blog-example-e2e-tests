import { expect } from 'chai';
import todoPage from './Todo.page';

describe('spec1', () => {
  it('should open todo app main page', () => {
    // when
    todoPage.open();

    // then
    expect(todoPage.title).to.equal('React • TodoMVC');
  });
});

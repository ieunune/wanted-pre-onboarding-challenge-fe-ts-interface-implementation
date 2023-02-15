interface TagItem {
  id: number;
  content: string;
}

interface TodoItem {
  id: number;
  content: string;
  isDone: boolean;
  category: string;
  tags?: TagItem[];
}

interface ITodoService {
  createTodo(content: string): void;
  createTodoTagById(todoId: number, ...tags: string[]): void;
  readTodoById(todoId: number): TodoItem;
  readTodos(): TodoItem[];
  updateTodoContentById(todoId: number, content: string): void;
  updateTodoIsDoneById(todoId: number): void;
  updateTodoCategoryById(todoId: number, category?: string): void;
  updateTodoTagById(todoId: number, tagId: number, tagContent: string): void;
  deleteTodoById(todoId: number): void;
  deleteAllTodos(): void;
  deleteAllTagsById(todoId: number): void;
}


class TodoService implements ITodoService {

  /// Fields 
  private todoList: TodoItem[];
  private todoId: number;
  private tagId: number;

  /// Constructor
  constructor() {
    this.todoList = [];
    this.todoId = Date.now();
    this.tagId = Date.now();
  }

  /// Method
  createTodo(content: string = '') {
    if (content === '') {
      throw new Error('content 값이 빈 문자열입니다.');
    }

    this.todoList.push({
      id: this.todoId,
      content: content,
      isDone: false,
      category: '',
      tags: [],
    });
  }

  createTodoTagById(todoId: number, ...tags: string[]) {
    const todo = this.todoList.find(todo => todo.id === todoId);

    if (!todo) {
      throw new Error('해당하는 할 일을 찾을 수 없습니다.');
    }

    const tagArr: TagItem[] = [];

    // id넣은 객체 생성
    tags.map(tag => {
      let obj = {
        id: this.tagId,
        content: tag,
      };
      tagArr.push(obj);
    });

    todo.tags = todo.tags?.concat(tagArr);
  }

  readTodoById(todoId: number) {
    const todo = this.todoList.find(todo => todo.id === todoId);

    if (!todo) {
      throw new Error('해당하는 할 일을 찾을 수 없습니다.');
    }

    return todo;
  }

  readTodos() {
    return this.todoList;
  }

  updateTodoContentById(todoId: number, content: string) {
    const todo = this.todoList.find(todo => todo.id === todoId);

    if (!todo) {
      throw new Error('해당하는 할 일을 찾을 수 없습니다.');
    }

    todo.content = content;
  }

  updateTodoIsDoneById(todoId: number) {
    const todo = this.todoList.find(todo => todo.id === todoId);

    if (!todo) {
      throw new Error('해당하는 할 일을 찾을 수 없습니다.');
    }

    todo.isDone = !todo.isDone;
  }

  updateTodoCategoryById(todoId: number, category = '') {
    const todo = this.todoList.find(todo => todo.id === todoId);

    if (!todo) {
      throw new Error('해당하는 할 일을 찾을 수 없습니다.');
    }

    if (category === '') {
      throw new Error('카테고리 내용을 입력해주세요.');
    }

    todo.category = category;
  }

  updateTodoTagById(todoId: number, tagId: number, tagContent: string) {
    const todo = this.todoList.find(todo => todo.id === todoId);

    if (!todo) {
      throw new Error('해당하는 할 일을 찾을 수 없습니다.');
    }

    //tag id error
    const tagObj = todo.tags?.find(tag => tag.id === tagId);

    if (!tagObj) {
      throw new Error('태그를 찾을 수 없습니다.');
    }

    tagObj.content = tagContent;
  }

  deleteTodoById(todoId: number) {
    const index = this.todoList.findIndex(todo => todo.id === todoId);

    if (!this.todoList[index]) {
      throw new Error('해당하는 할 일을 찾을 수 없습니다.');
    }

    this.todoList.splice(index, 1);
  }

  deleteAllTodos() {
    this.todoList = [];
    return this.todoList;
  }

  deleteAllTagsById(todoId: number) {
    const todo = this.todoList.find(todo => todo.id === todoId);

    if (!todo) {
      throw new Error('해당하는 할 일을 찾을 수 없습니다.');
    }

    todo.tags = [];
  }
}

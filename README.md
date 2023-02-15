# 원티드 프리 온보딩 챌린지

## 요약

- Todo 앱을 JSDoc으로 문서화 하며 TS(타입스크립트) 학습하기
- [페이지 링크](https://goodlearner10.github.io/wanted-pre-onboarding-challenge-fe-ts/)

## 🗓️ 프로젝트 기간

2/8 (수) ~ 2/20 (월)

## 요구사항

- [x] 필요한 데이터를 모두 모델링한다.
- [x] 사용되는 모든 함수를 `선언부만` 작성한다.
  - 함수 및 클래스의 내부는 구현하지 않는다.
- [x] `JSDoc`을 활용해 문서화한다.
- [x] `Github Page`를 활용해 `JSDoc` 정적 페이지를 배포한다.

## 2차 요구사항

- [x] 필요한 데이터를 모두 TypeScript's Interface로 모델링한다.
- [x] 사용되는 모든 함수를 선언부만 만든다.
  - 함수 및 클래스의 내부는 구현하지 않습니다.
- [x] Interface만을 따라 작성한 코드가 동작하는 애플리케이션이 되도록 유도하셔야합니다.

## 3차 요구사항

타 수강생의 타이핑 즉 설계 & 모델링을 실제로 구현합니다.

> **seul**님이 설계한 코드를 구현했습니다  
> [레파지토리 링크](https://github.com/seul-dev/wanted-pre-onboarding-challenge-fe-2)

- [x] 설계 & 모델링된 TypeScript's Interface를 따라 내부 구현부를 모두 작성한다.
  - 동작되지 않더라도 설계 & 모델링을 지키는 것이 원칙이다.
- [x] 절대로 동작과 구현을 위해 설계 & 모델링 규칙을 어기지 않습니다.
- [x] README.md 혹은 별도의 문서에 어떤 부분의 타입을 고치면 좋은지 피드백과 출처 링크를 남깁니다.

## 구현 후기

### TodoService 클래스

```ts
class TodoService {
  private todoList: TodoItem[];
  private todoId: number;
  private tagId: number;

  constructor() {
    this.todoList = [];
    this.todoId = Date.now();
    this.tagId = Date.now();
  }
}
```

- 각각의 투두와 태그들을 분별하기 위한 id와 투두 객체를 담는 배열을 동시에 생성합니다.

- 위 `TodoService` 클래스는 인스턴스 생성시에만 아이디를 생성할 수 있기 때문에 `createTodo()` 메서드를 사용하여 투두 객체를 추가하면 `todoList` 배열에는 모두 같은 아이디 값을 가진 투두들이 저장됩니다. (태그 아이디도 마찬가지 입니다.)

  - 이렇게 모두 같은 값이 아이디에 부여되므로 아이디는 분별 역할을 수행할 수 없습니다.

- 새 투두나 태그를 생성할 때 `Date.now()`를 사용해 아이디를 생성하는 방식이 더 좋을 것 같습니다.

✔️ 위와 같은 이유로 id를 사용하여 할 일을 지우거나 수정하는 일들이 불가능하지만, 객체마다 다른 아이디를 가지고 있음을 가정하고 설계에 맞춰 코드를 구현하였습니다.

✔️ 작성한 JSdoc 문서와 인터페이스 모델링 간의 불일치가 있었습니다. interface 모델링을 우선 반영하여 작성했습니다.

### createTodo 메서드

```js

  /**
   * Create a new Todo item.
   * @param {string} [content=''] - The content of the Todo item.
   * @throws {Error} If the content is empty.
   * @returns {TodoItem} The created Todo item.
   */
  createTodo(content) {}

```

- content 인자를 받은 뒤 투두 객체를 만들어 배열에 추가한 뒤 객체를 리턴합니다.
- content 인자는 기본값으로 `''` 빈 문자열을 가집니다.
- content 값이 비어있다면 에러를 발생시킵니다

**나의 생각**

- 내용 없이도 할 일을 추가할 수 있어야 한다는 요구와 맞지 않습니다.
- content 값이 비어있어도 에러를 발생시키지 않고 객체를 생성할 수 있어야 한다고 생각합니다.
- 기본값은 그대로 두고 error 구문은 삭제하면 내용 없이도 할 일을 추가할 수 있게 됩니다.

### Error

```js
  * @throws {Error} If the todo item with the given id is not found.
```

- 주어진 아이디에 해당하는 투두를 찾지 못할 시 에러를 발생시킵니다.
- 설계에서 위 내용이 메서드마다 반복해서 등장합니다.

**나의 생각**

- 동일한 코드가 반복되게 되므로 해당 부분은 따로 메서드로 빼서 사용하는 것이 좋을 것 같습니다.
- 모델링 규칙을 어기지 않는 것이 조건이기 때문에 새로운 메서드를 만들지 않고 설계대로 코드를 반복하여 작성하였습니다.

### optional과 Default Parameters

```js
  * @param {string} [content=''] - The content of the Todo item
  * @param {string} [category=''] - The new category of the todo item.
```

```ts
createTodo(content: string): void;
updateTodoCategoryById(todoId: number, category?: string): void;
```

- 기본값을 가지는 인자에 대한 타입 정의가 다릅니다.

**나의 생각**

- 일치가 필요해 보입니다.

### Todo

```js
Todo {
    아이디(required),
    내용(required),
    완료여부(required),
    카테고리(required),
    태그들(optional)
}
```

### CREATE

- 할 일을 추가할 수 있다.
- 내용 없이 추가할 수 있다.

### READ

- 모든 할 일을 조회할 수 있다.
- ID를 기반으로 특정 할 일을 조회할 수 있다.

### UPDATE

- ID를 제외한 모든 속성을 수정할 수 있다.
- 특정 할 일의 특정 태그를 수정할 수 있다.

### DELETE

- ID를 기반으로 특정 할일을 삭제할 수 있다.
- 모든 할 일을 제거할 수 있다.
- 특정 할 일의 특정 태그를 삭제할 수 있다.
- 특정 할 일의 모든 태그를 제거할 수 있다.

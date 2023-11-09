export class Stack { // 堆栈 后进先出
  constructor() {
    this.items = []
  }
  push(item) {
    this.items.push(item)
  }
  pop() { // 删除最顶端的元素
    return this.items.pop();
  };
  peek() { // 得到最顶上的元素
    return this.items[items.length - 1];
  };
  isEmpty() {
    return this.items.length == 0;
  };
  size() {
    return this.items.length;
  };
  clear() {
    this.items = [];
  };
  print() {
    console.log(this.items.toString());
  };
}
export class Queue { // 队列 先进先出
  constructor() {
    this.items = []
  }
  enqueue(item) { // 排队 （向队尾追加一个元素）
    this.items.push(item)
  }
  dequeue() { // 先得到服务 （移除队列的第一项，并返回被移除的元素）
    return this.items.shift();
  };
  front() { // 先来排队的元素
    return this.items[0];
  };
  isEmpty() {
    return this.items.length == 0;
  };
  size() {
    return this.items.length;
  };
  clear() {
    this.items = [];
  };
  print() {
    console.log(this.items.toString());
  };
}
export class PriorityQueue extends Queue { // 优先队列 如：孕妇优先得到服务 尽管她不是先到的队列顺序
  constructor() {
    super()
    this.items = []
  }
  enqueue(element, priority) { // 优先排队 以致能先得到服务
    let queueElement = new QueueElement(element, priority)
    if (this.isEmpty) {
      this.items.push(queueElement)
    } else {
      let added = false
      for (let i = 0; i < this.items.length; i++) {
        if (queueElement.priority < this.items[i].priority) {
          this.items.splice(i, 0, queueElement); // 可以插队
          added = true;
          break;
        }
      }
      if (!added) {
        this.items.push(queueElement)
      }
    }
  }
}
export class QueueElement {
  constructor(element, priority) {
    this.element = element
    this.priority = priority
  }
}
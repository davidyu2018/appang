import { Stack, Queue } from './stack'
const decimalToBasenumber = (ten) => { // 堆栈应用（十进制数字转换其它进制）
  let remStack = new Stack(),
    rem,
    baseString = '',
    digits = '0123456789ABCDEF'; //{6} 
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]; //{7} 
  }
  return baseString;
}
const hotPotato = (nameList, num) => { // 队列应用 （循环队列 ---击鼓传花游戏）
  var queue = new Queue(); // {1} 
  for (var i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]); // {2} 
  }
  var eliminated = '';
  while (queue.size() > 1) {
    for (var i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()); // {3} 
    }
    eliminated = queue.dequeue();// {4} 
    console.log(eliminated + '在击鼓传花游戏中被淘汰。');
  }
  return queue.dequeue();// {5}
}
// var names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
// var winner = hotPotato(names, 7);
// console.log('胜利者：' + winner);
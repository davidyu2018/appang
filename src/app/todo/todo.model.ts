export class Todo {
  // favorite: boolean = false
  constructor(
    public name: string,
    public id: string,
    public desc: string,
    public title: string,
    public completed: boolean
  ) { }

  // isPositiveChange(): boolean {
  //   return this.price >= this.previousPrice
  // }
}
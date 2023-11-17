import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject, defer, interval, from } from 'rxjs';
import { Quote } from './model';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor() { }
  getImageUrl(): Observable<object[]> {
    let images: any[] = []
    for (let i of Array.from({ length: 5 }, (_, i) => 1 + (i))) {
      images.push({ contentUrl: `./assets/images/bg/lbg${i}.jpg` })
    }
    return of(images)
    // return res as string[]
  }
  getQuotes(): Observable<Quote[]> {
    const quotoes: Quote[] = [
      {
        cn: '我突然觉得自己像个华丽的木偶，演尽了所有的悲欢离合，可是背上总是有无数闪亮的银色丝线，操纵我哪怕一举手一投足。',
        en: 'I suddenly feel myself like a doll, actingall kinds of joys and sorrows.There are lots of shining silvery thread on my back, controlling all my action.',
        imgUrl: './assets/images/bg/lbg1.jpg'
      },
      {
        cn: '被击垮的只是暂时的，但如果你放弃的话，就会使它成为永恒。',
        en: 'Being defeated is often a temportary condition. Giving up is what makes it permanent.',
        imgUrl: './assets/images/bg/lbg2.jpg'
      },
      {
        cn: '当你最终放开了过去时，更好的事就会到来。',
        en: 'When you finally let go of past, something better comes along.',
        imgUrl: './assets/images/bg/lbg3.jpg'
      },
      {
        cn: '我们学着放开过去伤害我们的人和事，学着只向前看。因为生活本来就是一直向前的。',
        en: 'We learn to let go of things and people that hurt us in the past and just move on. For life is all about moving on.',
        imgUrl: './assets/images/bg/lbg4.jpg'
      }

    ]
    return of(quotoes)
  }
  getMenus(): Observable<any[]> {
    return of([
      {
        name: 'TODO', id: '23546', path: 'todo', pathParam: 'ALL', queryParams: {name:'www', age: '234'}, fragment: 'eduction'
      }, 
      {
        name: 'STOCK', id:'354633', path: 'stock'
      },
      {
        name: 'SPORTS', id:'354677', path: 'sports'
      },
      {
        name: 'SYSTEM', id:'354664', path: 'admin'
      },
    ])
  }
}

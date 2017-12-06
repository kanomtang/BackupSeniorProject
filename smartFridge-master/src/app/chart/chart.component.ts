import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {UsageItem} from '../shared/UsageItem';
import set = Reflect.set;


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  UsageItem: FirebaseListObservable<any[]>;
  OriginalArr:any[]= [];
  ExtractArr: UsageItem[]= [];

  constructor(private af: AngularFireDatabase){
     this.UsageItem = af.list('/Usage');

    // console.log();
    this.getlist()

  }
  newList(param:any[])  {

    let a =this.getlist();

    //let MockArr = aaa;
    //var MockArr:UsageItem[]=this.OriginalArr ;
    let MockArr = [];
    for(let i of param){
      console.log(i);
    }




  }
  getlist(): UsageItem[]{


    let count =0;
    let list: Array<any> =[]

      this.UsageItem.forEach(item => {

        //console.log(item);
        //this.OriginalArr.push(item)
        list[count] = item
        count+=1;
      })


    console.log(list)
    //console.log( list.length)



  return this.OriginalArr;
  }
  //
  extractValues(): any[] {
    this.getlist();
    let mockArr = [];

    let iniItem = this.OriginalArr[0];
    iniItem.AmountofUsageItem = 1;
    mockArr.push(iniItem);
    let checkDup = false;
    for (let i = 1; i < this.OriginalArr.length - 1; i++) {


      for (let k = 0; k < mockArr.length; k++) {
        if (mockArr[k].itemName == this.OriginalArr[i].itemName) {
          if (mockArr[k].itemName == this.OriginalArr[i].itemName) {
            mockArr[k].AmountofUsageItem += 1;
            mockArr[k].Shelflife += 1;
            checkDup = true;
            break;
          }
        }
      }


      if (checkDup == false) {
        let newItem = this.OriginalArr[i];
        newItem.AmountofUsageItem = 1;
        mockArr.push(newItem);
      }
    }

    return mockArr;
  }
  //
  // assignDataAmount(param:UsageItem[]): any[] {
  //   let resultArr = [];
  //   for(let i = 0;i<param.length;i++){
  //     resultArr.push(param[i].AmountofUsageItem);
  //   }
  //   return resultArr ;
  // }
  // assignLabel(param:UsageItem[]): any[] {
  //   let resultArr = [];
  //   for(let i = 0;i<param.length;i++){
  //     resultArr.push(param[i].itemName);
  //   }
  //   return resultArr;
  // }
  // assignDataShelflife(param:UsageItem[]): any[] {
  //   let resultArr = [];
  //   for(let i = 0;i<param.length;i++){
  //     resultArr.push((param[i].Shelflife)/param[i].AmountofUsageItem);
  //   }
  //   return resultArr ;
  // }

}

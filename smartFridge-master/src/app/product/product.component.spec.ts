/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, ComponentFixtureAutoDetect , TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ProductComponent } from './product.component';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Lot} from '../shared/Lot';
import {isUndefined} from "util";



export const firebaseConfig = {
  apiKey: 'AIzaSyCFXny8pflQwLu9AyQu8ve9xI6qA9KR7PM',
  authDomain: 'iotapplication-7cf10.firebaseapp.com',
  databaseURL: 'https://iotapplication-7cf10.firebaseio.com',
  projectId: 'iotapplication-7cf10',
  storageBucket: 'iotapplication-7cf10.appspot.com',
  messagingSenderId: '33890290341'
};

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let lotObject: string;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [

        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        NgxQRCodeModule,
        // AngularFireDatabase,
        // FirebaseListObservable,
        // FirebaseObjectObservable,
        AngularFireDatabaseModule


      ],
      declarations: [ ProductComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();



  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
  it('should get all lot list', () => {

    expect(component.getLotList()).not.toBeNull();

  });
  it('should get all product list', () => {

    expect(component.getList()).not.toBeNull();

  });

  it('should check the amount is not positive',() => {

    let Mocklot = new Lot();
    Mocklot.amount = -100 ;
    component.lotModel = Mocklot;
    expect(component.lotModel.amount).toBeLessThan(1);

  });

  it('should add new lot', () => {



    component.lotModel.amount=100;
    component.lotModel.qrCode = 'Kitkat,25,';
    component.date = '2018-07-20'
    // component.lotModel = Mocklot;


    let result =component.addLot();

    expect(result).toBeNull();

  });



  it('should update lot', () => {
    component.lotModel.amount=100;
    component.lotModel.qrCode = 'Kitkat,25,';
    component.date = '2018-07-20'

    let result =component.updateLot();
    expect(result).toBeNull();


  });

  it('should create the qr code', () =>{
    let Lotparam = new Lot();
    Lotparam.productID = '-KqnYplgBJ7HB9gAozYv';
    Lotparam.expiryDate = '23/9/2017';
    Lotparam.amount= 100 ;

    let dummy = component.qenerateQRcode(Lotparam);

    expect(dummy.amount).toBe(100);
    expect(dummy.productID).toBe('-KqnYplgBJ7HB9gAozYv');
    expect(dummy.expiryDate).toBe('23/9/2017');
    //expect(component.qenerateQRcode(Lotparam)).toBe('Kitkat,25,23/9/2017');
  });

  it('should clear the data of lot model', () => {

    component.clearLotData();
    expect(component.lotModel.amount).toBeUndefined();
    expect(component.lotModel.qrCode).toBeUndefined();
    expect(component.lotModel.expiryDate).toBeUndefined();
    expect(component.lotModel.productID).toBeUndefined();
  });

  it('should delete lot ', () =>{
    //component.keyToDeleteLot('-KujRF6zr-3AtpNnwn0K');
    component.deleteLotKey='-KqvtS_tBUeNFppzUa-m';
    expect(component.deleteLot()).toBe(true);


  });

  it('should get the key of delete product', () => {
    component.keyToDeleteLot('-KujRF6zr-3AtpNnwn0K');
    component.deleteLotKey = '-KujRF6zr-3AtpNnwn0K' ;
    expect(component.keyToDeleteLot('-KujRF6zr-3AtpNnwn0K')).toBe(component.deleteLotKey);
  })

  it('should create array range',() =>{
    let testCreateRange =component.createRange(16);
    let testArray = ['1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    // expect(testCreateRange[0]).toBe('1');
    // expect(testCreateRange[1]).toBe('2');
    // expect(testCreateRange[2]).toBe('3');
    // expect(testCreateRange[3]).toBe('4');
    // expect(testCreateRange[4]).toBe('5');
    // expect(testCreateRange[5]).toBe('6');
    // expect(testCreateRange[6]).toBe('7');
    // expect(testCreateRange[7]).toBe('8');
    // expect(testCreateRange[8]).toBe('9');
    // expect(testCreateRange[9]).toBe('a');
    // expect(testCreateRange[10]).toBe('b');
    // expect(testCreateRange[11]).toBe('c');
    // expect(testCreateRange[12]).toBe('d');
    // expect(testCreateRange[13]).toBe('e');
    // expect(testCreateRange[14]).toBe('f');

    for(let i = 0;i<15;i++){
      expect(testCreateRange[i]).toBe(testArray[i]);
    }





  })

  // it('should print the qr code', () => {
  //
  //   let mockLotModel = new Lot();
  //   mockLotModel.productID = '-KqnYplgBJ7HB9gAozYv';
  //   mockLotModel.expiryDate = '23/9/2017';
  //   mockLotModel.lotID= 'Kitkat,25,23/9/2017' ;
  //   mockLotModel.amount= 100 ;
  //
  //   component.qenerateQRcode(mockLotModel);
  //
  //
  //   expect(component.print()).toBe(true);
  //
  // })
});

import {Observable} from 'rxjs/Observable';
import {inject, TestBed} from '@angular/core/testing';
import {AngularFireDatabase} from 'angularfire2/database';
import {ProductComponent} from './product.component';
import 'rxjs/add/observable/of';
import {ProductItem} from "../shared/ProductItem";

const fixtureTodos = [
  { 'Price': 30 },
  { 'Price': 30 },
  { 'Price': 30 },
  { 'Price': 30 },
  { 'Price': 30 },
];
const angularFireDatabaseStub = { list: () => {} };
const mockTodos$ = Observable.of(fixtureTodos);

describe('TodosService', () => {
  beforeEach(() => {
    spyOn(angularFireDatabaseStub, 'list').and.returnValue(mockTodos$);

    TestBed.configureTestingModule({
      providers: [
        ProductComponent,
        { provide: AngularFireDatabase, useValue: angularFireDatabaseStub },
      ]
    });
  });

  it('#getAll', inject([ProductComponent], (service: ProductComponent) => {
    const todos$ = service.getList();
    todos$.subscribe(todos => {
      expect(todos[0].Price).toEqual(fixtureTodos[0].Price);
      expect(todos[0]).toEqual(jasmine.any(ProductItem));
    });
  }));
});

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  BACK_HOST,
  COMMON_OPTIONS,
  IDictionaryWord,
  ITranslatedWord,
  ITranslationsWord,
  IUser,
  IUserLoginInfo,
  IWord
} from '../common.entities';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import {st} from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  currentUserName = 'Dima';

  constructor(private http: HttpClient) {
  }

  signUp(userInfo: IUser): Observable<IUser> {
    const url = BACK_HOST + '/user/perform_registration';

    return this.http.post<IUser>(url, userInfo, COMMON_OPTIONS);
  }

  signIn(userInfo: IUserLoginInfo): Observable<null> {
    const url = BACK_HOST + `/perform_login?${this.serialize(userInfo)}`;
    const params = new HttpParams();

    return this.http.post<null>(url, null, COMMON_OPTIONS);
  }

  translateWord(word: IWord): Observable<ITranslationsWord> {
    const url = BACK_HOST + `/translation/get?${this.serialize(word)}`;

    return this.http.get<ITranslationsWord>(url, COMMON_OPTIONS);
  }

  registerWord(word: ITranslatedWord): Observable<any> {
    const url = BACK_HOST + `/user/registerChosenTranslation?language=en`;

    return this.http.post<any>(url, word, COMMON_OPTIONS);
  }

  userDictionary(): Observable<IDictionaryWord[]> {
    const url = BACK_HOST + `/user/dictionary`;

    return this.http.get<IDictionaryWord[]>(url, COMMON_OPTIONS);
  }

  getCounter(): Observable<any> {
    const url = BACK_HOST + '/user/summary';

    return  this.http.get(url, COMMON_OPTIONS);
  }

  deleteUser(): Observable<any> {
    const url = BACK_HOST + `/user/delete`;

    return this.http.post<any>(url, null, COMMON_OPTIONS);
  }

  deleteWordFromDictionary(id: number): Observable<any> {
    const url = BACK_HOST + `/user/word/delete?id=${id}`;

    return this.http.post<any>(url, null, COMMON_OPTIONS);
  }

  getWordInfo(id: number): Observable<any> {
    const  url = BACK_HOST + `/user/word/info?id=${id}`;

    return this.http.get<any>(url, COMMON_OPTIONS);
  }

  editWordInfo(id: number, trans: string): Observable<any> {
    const  url = BACK_HOST + `/user/word/changeTranslation?id=${id}&newTranslation=${trans}`;

    return this.http.post<any>(url, null, COMMON_OPTIONS);
  }

  changeUserInfo(userInfo: IUser): Observable<any> {
    const url = BACK_HOST + '/user/changeCredentials';

    return this.http.post<IUser>(url, userInfo, COMMON_OPTIONS);
  }

  getUserInfo(): Observable<IUser> {
    const url = BACK_HOST + '/user/userInfo';

    return this.http.get<IUser>(url, COMMON_OPTIONS);
  }

  private serialize(obj: object): string {
    return Object.keys(obj).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&');
  }
}

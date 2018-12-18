import {HttpHeaders} from '@angular/common/http';

export const BACK_HOST = 'http://52.59.255.131:8080';

export const COMMON_OPTIONS = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': BACK_HOST,
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': [ 'Content-Type', '*']
  }),
  withCredentials: true
};

export interface IUser {
  nickName: string;
  email: string;
  password?: string;
  firstName: string;
  secondName: string;
}

export interface IUserLoginInfo {
  password: string;
  username: string;
}

export interface IWord {
  word: string;
  from: string;
  to: string;
}

export interface ITranslation {
  translation: string;
  partOfSpeech: string;
}

export interface ITranslationsWord {
  text: string;
  translations: ITranslation[];
}

export interface ITranslatedWord {
  text: string;
  translation: ITranslation;
}

export interface IDictionaryWord {
  levelOfKnowledge: string;
  word: string;
}

export interface IGameTranslation {
  rightTranslation: string;
  word: string;
  wordId: 0;
  wrongTranslations: string[];
}

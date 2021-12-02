import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Observable, of} from 'rxjs';
import {CurrencyPipe, registerLocaleData} from '@angular/common';
import localeAr from '@angular/common/locales/de';
import localeArabicExtra from '@angular/common/locales/extra/de';
import localeEn from '@angular/common/locales/en';
import localeEnglishExtra from '@angular/common/locales/extra/en';
import arTranslation from '../assets/i18n/ar.json';
import enTranslation from '../assets/i18n/en.json';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


registerLocaleData(localeAr, 'ar-Ar', localeArabicExtra);
registerLocaleData(localeEn, 'en-EN', localeEnglishExtra);

export class CustomLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations[lang]);
  }
}

const translations = {
  de: arTranslation,
  en: enTranslation
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

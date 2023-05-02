import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { AuthService } from './services/auth/auth.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ConfigService } from './services/configService/config.service';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RestInterceptorsService } from './services/interceptors/rest-interceptors.service';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true},
 
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config)
  });
}

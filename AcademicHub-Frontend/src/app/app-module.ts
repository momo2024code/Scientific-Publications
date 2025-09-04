import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { BibtexViewer } from './pages/bibtex-viewer/bibtex-viewer';
import { MainNavbar } from './components/main-navbar/main-navbar';
import { MainFooter } from './components/main-footer/main-footer';
import { Home } from './pages/home/home';
import { Publications } from './pages/publications/publications';
// @ts-ignore
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { PublicationDetail } from './components/publications/publication-detail/publication-detail';

@NgModule({
  declarations: [
    App,
    BibtexViewer,
    MainNavbar,
    MainFooter,
    Home,
    Publications,
    PublicationDetail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {BibtexViewer} from './pages/bibtex-viewer/bibtex-viewer';
import {Publications} from './pages/publications/publications';
import {PublicationDetail} from "./components/publications/publication-detail/publication-detail";

const routes: Routes = [

  { path: '', component: Home },
  { path: 'upload', component: BibtexViewer },

  { path: 'publications', component: Publications },
    { path: 'publications/:citationKey', component: PublicationDetail }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

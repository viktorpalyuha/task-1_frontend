import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './games/game/game.component';
import { SearchComponent } from './shared/search/search.component';
import { PillsComponent } from './shared/pills/pills.component';
import { PillComponent } from './shared/pills/pill/pill.component';
import { SelectComponent } from './shared/select/select.component';
import { SortComponent } from './games/sort/sort.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GamesComponent,
    GameComponent,
    SearchComponent,
    PillsComponent,
    PillComponent,
    SelectComponent,
    SortComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { socketIoConfig } from './socketIo.config';
import { TokenInterceptor } from './auth/token.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
import { StatisticsComponent } from './statistics/statistics.component';
import { FormComponent } from './auth/form/form.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ChatComponent } from './chat/chat.component';
import { SocketIoModule } from 'ngx-socket-io';

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
    StatisticsComponent,
    FormComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(socketIoConfig),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

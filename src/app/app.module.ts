import { CodeComponent } from './code/code.component';
import { BlocklyComponent } from './blockly/blockly.component';
import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AngularSplitModule } from 'angular-split';
import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SvgComponent } from './virtual-circuit/svg/svg.component';
import { ContainerComponent } from './container/container.component';
import { VariablesComponent } from './variables/variables.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTabsModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSliderModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
} from '@angular/material';
import { FramePlayer } from './core/services/player/frame/frame_player';
import { WebMenuComponent } from './web-menu/web-menu.component';
import { ElectronMenuComponent } from './electron-menu/electron-menu.component';
import { SettingsComponent } from './settings/settings.component';
import { ToolboxComponent } from './settings/toolbox/toolbox.component';
import { HelpComponent } from './settings/help/help.component';
import { AboutComponent } from './settings/about/about.component';
import { BugComponent } from './settings/bug/bug.component';
import { StepsComponent } from './virtual-circuit/steps/steps.component';
import { OutputComponent } from './arduino/output/output.component';
import { StateComponent } from './arduino/state/state.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BlocklyComponent,
    CodeComponent,
    PlayerComponent,
    SvgComponent,
    ContainerComponent,
    VariablesComponent,
    WebMenuComponent,
    ElectronMenuComponent,
    SettingsComponent,
    ToolboxComponent,
    HelpComponent,
    AboutComponent,
    BugComponent,
    StepsComponent,
    OutputComponent,
    StateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    AngularSplitModule.forRoot(),
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: FramePlayer,
      useClass: FramePlayer,
      multi: false
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

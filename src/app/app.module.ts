import { CodeComponent } from './components/code/code.component';
import { BlocklyComponent } from './components/blockly/blockly.component';
import 'reflect-metadata';
import '../polyfills';
import { ColorPickerModule } from 'ngx-color-picker';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgZone } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularSplitModule } from 'angular-split';
import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { SvgComponent } from './components/virtual-circuit/svg/svg.component';
import { ContainerComponent } from './components/container/container.component';

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
  MatListModule,
  MatTooltipModule,
  MatMenuModule,
  MatProgressBarModule
} from '@angular/material';
import { FramePlayer } from './services/player/frame_player';
import { MenuComponent } from './components/menu/menu.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ToolboxComponent } from './components/settings/toolbox/toolbox.component';
import { HelpComponent } from './components/settings/help/help.component';
import { AboutComponent } from './components/settings/about/about.component';
import { BugComponent } from './components/settings/bug/bug.component';
import { StepsComponent } from './components/virtual-circuit/steps/steps.component';
import { ArduinoMessageComponent } from './components/arduino/arduino-message/arduino-message.component';
import { ArduinoDebugComponent } from './components/arduino/arduino-debug/arduino-debug.component';
import { AdvancedComponent } from './components/settings/advanced/advanced.component';
import { DeviceCommunicator } from './services/communicators/device/device.communicator';
import { WebCommunicator } from './services/communicators/device/web.communicator';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ElectronCommunicator } from './services/communicators/device/electron.communicator';
import { WebviewDirective } from './directives';
import { Router } from '@angular/router';
import { BlocklyService } from './services/blockly/blockly.service';
import { LessonComponent } from './components/lesson/lesson.component';

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
    PageNotFoundComponent,
    SvgComponent,
    ContainerComponent,
    MenuComponent,
    SettingsComponent,
    ToolboxComponent,
    HelpComponent,
    AboutComponent,
    BugComponent,
    StepsComponent,
    ArduinoMessageComponent,
    ArduinoDebugComponent,
    AdvancedComponent,
    WebviewDirective,
    LessonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ColorPickerModule,
    AngularSplitModule.forRoot(),
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
    MatProgressBarModule,
    MatTooltipModule,
    MatListModule,
    MatMenuModule,
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
    },
    {
      provide: DeviceCommunicator,
      useFactory(
        router: Router,
        ngZone: NgZone,
        blocklyService: BlocklyService
      ) {
        if (ElectronCommunicator.isElectron) {
          return new ElectronCommunicator(router, ngZone, blocklyService);
        }

        return new WebCommunicator();
      },
      multi: false,
      deps: [Router, NgZone, BlocklyService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

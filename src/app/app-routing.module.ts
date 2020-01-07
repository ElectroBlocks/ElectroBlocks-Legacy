import { ContainerComponent } from './components/container/container.component';
import { CodeComponent } from './components/code/code.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './components/player/player.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ToolboxComponent } from './components/settings/toolbox/toolbox.component';
import { BugComponent } from './components/settings/bug/bug.component';
import { HelpComponent } from './components/settings/help/help.component';
import { AboutComponent } from './components/settings/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdvancedComponent } from './components/settings/advanced/advanced.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LessonComponent } from './components/lesson/lesson.component';

const isElectron =
  (window && window.process && window.process.type) !== undefined;

const routes: Routes = [
  {
    path: 'settings',
    data: {
      showBottom: false,
      ignoreBottom: true,
      showRunLoopOption: false
    },
    component: SettingsComponent,
    pathMatch: 'prefix',
    children: [
      {
        component: HelpComponent,
        path: 'help',
        outlet: 'settingContainer',
        data: { settingSelected: 'help' }
      },
      {
        component: ToolboxComponent,
        path: 'toolbox',
        outlet: 'settingContainer',
        data: { settingSelected: 'toolbox' }
      },
      {
        component: AdvancedComponent,
        path: 'advanced',
        outlet: 'settingContainer',
        data: { settingSelected: 'advanced' }
      },
      {
        component: AboutComponent,
        path: 'about',
        outlet: 'settingContainer',
        data: { settingSelected: 'about' }
      },
      {
        component: BugComponent,
        path: 'bug',
        outlet: 'settingContainer',
        data: { settingSelected: 'bug' }
      },
      {
        component: ToolboxComponent,
        path: '',
        outlet: 'settingContainer',
        data: { settingSelected: 'toolbox' }
      }
    ]
  },
  {
    path: 'code-web',
    data: {
      showBottom: false,
      ignoreBottom: false,
      showRunLoopOption: false
    },
    component: CodeComponent
  },
  {
    path: '',
    data: {
      showBottom: true,
      ignoreBottom: false,
      showRunLoopOption: true,
      containerMode: 'Virtual-Circuit'
    },
    component: ContainerComponent
  },
  {
    path: 'lessons/:lesson_name/:part',
    component: LessonComponent,
    data: {
      showBottom: false,
      ignoreBottom: false,
      showRunLoopOption: false,
      scrollable: true
    }
  },
  {
    path: 'lessons/:lesson_name',
    component: LessonComponent,
    data: {
      showBottom: false,
      ignoreBottom: false,
      showRunLoopOption: false,
      scrollable: true
    }
  },
  {
    path: 'lessons',
    redirectTo: 'lessons/lesson-1-arduino-introduction'
  },
  {
    path: 'arduino',
    data: {
      showBottom: false,
      ignoreBottom: true,
      showRunLoopOption: false,
      containerMode: 'Arduino'
    },
    component: ContainerComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    data: {
      showBottom: true,
      ignoreBottom: false,
      showRunLoopOption: true,
      containerMode: 'Virtual-Circuit'
    },
    component: PlayerComponent,
    outlet: 'bottom',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuComponent,
    outlet: 'topMenu'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { showBottom: false, ignoreBottom: true }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: isElectron })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

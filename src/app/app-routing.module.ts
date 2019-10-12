import { WebMenuComponent } from './web-menu/web-menu.component';
import { VirtualCircuitContainerComponent } from './virtual-circuit/virtual-circuit-container/virtual-circuit-container.component';
import { CodeComponent } from './code/code.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { PlayerComponent } from './player/player.component';

const isElectron =
  (window && window.process && window.process.type) !== undefined;

const routes: Routes = [
  {
    path: 'code-web',
    data: { showBottom: false, ignoreBottom: false, showRunLoopOption: false },
    pathMatch: 'full',
    children: [
      {
        component: CodeComponent,
        path: ''
      },
      {
        path: '',
        component: WebMenuComponent,
        outlet: 'topMenu',
        data: { ignoreBottom: true }
      }
    ]
  },
  {
    path: '',
    data: { showBottom: true, ignoreBottom: false, showRunLoopOption: true },
    pathMatch: 'full',
    children: [
      {
        path: '',
        component: VirtualCircuitContainerComponent
      },
      {
        path: '',
        component: PlayerComponent,
        outlet: 'bottom'
      },
      {
        path: '',
        component: WebMenuComponent,
        outlet: 'topMenu'
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { showBottom: false, ignoreBottom: false }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: isElectron })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

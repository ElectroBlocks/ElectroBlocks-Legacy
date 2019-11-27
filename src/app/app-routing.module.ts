import { WebMenuComponent } from "./web-menu/web-menu.component";
import { ContainerComponent } from "./container/container.component";
import { CodeComponent } from "./code/code.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";
import { PlayerComponent } from "./player/player.component";
import { SettingsComponent } from "./settings/settings.component";
import { ToolboxComponent } from "./settings/toolbox/toolbox.component";
import { BugComponent } from "./settings/bug/bug.component";
import { HelpComponent } from "./settings/help/help.component";
import { AboutComponent } from "./settings/about/about.component";
import { ElectronMenuComponent } from "./electron-menu/electron-menu.component";

const isElectron =
  (window && window.process && window.process.type) !== undefined;

const menuComponent = isElectron ? ElectronMenuComponent : WebMenuComponent;

const routes: Routes = [
  {
    path: "settings",
    data: {
      showBottom: false,
      ignoreBottom: true,
      showRunLoopOption: false
    },
    component: SettingsComponent,
    pathMatch: "prefix",
    children: [
      {
        component: HelpComponent,
        path: "help",
        outlet: "settingContainer",
        data: { settingSelected: "help" }
      },
      {
        component: ToolboxComponent,
        path: "toolbox",
        outlet: "settingContainer",
        data: { settingSelected: "toolbox" }
      },
      {
        component: AboutComponent,
        path: "about",
        outlet: "settingContainer",
        data: { settingSelected: "about" }
      },
      {
        component: BugComponent,
        path: "bug",
        outlet: "settingContainer",
        data: { settingSelected: "bug" }
      },
      {
        component: ToolboxComponent,
        path: "",
        outlet: "settingContainer",
        data: { settingSelected: "toolbox" }
      }
    ]
  },
  {
    path: "code-web",
    data: {
      showBottom: false,
      ignoreBottom: false,
      showRunLoopOption: false
    },
    component: CodeComponent
  },
  {
    path: "",
    data: {
      showBottom: true,
      ignoreBottom: false,
      showRunLoopOption: true,
      containerMode: "Virtual-Circuit"
    },
    component: ContainerComponent
  },
  {
    path: "arduino",
    data: {
      showBottom: false,
      ignoreBottom: true,
      showRunLoopOption: false,
      containerMode: "Arduino"
    },
    component: ContainerComponent,
    pathMatch: "full"
  },
  {
    path: "",
    data: {
      showBottom: true,
      ignoreBottom: false,
      showRunLoopOption: true,
      containerMode: "Virtual-Circuit"
    },
    component: PlayerComponent,
    outlet: "bottom",
    pathMatch: "full"
  },
  {
    path: "",
    component: menuComponent,
    outlet: "topMenu"
  },
  {
    path: "**",
    component: PageNotFoundComponent,
    data: { showBottom: false, ignoreBottom: false }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: isElectron })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

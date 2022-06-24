import { enableProdMode } from "@angular/core";
import { environment } from "./environments/environment";
import { AppComponent } from "./app/app.component";

if (environment.production) {
  enableProdMode();
}

AppComponent.bootstrap();

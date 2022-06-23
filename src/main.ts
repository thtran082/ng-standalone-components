import { enableProdMode } from "@angular/core";
import { environment } from "./environments/environment";
import { AppComponent } from "./app/shared/app.component";

if (environment.production) {
  enableProdMode();
}

AppComponent.bootstrap();

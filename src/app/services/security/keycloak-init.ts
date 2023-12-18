import { KeycloakService } from "keycloak-angular";
import { AuthService } from "./auth.service";

export function initializeKeycloak(keycloak: KeycloakService, auth: AuthService) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8080',
          realm: 'policianacional',
          clientId: 'gestion-vehicular'
        },
        initOptions: {
          responseMode: "fragment",
          flow: "standard",
          checkLoginIframe: false
        }
      }).then((initialized) => {
          if (initialized) {
            keycloak.getToken().then((token) => {
              auth.setToken(token);
            });
            keycloak.loadUserProfile().then((profile) => {
              auth.setUserStorage(profile);
            });
          }
      });
}

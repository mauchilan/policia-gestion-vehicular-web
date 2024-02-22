import { KeycloakConfig } from "keycloak-js";
import { KeycloakAuthzInitOptions } from "./keycloak.authz.init.options";

export class KeycloakAuthzOptions {

    config?: KeycloakConfig;
    
    /**
     * Options to initialize the adapter. Used by keycloak-js.
     */
    initOptions?: KeycloakAuthzInitOptions;

}

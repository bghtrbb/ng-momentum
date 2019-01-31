import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
/**
 * Create View guard for view access and data preloading.
 */
export class New<%= classify(singularize(name)) %>Guard implements CanActivate {

  /**
   * Method to determine if we can activate the view based on custom logic.
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {Observable<boolean> | Promise<boolean> | boolean}
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    <% if (backendApiType.toString() === 'http') { %>
    return true;
    <% } %>
    <% if (backendApiType.toString() === 'appsync') { %>
    if (environment.production) {
        return new Promise((resolve, reject) => {
            Auth.currentAuthenticatedUser({
                bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
            }).then(user => {
                // console.log('Logged In: ' + user);
                resolve(true);
            }).catch(err => {
                // console.log('Auth Err: ' + err);
                resolve(false);
            });
        });
    } else {
        // console.log('Auth Bypassed - Is Prod: ' + environment.production);
        return true;
    }
    <% } %>
  }
}

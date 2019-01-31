import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
<% if (backendApiType.toString() === 'appsync') { %>
import * as AppSyncApiService from '../../API.service';
import {Auth} from 'aws-amplify';
import {environment} from '../../../environments/environment';
<% } %>
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';
import {<%= classify(pluralize(service)) %>Service} from '<%= absoluteSrcPath(servicePath) %>/<%= dasherize(pluralize(service)) %>.service';

@Injectable()
/**
 * List View guard for view access and data preloading.
 */
export class <%= classify(pluralize(name)) %>ListGuard implements CanActivate, Resolve<<%= classify(singularize(vo)) %>[]> {

  /**
   * Component constructor and DI injection point.
   * @param {<%= classify(pluralize(service)) %>Service} service
   */
  constructor(private service: <%= classify(pluralize(service)) %>Service) {
  }

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

  /**
   * Preloads data prior to activating view. Loaded data is accessible to component.
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<<%= classify(singularize(vo)) %>[]> | Promise<<%= classify(singularize(vo)) %>[]>}
   */
  <% if (backendApiType.toString() === 'http') { %>
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<<%= classify(singularize(vo)) %>[]> | Promise<<%= classify(singularize(vo)) %>[]> {
    return this.service.list();
  }
  <% } %>
  <% if (backendApiType.toString() === 'appsync') { %>
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<AppSyncApiService.List<%= camelCase(pluralize(vo)) %>Query> | Promise<AppSyncApiService.List<%= camelCase(pluralize(vo)) %>Query> {
    return this.service.list();
  }
  <% } %>
}

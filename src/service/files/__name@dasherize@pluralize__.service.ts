import { Injectable, Optional } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
<% if (backendApiType.toString() === 'appsync') { %>
import * as AppSyncApiService from '../../API.service';
import {Auth} from 'aws-amplify';
import {environment} from '../../../environments/environment';
<% } %>
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= camelCase(singularize(vo)) %>';

<% if (backendApiType.toString() === 'http') { %>
<% } %>
<% if (backendApiType.toString() === 'appsync') { %>
<% } %>
	/**
 * Config class to be wired into an injector.
 * @see CoreModule#forRoot
 * @see https://angular.io/guide/dependency-injection#optional-dependencies
 */
export class <%= classify(pluralize(name)) %>ServiceConfig {
	<% if (backendApiType.toString() === 'http') { %>
	uri = '';
	<% } %>
}
@Injectable()
/**
 * Service class.
 */
export class <%= classify(pluralize(name)) %>Service {
	
	<% if (backendApiType.toString() === 'http') { %>
    /**
     * Path uri.
     * @type {string}
     * @private
     */
     private _uri = '<%= uri %>';

    /**
     * Url to endpoint api.
     * @type {string}
     */
     private endpoint = '<%= endpoint %>';

    /**
     * Endpoint request headers.
     * @type {HttpHeaders}
     */
     private headers = new HttpHeaders({'Content-Type': 'application/json'});
	<% } %>
	
    /**
     * Component constructor and DI injection point.
     * @param {HttpClient} http
     * @param {<%= classify(pluralize(name)) %>ServiceConfig} config
     */
    <% if (backendApiType.toString() === 'http') { %>
    constructor(private http: HttpClient, @Optional() config: <%= classify(pluralize(name)) %>ServiceConfig) {
        if (config) {
            this._uri = config.uri;
        }
    }
    <% } %>
    <% if (backendApiType.toString() === 'appsync') { %>
    constructor(private appsyncApiService: AppSyncApiService.APIService, @Optional() config: <%= classify(pluralize(name)) %>ServiceConfig) {
    }
    <% } %>
<% if(operations.indexOf('l')>-1){ %>
    /**
     * Pulls a list of <%= classify(singularize(vo)) %> objects.
     * @returns {Observable<<%= classify(singularize(vo)) %>[]>}
     */
    <% if (backendApiType.toString() === 'http') { %>
    list(): Observable<<%= classify(singularize(vo)) %>[]> {
		return this.http.get<<%= classify(singularize(vo)) %>[]>(`${this._uri}${this.endpoint}<%= suffix %>`);
    }
    <% } %>
	<% if (backendApiType.toString() === 'appsync') { %>
    list(): Observable<AppSyncApiService.List<%= camelCase(pluralize(vo)) %>Query> {
		return from(this.appsyncApiService.List<%= camelCase(pluralize(vo)) %>());
    }
    <% } %>
<% } %>
<% if(operations.indexOf('r')>-1){ %>
    /**
     * Pulls a single <%= classify(singularize(vo)) %> object.
     * @param {number | string} id to retrieve.
     * @returns {Observable<<%= classify(singularize(vo)) %>>}
     */
    <% if (backendApiType.toString() === 'http') { %>
    show(id: number | string): Observable<<%= classify(singularize(vo)) %>> {
		const url = `${this._uri}${this.endpoint}/${id}<%= suffix %>`;
		return this.http.get <<%= classify(singularize(vo)) %>> (url);
    }
    <% } %>
	<% if (backendApiType.toString() === 'appsync') { %>
	show(id: string): Observable<AppSyncApiService.Get<%= classify(singularize(vo)) %>Query> {
		return from(this.appsyncApiService.Get<%= camelCase(singularize(vo)) %>(id));
    }
	<% } %>
<% } %>
<% if(operations.indexOf('c')>-1){ %>
    /**
     * Creates a single <%= classify(singularize(vo)) %> object.
     * @param {} value to create.
     * @returns {Observable<<%= classify(singularize(vo)) %>>}
     */
    <% if (backendApiType.toString() === 'http') { %>
	create(value: <%= classify(singularize(vo)) %>): Observable<<%= classify(singularize(vo)) %>> {
        return this.http.post<<%= classify(singularize(vo)) %>>(`${this._uri}${this.endpoint}<%= suffix %>`, JSON.stringify(value), {headers: this.headers});
    }
	<% } %>
	<% if (backendApiType.toString() === 'appsync') { %>
	create(value: AppSyncApiService.Create<%= camelCase(singularize(vo)) %>Input): Observable<AppSyncApiService.Create<%= camelCase(singularize(vo)) %>Input> {
		return from(this.appsyncApiService.Create<%= camelCase(singularize(vo)) %>(value));
	}
	<% } %>
<% } %>
<% if(operations.indexOf('u')>-1){ %>
    /**
     * Updates a single <%= classify(singularize(vo)) %> object.
     * @param {} value to update.
     * @returns {Observable<<%= classify(singularize(vo)) %>>}
     */
    <% if (backendApiType.toString() === 'http') { %>
	update(value: <%= classify(singularize(vo)) %>): Observable<<%= classify(singularize(vo)) %>> {
        const url = `${this._uri}${this.endpoint}/${value.id}<%= suffix %>`;
        return this.http.put<<%= classify(singularize(vo)) %>>(url, JSON.stringify(value), {headers: this.headers});
    }
	<% } %>
	<% if (backendApiType.toString() === 'appsync') { %>
	update(value: AppSyncApiService.Update<%= camelCase(singularize(vo)) %>Input): Observable<AppSyncApiService.Update<%= camelCase(singularize(vo)) %>Input> {
		return from(this.appsyncApiService.Update<%= camelCase(singularize(vo)) %>(value));
	}
	<% } %>
<% } %>
<% if(operations.indexOf('d')>-1){ %>
    /**
     * Destroys a single <%= classify(singularize(vo)) %> object.
     * @param {number | string} id to destroy.
     * @returns {Observable<void>}
     */
    <% if (backendApiType.toString() === 'http') { %>
	destroy(id: number | string): Observable<void> {
        const url = `${this._uri}${this.endpoint}/${id}<%= suffix %>`;
        return this.http.delete<void>(url, {headers: this.headers});
    }
	<% } %>
	<% if (backendApiType.toString() === 'appsync') { %>
	destroy(id: AppSyncApiService.Delete<%= camelCase(singularize(vo)) %>Input): Observable<AppSyncApiService.Delete<%= camelCase(singularize(vo)) %>Input> {
		return from(this.appsyncApiService.Delete<%= camelCase(singularize(vo)) %>(id));
	}
	<% } %>
<% } %>

}

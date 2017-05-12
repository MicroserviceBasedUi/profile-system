//import {computedFrom} from 'aurelia-framework';

import { lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

// polyfill fetch client conditionally
const fetchPolyfill = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

export class Welcome {
  heading: string = 'Welcome to the Zühlke User Profile System';
  searchTerm: string = '';
  previousValue: string = this.searchTerm;
  users: Array<IUser>;

  http: HttpClient;

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  // get fullName(): string {
  //   return `${this.firstName} ${this.lastName}`;
  // }

  constructor( @lazy(HttpClient) private getHttpClient: () => HttpClient) { }

  async activate(): Promise<void> {
    // ensure fetch is polyfilled before we create the http client
    await fetchPolyfill;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:9001');
    });
  }

  async search() {
    this.previousValue = this.searchTerm;

    if (this.searchTerm === '') {
      this.users = new Array();
      return;
    }

    const response = await this.http.fetch(`/employees/search?term=${this.searchTerm}`);
    this.users = await response.json();

    this.users.forEach(user => {
      user.ProfilePictureUrl = `http://localhost:9001/employees/${user.Id}/picture`;
    });
  }
}

export class UpperValueConverter {
  toView(value: string): string {
    return value && value.toUpperCase();
  }
}


interface IUser {
  Id: number;
  Code: string;
  FirstName: string;
  LastName: string;
  // company: string;
  // currency: string;
  // superior: Superior;
  // qualification: string;
  // location: string;
  // mail: string;
  // title: string;
  // officeId: number;
  // workDayHours: number;
  // isManagement: boolean;
  // isUserOverride: boolean;
  // isExternalMode: boolean;
  ProfilePictureUrl: string;
}

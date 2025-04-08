import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function createApollo(): ApolloClientOptions<any> {
  return {
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideApollo(createApollo),
    importProvidersFrom(FormsModule, ReactiveFormsModule)
  ]

  
};


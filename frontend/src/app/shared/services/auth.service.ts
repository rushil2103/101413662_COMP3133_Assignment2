import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'auth-token';

  constructor(private apollo: Apollo) {}

  // 🔐 Login
  login(email: string, password: string): Observable<boolean> {
    const LOGIN_MUTATION = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `;

    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password }
    }).pipe(
      map((result: any) => {
        const token = result?.data?.login?.token;
        if (token) {
          localStorage.setItem(this.TOKEN_KEY, token);
          return true;
        }
        return false;
      })
    );
  }

  // 📝 Signup
  signup(email: string, password: string, name: string): Observable<boolean> {
    const SIGNUP_MUTATION = gql`
      mutation Signup($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
          token
        }
      }
    `;

    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { email, password, name }
    }).pipe(
      map((result: any) => {
        const token = result?.data?.signup?.token;
        if (token) {
          localStorage.setItem(this.TOKEN_KEY, token);
          return true;
        }
        return false;
      })
    );
  }

  // 🚪 Logout
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // ✅ Is user logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // 🎟️ Get token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}

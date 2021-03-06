import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class SignupService {
  constructor(private _http: HttpClient) {}

  header = new HttpHeaders({
    "Content-Type": "application/json",
    "x-auth-token": sessionStorage.getItem("x-auth-token")
  });

  otpVerify(value) {
    return this._http.post("/user/otpVerify",
      {otp: value.otp},
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("x-auth-token")
        },
        responseType: "text",
        observe: "response"
      }
    ) .pipe(catchError(this.errorHandler));;
  }

  signup(value) {
    return this._http
      .post(
        "/user/userSignup",
        {
          userName: value.userName,
          userPhone: value.phone,
          userEmail: value.email,
          userPassword: value.password,
          userAadhar: value.aadharNo
        },
        { responseType: "text", observe: "response" }
      )
      .pipe(catchError(this.errorHandler));
  }

  resendOTP(){
    return this._http.get('/user/resendOtp',{
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("x-auth-token")
      },
      responseType: "text",
      observe: "response"
    }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error || "Error");
  }
}

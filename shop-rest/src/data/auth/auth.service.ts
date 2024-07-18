import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export type LoginInputType = {
	email: string;
	password: string;
};

//otp login
export type OtpLoginInputType = {
	phone_number: number;
	// otp: string;
};

export type RegisterUserInputType = {
	name: string;
	email: string;
	password: string;
	invited_by:number;
	phone_number:number;
	current_location: string;
	occupation: string;
	gender:string;
	date_of_birth:Date;
};


export type VerifyUserInputType = {
	id: string;
	code: string;
};

export type ChangePasswordInputType = {
	oldPassword: string;
	newPassword: string;
};

export type ForgetPasswordInputType = {
	email: string;
};

export type CodeInputType = {
	id: string;
};

///verifyOtpInputType

export type ResetPasswordInputType = {
	email: string;
	token: string;
	password: string;
};
export type VerifyPasswordInputType = {
	email: string;
	token: string;
};
export type SocialLoginInputType = {
	provider: string;
	access_token: string;
};

class Auth extends CoreApi {
	login(input: LoginInputType) {
		return this.http.post(API_ENDPOINTS.LOGIN, input).then((res) => res.data);
	}
	socialLogin(input: SocialLoginInputType) {
		return this.http
			.post(API_ENDPOINTS.SOCIAL_LOGIN, input)
			.then((res) => res.data);
	}
	register(input: RegisterUserInputType) {
		return this.http
			.post(API_ENDPOINTS.REGISTER, input)
			.then((res) => res.data);
	}
	otpRegister(input: OtpLoginInputType) {
		return this.http
			.post(API_ENDPOINTS.OTP_REGISTER, input)
			.then((res) => res.data);
	}
	verfiy(input: VerifyUserInputType) {
		return this.http
			.post(API_ENDPOINTS.USER_VERIFY, input)
			.then((res) => res.data);
	}
	//otpLogin
	otpLogin(input: OtpLoginInputType) {
		return this.http
			.post(API_ENDPOINTS.OTP_LOGIN, input)
			.then((res) => res.data);
	}
	logout() {
		return this.http.post(API_ENDPOINTS.LOGOUT);
	}
	changePassword(input: ChangePasswordInputType) {
		return this.http
			.post(API_ENDPOINTS.CHANGE_PASSWORD, input)
			.then((res) => res.data);
	}
	forgetPassword(input: ForgetPasswordInputType) {
		return this.http
			.post(API_ENDPOINTS.FORGET_PASSWORD, input)
			.then((res) => res.data);
	}
	resetPassword(input: ResetPasswordInputType) {
		return this.http
			.post(API_ENDPOINTS.RESET_PASSWORD, input)
			.then((res) => res.data);
	}

	//verifyOtpToken
	verifyOtpToken(input: CodeInputType) {
		return this.http
			.post(API_ENDPOINTS.VERIFY_OTP_TOKEN, input)
			.then((res) => res.data);
	}
	verifyForgetPassword(input: VerifyPasswordInputType) {
		return this.http
			.post(API_ENDPOINTS.VERIFY_FORGET_PASSWORD, input)
			.then((res) => res.data);
	}
}

export const AuthService = new Auth("auth");

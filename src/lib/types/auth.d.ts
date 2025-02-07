declare type User = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  passwordResetCode: string;
  passwordResetExpires: string;
  resetCodeVerified: boolean;
  passwordChangedAt: string;
};

declare type LoginForm = {
  email: string;
  password: string;
};
declare type RegisterForm = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};
declare type EmailForm = {
  email: string;
};
declare type VerifyForm = {
  resetCode: string;
};

declare type ResetPasswordForm = {
  email: string;
  newPassword: string;
};
declare type RegisterResponse = {
  user: User;
};

declare type LoginResponse = {
  token: string;
  user: User;
};

declare type ReceiveOtpRespone = {
  message: string;
  info: string;
};

declare type verifyResetCodeResponse = {
  status: "Success";
  message?: string;
};

declare type ResetPasswordResponse = {
  message: "success";
  token: string;
};

declare type LogOutResponse = {
  message: "success";
};

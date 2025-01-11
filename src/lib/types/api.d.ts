declare type SuccessfullResponse<T> = {
    message :  "success",
    token : string
    user : T,
}
declare type ErrorResponse = {
    message : 'fail | error',
    code : number
   
}

declare type ApiResponse<T> = SuccessfullResponse<T> | ErrorResponse
declare type SuccessfullResponse<T> = {
    message :  "success",
    token : string
    data : T,
}
declare type ErrorResponse = {
    message : 'fail | error',
    code : number
   
}

declare type ApiResponse<T> = SuccessfullResponse<T> | ErrorResponse
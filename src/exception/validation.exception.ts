import { ValidationError } from "class-validator";

class ValidationException extends Error{
    public status:number 
    public errors:Object

    constructor(status:number,message:string,errors:ValidationError[]){
        super(message);
        this.status=status;
        this.errors = this.parseErrors(errors);
        console.log(this.errors)
    };
    parseErrors = (errors: ValidationError[]) => {
        let errorObject = {};
        for (let err of errors) {
            if (err.children.length === 0) {
                errorObject[err.property] = Object.values(err.constraints);
            } else {
                errorObject[err.property] = this.parseErrors(err.children);
            }
        }
        return errorObject;
    };
}
export default ValidationException;


// {
//     "message": "Validation Errors",
//     "errors": {
//         "name": [
//             "name must be a string",
//             "name should not be empty"
//         ],
//         "address": {
//             "line1": [
//                 "line1 must be a string",
//                 "line1 should not be empty"
//             ],
//             "pincode": [
//                 "pincode must be a string",
//                 "pincode should not be empty"
//             ]
//         }
//     }
// }
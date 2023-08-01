interface CalculatorInterface {
    add(a: number, b: number): number;
    subtract(a:number,b:number):number;
    multiply(a:number,b:number):number;
    divide(a:number,b:number):number;
    percent(a:number,b:number):number;
}

export class Calculator implements CalculatorInterface{
    
    add(a:number,b:number):number{
    return a + b;
    }
    subtract(a:number,b:number):number{
        return a - b;
    }
    multiply(a:number,b:number):number{
        return a * b;
    }
    divide(a:number,b:number):number{
        return a / b;
    }
    percent(a:number,percentage:number):number{
        return (a*percentage)/100;
    }







}
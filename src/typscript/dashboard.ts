export interface CheckReport  {
    vehicletype: number,
    vehicletypename: string | null,
    vehiclecount: number
}

export interface Payment {
    paymentmode: number,
    amountcollected: number
}

export interface Vehicle {
    type_id:number,
    type_name: string,
    image: string
}

export interface Vehicle_details {
    [type_id:number]: 
    { 
        type_name: string, 
        image: string 
    }
}
export interface Payment_details {
    [statuscode:number]: 
    { 
        status: string
    }
}

export interface Payment_Type {
    statuscode: number,
    status: string
}
export interface GraphData {
    label: string,
    value: number
}
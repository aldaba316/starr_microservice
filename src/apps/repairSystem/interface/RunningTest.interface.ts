 import { ErrorCodeInterface } from './';
 
 export interface RunningTestInterface {

    test : string;
    active: boolean;
    _errorCode: ErrorCodeInterface[ ];
    registerDate: Date ;

};

export interface RunningTestPagination {

    total: number;
    tests: RunningTestInterface[ ];

};
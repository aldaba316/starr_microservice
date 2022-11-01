 //* Interface //
 
 import { Types } from 'mongoose';
 
 export interface BoardInterface {

    boardName : string;
    _user: Types.ObjectId[ ];
    techRepair: any[ ];
    boardNodes: number;
    active: boolean;
    registerDate: Date

};

export interface BoardsPagination {

    total: number,
    boards: BoardInterface[ ]

};

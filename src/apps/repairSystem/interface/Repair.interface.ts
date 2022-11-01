import * as I from './';
import { Types } from 'mongoose';
import { UserInterface } from '../../../../../user_microservice/src/apps/user/interface/user.interface';
import { FailComponentInterface } from '.';

export interface OpenRepairInterface {

    SSN: string;
    position: string;
    _board: I.BoardInterface;
    shift: string;
    _runningTest: I.RunningTestInterface;
    _errorCode: I.ErrorCodeInterface;
    action: string;
    techAnalisis: string;
    priority: number;
    _family: I.FamilyInterface;
    //* Just mongoID //
    _assignTo: Types.ObjectId;
    _generatedBy: Types.ObjectId;
    //* Object //
    techRepair: UserInterface;
    assignTo: any;
    _solution: RepairSolutionInterface;
    active: boolean;
    registerDate: Date;

};

export interface OpenRepairPagination {

    total: number;
    repairs: OpenRepairInterface[ ];

};

export interface RepairSolutionInterface {

    _repair: OpenRepairInterface;
    newCT: string;
    oldCT: string;
    RepairAnalisis: string;
    actionTaked: string;
    _componentRepaired: FailComponentInterface;
    active: boolean;
    registerDate: Date;

}

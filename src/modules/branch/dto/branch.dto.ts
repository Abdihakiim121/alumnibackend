import { IsNotEmpty, IsBoolean, IsDateString } from 'class-validator';

export class BranchDTO {

    branchId: number;

    @IsNotEmpty()
    branchName: string;


    branchLocation: string;


    branchLogo: string;


    coverLogo: number;


    datecreated: Date;


    @IsBoolean()
    isactive: boolean;
}

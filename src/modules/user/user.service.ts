import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private readonly users: any[] = [];
    getAllUser (){
        return "Mohamed Abdihakiim Ahmed Abdulahi Mohamed";
    }
    create(user: any) {
        this.users.push(user);
    }
}

import IRoomManager from "../../core/room/IRoomManager";
import UserLogic from "../user/logic/UserLogic";
import User from "../user/User";
import UserVisualization from "../user/visualization/UserVisualization";
import Item from "./objects/items/Item";

export default class RoomUserManager implements IRoomManager {

    private users: Map<number, User> = new Map()

    public addUser(user: User) : void {
        this.users.set(user.UserInfo.getId()!, user)
    }

    public getUserFromUserName(userName: string): User | undefined {
        this.users.forEach((user: User) => {
            return user.UserInfo.Username == userName ? user : undefined
        })
        return undefined;
    }

    public getUser(userid: number): User | undefined {
        return this.users.get(userid);
    }

    public getUsers() : Map<number, User > {
        return this.users
    }

    public tick(delta: number) {
        this.users.forEach((user: User) => {
            (user.Logic as UserLogic).tick(delta);
        })
    }



}
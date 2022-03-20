import MessageHandler from "../../../../../core/communication/messages/MessageHandler";
import Entity from "../../../../../core/room/object/entities/Entity";
import Engine from "../../../../../Engine";
import UserEntity from "../../../../../engine/room/objects/entities/users/UserEntity";
import UserEntityVisualization from "../../../../../engine/room/objects/entities/users/visualization/UserEntityVisualization";
import User from "../../../../../engine/user/User";
import UserVisualization from "../../../../../engine/user/visualization/UserVisualization";


export default class LoadRoomEntities extends MessageHandler
{
    public handle(): void {
        for (let i = 0; i < this.message.data.length; i++)
        {
            let userData = this.message.data[i];
            
            if (Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager.getEntity(userData['id']) == undefined) {
                
                //todo make this general for all entities
                let userEntity = new UserEntity((userData['id']), userData['name'], userData['look'], userData['gender']); 
                let entityVisualization = (userEntity.getVisualization()) as UserEntityVisualization
                entityVisualization.X = userData['x']
                entityVisualization.Y = userData['y']
                entityVisualization.Z = userData['z']
                entityVisualization.Rot = entityVisualization.parseRotation(userData['rot'])
                //todo headRot
                entityVisualization.HeadRot = entityVisualization.parseRotation(userData['rot'])
                entityVisualization.InRoom = true;

                Engine.getInstance().RoomsManager?.CurrentRoom?.RoomEntityManager.addEntity(userEntity)
                entityVisualization.render();
            }
            
       }
    }
}

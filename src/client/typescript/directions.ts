enum Type{
SECTION,
TRANSITION,
FINAL
}
class NavNode{
xCoord: number;
yCoord: number;
floor:  number;
type: Type;
edge: Edge;
    constructor(xCoord: number, yCoord: number, floor: number, type: Type, edge: Edge){
        this.xCoord=xCoord;
        this.yCoord=yCoord;
        this.floor=floor;
        this.type=type;
        this.edge=edge;
    };
    calcDirections(){
        var directions;
        if (this.type == Type.TRANSITION){
           directions = "Exit the elevator on floor "+this.floor+".";
        }
        if(this.edge.floor== -99){
            directions = "You have reached your destination."
            return directions;
        }
        else if(this.xCoord == this.edge.xCoord || this.yCoord == this.edge.yCoord){
             directions = " Continue straight "
            if (this.edge.type == Type.TRANSITION){
                directions += " and call the elevator."
            }
        }
        else if (this.xCoord>this.edge.xCoord || this.yCoord<this.edge.yCoord){
            directions = "Turn left, and continue forward "
            if (this.edge.type == Type.TRANSITION){
                directions += " and call the elevator."
            }
        }
        else if (this.xCoord<this.edge.xCoord||this.yCoord>this.edge.yCoord){
            directions = "Turn right and continue forward "
            if (this.edge.type == Type.TRANSITION){
                directions += " and call the elevator."
            }
        }
        return directions;
    }
}

class Edge{
    xCoord: number;
    yCoord: number;
    floor:  number;
    type:   Type;
    time:   number;
    constructor(xCoord:number, yCoord: number, floor=-99, type: Type, time: number){
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.floor = floor;
        this.type = type;
        this.time = time;
    }
}
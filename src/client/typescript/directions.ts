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
        //determine which way the user will need to face
        var directions;
        //if exiting an elevator, include where
        if (this.type == Type.TRANSITION){
           directions = "Exit the elevator on floor "+this.edge.floor+".";
        }
        //if the edge has a floor placeholder, there is no edge, and this is the final node
        if(this.edge.floor== -99){
            directions = "You have reached your destination.";
            return directions;
        }
        //if either the x or the y are the same, the user is not turning
        else if(this.xCoord == this.edge.xCoord || this.yCoord == this.edge.yCoord){
             directions = " Continue straight ";
            if (this.edge.type == Type.TRANSITION){
                directions += " and call the elevator.";
            }
        }
        //if going from a larger to smaller X, or a smaller to larger Y, user turns left
        else if (this.xCoord>this.edge.xCoord || this.yCoord<this.edge.yCoord){
            directions = "Turn left, and continue forward ";
            if (this.edge.type == Type.TRANSITION){
                directions += " and call the elevator.";
            }
        }
        //if going from a smaller to larger X, or a larger to smaller Y, user turns right
        else if (this.xCoord<this.edge.xCoord||this.yCoord>this.edge.yCoord){
            directions = "Turn right and continue forward ";
            if (this.edge.type == Type.TRANSITION){
                directions += " and call the elevator.";
            }
        }
        //give the directions to callee
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
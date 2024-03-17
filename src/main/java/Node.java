import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Node{


    private final int ID;
    private int floor;

    private Type type;
    private Set<Edge> edges= new HashSet<>();
    public int getID(){return this.ID;}
    public int getFloor(){return this.floor;}
    public void setFloor(int f){this.floor=f;}
    public Set<Edge> getEdges(){return this.edges;}

    public Type getType(){return this.type;}
    public void setType(Type t){this.type=t;}
    public void addEdge(Edge newEdge){
        this.edges.add(newEdge);
    }
    public Node(int c, int f, Type t){
        this.ID =c;
        this.floor=f;
        this.type=t;
    }


}


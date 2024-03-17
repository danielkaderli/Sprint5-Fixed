import java.util.HashSet;
import java.util.List;
import java.util.Set;

enum Type{
    FINAL,
    SECTION,
    TRANSITION
}
public class Node{


    private final int ID;
    private final int floor;

    private final Type type;
    private Set<Edge> edges= new HashSet<>();
    public int getID(){return this.ID;}
    public int getFloor(){return this.floor;}
    public Set<Edge> getEdges(){return this.edges;}

    public Type getType(){return this.type;}
    public void addEdge(Edge newEdge){
        this.edges.add(newEdge);
    }
    public Node(int c, int f, Type t){
        this.ID =c;
        this.floor=f;
        this.type=t;
    }


}


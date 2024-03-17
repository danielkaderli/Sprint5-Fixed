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
    public int getID(){return ID;}
    public int getFloor(){return floor;}
    public Set<Edge> getEdges(){return edges;}

    public Type getType(){return type;}
    public void addEdge(Edge newEdge){
        edges.add(newEdge);
    }
    public Node(int c, int f, Type t){
        ID =c;
        floor=f;
        type=t;
    }


}


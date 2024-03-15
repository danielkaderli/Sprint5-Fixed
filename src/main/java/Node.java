import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Node{
    private final int ID;
    private final int floor;

    private Set<Edge> edges= new HashSet<>();
    public int getID(){return ID;}
    public int getFloor(){return floor;}
    public Set<Edge> getEdges(){return edges;}
    public void addEdge(Edge newEdge){
        edges.add(newEdge);
    }
    public Node(int c, int f){
        ID =c;
        floor=f;
    }


};

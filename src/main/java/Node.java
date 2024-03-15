import java.util.List;

public class Node{
    private final int ID;
    private final int floor;

    private List<Edge> edges;
    public int getID(){return ID;}
    public int getFloor(){return floor;}
    public Node(int c, int f){
        ID =c;
        floor=f;
    }
};

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Node{


    private final int ID;
    private int floor;

    private double F;
    private double G;
    private double H;
    private Type type;
    private Node parent;
    private Set<Edge> edges= new HashSet<>();
    public int getID(){return this.ID;}
    public int getFloor(){return this.floor;}
    public void setFloor(int f){this.floor=f;}

    public double getF(){return this.F;}
    public void setF(double f){this.F=f;}
    public double getG(){return this.G;}
    public void setG(double g){this.G=g;}
    public double getH(){return this.H;}
    public void setH(double h){this.H=h;}

    public Node getParent(){return this.parent;}
    public void setParent(Node p){this.parent=p;}
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
        this.F=0;
        this.G=Double.POSITIVE_INFINITY;
        this.H=0;
        this.parent=null;
    }


}


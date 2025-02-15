import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Node{

    //properties
    private final int ID;
    private int floor;
    private int renderX;
    private int renderY;
    private double F;
    private double G;
    private double H;
    private Type type;
    private Node parent;
    private Set<Edge> edges= new HashSet<>();
    //SETTERS AND GETTERS
    public int getID(){return this.ID;}
    public int getFloor(){return this.floor;}
    public void setFloor(int f){this.floor=f;}

    public void setX(int x){this.renderX=x;}

    public void setY(int y){this.renderY=y;}
    public double getF(){return this.F;}
    public void setF(double f){this.F=f;}
    public double getG(){return this.G;}
    public void setG(double g){this.G=g;}
    public double getH(){return this.H;}
    public void setH(double h){this.H=h;}
    public int getX(){return this.renderX;}
    public int getY(){return this.renderY;}

    public Node getParent(){return this.parent;}
    public void setParent(Node p){this.parent=p;}
    public Set<Edge> getEdges(){return this.edges;}

    public Type getType(){return this.type;}
    public void setType(Type t){this.type=t;}
    public void addEdge(Edge newEdge){
        this.edges.add(newEdge);
    }
    //constructor
    public Node(int c, int f, Type t, int x, int y){
        this.ID =c;
        this.floor=f;
        this.type=t;
        this.F=0;
        this.G=Double.POSITIVE_INFINITY;
        this.H=0;
        this.parent=null;
        this.renderX = x;
        this.renderY = y;
    }


}


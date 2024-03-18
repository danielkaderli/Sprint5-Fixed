public class Edge {
    //properties
    private final Node self;
    private int weight;
    //setters and getters
    public int getWeight(){return weight;}
    public void setWeight(int w){weight=w;}
    public Node getSelf(){return self;}

    //constructor
    public Edge(Node node, int w){
        self=node;
        weight=w;
    }

}

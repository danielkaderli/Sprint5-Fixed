public class Edge {
    private final Node self;
    private final int weight;

    public int getWeight(){return weight;}
    public Node getSelf(){return self;}

    public Edge(Node node, int w){
        self=node;
        weight=w;
    }

}

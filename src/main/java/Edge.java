public class Edge {
    private final Node self;
    private int weight;

    public int getWeight(){return weight;}
    public void setWeight(int w){weight=w;}
    public Node getSelf(){return self;}


    public Edge(Node node, int w){
        self=node;
        weight=w;
    }

}

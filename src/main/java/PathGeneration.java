import java.util.Iterator;

public class PathGeneration {
    /* A* Algorithm
     * Route times based on weights
     * Best path is through sections until FINAL
     * SECTIONS can be destinations */
    private final Node start;
    private final Node end;
    public PathGeneration(Node s, Node e){
        start=s;
        end=e;
    }

    /* TRANSITION NODE EXTRA WEIGHT */
    public int TransitionWeight(Node transition){
        //placeholder values
        int floorMin=99;
        int floorMax=-99;
        Iterator<Edge> edgeIterator = transition.getEdges().iterator();
        while(edgeIterator.hasNext()){
            int floor =edgeIterator.next().getSelf().getFloor();
            {
                if (floor<floorMin){
                    floorMin=floor;
                }
                if(floor>floorMax){
                    floorMax=floor;
                }

            }
        }
        int diff = (floorMax-floorMin);

    }
}

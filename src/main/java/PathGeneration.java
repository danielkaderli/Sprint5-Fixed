import java.util.*;

public class PathGeneration {
    /* A* Algorithm
     * Route times based on weights
     * Best path is through sections until FINAL
     * SECTIONS can be destinations */
    private  Node start;
    private Node end;

    public void setStart(Node s){this.start=s;}
    public void setEnd(Node e){this.end=e;}
    public PathGeneration(Node s, Node e) {
        this.start = s;
        this.end = e;
    }


    private double calculateF(Edge curr) {
        return Math.sqrt(curr.getSelf().getG() * curr.getSelf().getH());
    }

    private double heuristicFunction(Edge curr) {
        double floorDiff = curr.getSelf().getFloor() - this.end.getFloor();
        return Math.sqrt((floorDiff * floorDiff) + (curr.getWeight() * curr.getWeight()));
    }

    private void resetValues(AdjacencyList graph) {
        for (Map.Entry<Integer, Node> entry : graph.getAdjacencyList().entrySet()) {
            entry.getValue().setG(Double.POSITIVE_INFINITY);
            entry.getValue().setF(0);
            entry.getValue().setH(0);
            entry.getValue().setParent(null);
        }
    }

    private Node aStarr(AdjacencyList graph) {
        Comparator<Node> fCompare = Comparator.comparingDouble(Node::getF);
        PriorityQueue<Node> open = new PriorityQueue<>(fCompare);
        Set<Node> closed = new HashSet<>();
        this.resetValues(graph);
        this.start.setG(0);
        double G = 0;
        open.add(this.start);

        while (!(open.isEmpty())) {
            Node q = open.poll();
            if (q.getID() == this.end.getID()) {
                return q;
            }
            closed.add(q);
            Iterator<Edge> edgeIterator = q.getEdges().iterator();
            while (edgeIterator.hasNext()) {
                Edge next = edgeIterator.next();
                if (closed.contains(next.getSelf())) {
                    continue;
                }
                G = q.getG() + next.getSelf().getG();
                double H = heuristicFunction(next);
                if (open.contains(next.getSelf())) {
                    if (G < next.getSelf().getG()) {
                        next.getSelf().setG(G);
                        next.getSelf().setParent(q);
                        next.getSelf().setF(calculateF(next));
                    }
                } else {
                    next.getSelf().setG(G);
                    next.getSelf().setH(H);
                    next.getSelf().setF(calculateF(next));
                    next.getSelf().setParent(q);
                    open.add(next.getSelf());
                }

            }

        }
        return null;
    }

    private double timeInSeconds(Node a, Node b){
        Iterator<Edge> edgeIterator = a.getEdges().iterator();
        int weight =0;
        while(edgeIterator.hasNext()){
            Edge curr = edgeIterator.next();
            if(curr.getSelf().getID()==b.getID()){
                weight = curr.getWeight();
                break;
            }
        }
        return weight *30;
    }
    public ArrayList<BestPath> createRoute(AdjacencyList graph){
        ArrayList<BestPath> generatedPath = new ArrayList<>();
        double totalTime=0;
        if (this.end==aStarr(graph)){
            ArrayList<Node> revPath= new ArrayList<>();
            revPath.add(this.end);
            Node parent = this.end.getParent();
            while(parent.getParent()!=null){
                revPath.add(parent);
                parent= parent.getParent();
            }
            revPath.add(this.start);
            Collections.reverse(revPath);

            for(int i=0; i<revPath.size()-1; i++){
               BestPath newEntry= new BestPath(revPath.get(i).getID(), revPath.get(i+1).getID(),timeInSeconds(revPath.get(i), revPath.get(i+1)));
               totalTime+= newEntry.TimeEstimate();
               generatedPath.add(newEntry);
            }
            //Last entry of generatedPath is destination node with total time to finish route
            BestPath finalEntry= new BestPath(revPath.get(revPath.size()-1).getID(), null, totalTime);
            generatedPath.add(finalEntry);

            return generatedPath;


        }
        return null;
    }
}
import java.util.*;

public class PathGeneration {
    /* A* Algorithm
     * Route times based on weights
     * Best path is through sections until FINAL
     * SECTIONS can be destinations */
    //properties
    private Node start;
    private Node end;
    //setters and getters
    public void setStart(Node s){this.start=s;}
    public void setEnd(Node e){this.end=e;}
    //constructor
    public PathGeneration(Node s, Node e) {
        this.start = s;
        this.end = e;
    }

    //combined distance estimation factor equation
    private double calculateF(Edge curr) {
        return Math.sqrt(curr.getSelf().getG() * curr.getSelf().getH());
    }

    //distance estimation factor equation
    private double heuristicFunction(Edge curr) {
        double floorDiff = curr.getSelf().getFloor() - this.end.getFloor();
        double xDiff = curr.getSelf().getX()-this.end.getX();
        double yDiff = curr.getSelf().getY()-this.end.getY();
        return Math.sqrt((floorDiff * floorDiff) + (xDiff*xDiff)+(yDiff*yDiff));
    }

    //restore default values of F, G, H, and parent for all nodes in the graph
    private void resetValues(AdjacencyList graph) {
        for (Map.Entry<Integer, Node> entry : graph.getAdjacencyList().entrySet()) {
            entry.getValue().setG(Double.POSITIVE_INFINITY);
            entry.getValue().setF(0);
            entry.getValue().setH(0);
            entry.getValue().setParent(null);
        }
    }

    //aStarr shortest path algorithm
    private Node aStarr(AdjacencyList graph) {
        //create a priorityqueue (minheap) based on F value
        Comparator<Node> fCompare = Comparator.comparingDouble(Node::getF);
        PriorityQueue<Node> open = new PriorityQueue<>(fCompare);
        //create a closed set
        Set<Node> closed = new HashSet<>();
        //reset nodes to default values to ensure accuracy
        this.resetValues(graph);
        //initialize basic variables for AStarr
        this.start.setG(0);
        double G = 0;
        open.add(this.start);
        //while there are still unexamined (open) nodes, search for shortest path
        while (!(open.isEmpty())) {
            //pop top of the queue
            Node q = open.poll();

            //if q is destination, found path
            if (q.getID() == this.end.getID()) {
                return q;
            }

            //add current node to examined(closed) node list
            closed.add(q);
            //search all of its valid adjacent nodes (neighbors)
            Iterator<Edge> edgeIterator = q.getEdges().iterator();
            while (edgeIterator.hasNext()) {
                Edge next = edgeIterator.next();
                //if this neighbor is in the closed set, skip it
                if (closed.contains(next.getSelf())) {
                    continue;
                }
                //update G
                G = q.getG() + next.getSelf().getG();
                //update H
                double H = heuristicFunction(next);
                //if the node is already added to the open list, check if new G is better than old G, and update path if so
                if (open.contains(next.getSelf())) {
                    if (G < next.getSelf().getG()) {
                        next.getSelf().setG(G);
                        next.getSelf().setParent(q);
                        next.getSelf().setF(calculateF(next));
                    }
                }
                //if node not in list, add it with the new values for G, H, F
                else {
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


    //calculate and return the time in seconds between two given nodes based on weight
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

    //create a route using the pathfinding algorithm and return the resulting route
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
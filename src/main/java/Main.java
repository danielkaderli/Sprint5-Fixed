import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

public class Main {

    public static void printRoute(ArrayList<BestPath> currRoute){
        for (int i =0; i<currRoute.size()-1; i++){
            System.out.println("Curr Node: " + currRoute.get(i).NodeID() + " Next Node: " + currRoute.get(i).NextNodeID() + " Time: " + currRoute.get(i).TimeEstimate() );
        }
        System.out.println("Final Node: " + currRoute.get(currRoute.size()-1).NodeID() + " Total Time: " + currRoute.get(currRoute.size()-1).TimeEstimate());

    }
    public static void main(String[] args)  {
        String graphFile= "./build/resources/main/fakeTownHall.txt";
        AdjacencyList graph = new AdjacencyList();
        graph.createGraph(graphFile);
        graph.UpdateWeights();
        PathGeneration path = new PathGeneration(graph.findNode(1), graph.findNode(7));
        ArrayList<BestPath>currRoute = path.createRoute(graph);

        printRoute(currRoute);

        path.setEnd(graph.findNode(21));
        currRoute=path.createRoute(graph);
        printRoute(currRoute);



    }
}

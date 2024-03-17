import java.io.File;
import java.util.Map;

public class Main {
    public static void main(String[] args)  {
        //getClass().getClassLoader().getResourceAsStream("filename")
        String graphFile= "./build/resources/main/fakeTownHallMap.csv";
        AdjacencyList graph = new AdjacencyList();
        graph.createGraph(graphFile);
        graph.UpdateWeights();
        for (Map.Entry<Integer, Node> entry : graph.getAdjacencyList().entrySet()){
            System.out.println("Node: "+ entry.getKey() + " " + entry.getValue().getFloor() + " " + entry.getValue().getType());
        }


    }
}

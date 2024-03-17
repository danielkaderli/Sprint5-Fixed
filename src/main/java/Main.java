import java.io.File;
import java.util.Iterator;
import java.util.Map;

public class Main {
    public static void main(String[] args)  {
        String graphFile= "./build/resources/main/fakeTownHall.txt";
        AdjacencyList graph = new AdjacencyList();
        graph.createGraph(graphFile);
        graph.UpdateWeights();
    }
}

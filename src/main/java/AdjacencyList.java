
import javax.lang.model.type.NullType;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;


public class AdjacencyList{

    Map<Integer, Node> graph= new HashMap<>();

    public void addNode(Node newNode){
        graph.put(newNode.getID(), newNode);
    }

    public Node searchGraph(int targetID) {
        return graph.get(targetID);
    }

}





import javax.lang.model.type.NullType;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;


public class AdjacencyList{

    Map<Integer, Node> graph= new HashMap<>();

    public void addNode(Node newNode){
        this.graph.put(newNode.getID(), newNode);
    }

    public Node searchGraph(int targetID) {
        return this.graph.get(targetID);
    }

}




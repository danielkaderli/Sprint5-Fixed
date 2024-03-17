
import javax.lang.model.type.NullType;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;


public class AdjacencyList{

    private Map<Integer, Node> graph= new HashMap<>();

    public void addNode(Node newNode){
        this.graph.put(newNode.getID(), newNode);
    }

    public Node findNode(int targetID){
        return this.graph.get(targetID);
    }
    public Map<Integer,Node> getAdjacencyList(){return this.graph;}

}




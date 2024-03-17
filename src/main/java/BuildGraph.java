import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.Iterator;
import java.util.Map;

;
public class BuildGraph {

    private void addEdge(Node node, AdjacencyList adjList, FileEntry currEntry){
        //check if a node for the edge exists and add the node and edge
        if (adjList.findNode(/*EdgeID from file*/ currEntry.EdgeID())!=null){
            Edge edge = new Edge(adjList.findNode(currEntry.EdgeID()),currEntry.Weight());
            node.addEdge(edge);
        }
        else{
            Node edgePlaceholder = new Node(currEntry.EdgeID(),-99,Type.FINAL);
            adjList.addNode(edgePlaceholder);
            Edge edge = new Edge(edgePlaceholder,currEntry.Weight());
            node.addEdge(edge);
        }
    }

    public AdjacencyList createGraph(String graphFile)  {
        FileReader graph = new FileReader(graphFile);

        AdjacencyList adjList=new AdjacencyList();

        //placeholders until file reading is set up
        FileEntry currEntry=new FileEntry(0,0,Type.FINAL, 0,0);
        //for each line, create or find Node, create Edge, add it to adjList
        if(adjList.findNode(/*ID from FILE*/currEntry.NodeID())==null){
            Node node = new Node(currEntry.NodeID(),currEntry.Floor(), currEntry.type());
            addEdge(node, adjList, currEntry);

        }

        else{
            if (adjList.findNode(currEntry.NodeID()).getFloor()==-99){
                Node node = adjList.findNode(currEntry.NodeID());
                node.setFloor(currEntry.Floor());
                node.setType(currEntry.type());
                //check if a node for the edge exists
                addEdge(node, adjList, currEntry);
            }
            else{
                Node node = adjList.findNode(currEntry.NodeID());
                //check if a node for the edge exists
                addEdge(node, adjList,currEntry);
            }
        }

        return adjList;
    }

    //run after map fully added, update weights for all edges connected to transition nodes
    public void UpdateWeights(AdjacencyList graph){
        Map<Integer, Node> g= graph.getAdjacencyList();
        for(Map.Entry<Integer, Node> entry : g.entrySet()){
            if(entry.getValue().getType()==Type.TRANSITION)
            {
                TransitionWeight(entry.getValue());
            }
        }
    }
    public void TransitionWeight(Node transition){
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
        edgeIterator=transition.getEdges().iterator();
        while(edgeIterator.hasNext()){
            Edge currEdge= edgeIterator.next();
            int currWeight=currEdge.getWeight();
            currEdge.setWeight(currWeight*(diff*3));
        }
    }
}

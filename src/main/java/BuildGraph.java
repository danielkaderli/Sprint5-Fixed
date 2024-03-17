import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.Iterator;
import java.util.Map;

public class BuildGraph {

    public AdjacencyList createGraph(String graphFile)  {
        FileReader graph = new FileReader(graphFile);

        AdjacencyList adjList=new AdjacencyList();
        //placeholders until file reading is set up
        int nodeID=0;
        int floor=0;
        Type type=Type.FINAL;
        int edgeID=0;
        int weight=0;
        //for each line, create or find Node, create Edge, add it to adjList
        if(adjList.findNode(/*ID from FILE*/nodeID)==null){
            Node node = new Node(nodeID,floor, type);
            //check if a node for the edge exists and add the node and edge
            if (adjList.findNode(/*EdgeID from file*/ edgeID)!=null){
                Edge edge = new Edge(adjList.findNode(edgeID),weight);
                node.addEdge(edge);
            }
            else{
                Node edgePlaceholder = new Node(edgeID,-99,Type.FINAL);
                adjList.addNode(edgePlaceholder);
                Edge edge = new Edge(edgePlaceholder,weight);
                node.addEdge(edge);
            }

        }

        else{
            if (adjList.findNode(nodeID).getFloor()==-99){
                Node node = adjList.findNode(nodeID);
                node.setFloor(floor);
                node.setType(type);
                //check if a node for the edge exists
                if (adjList.findNode(/*EdgeID from file*/ edgeID)!=null){
                    Edge edge = new Edge(adjList.findNode(edgeID),weight);
                    node.addEdge(edge);
                }
                else{
                    Node edgePlaceholder = new Node(edgeID,-99,Type.FINAL);
                    adjList.addNode(edgePlaceholder);
                    Edge edge = new Edge(edgePlaceholder,weight);
                    node.addEdge(edge);
                }
            }
            else{
                Node node = adjList.findNode(nodeID);
                //check if a node for the edge exists
                if (adjList.findNode(/*EdgeID from file*/ edgeID)!=null){
                    Edge edge = new Edge(adjList.findNode(edgeID),weight);
                    node.addEdge(edge);
                }
                else{
                    Node edgePlaceholder = new Node(edgeID,-99,Type.FINAL);
                    adjList.addNode(edgePlaceholder);
                    Edge edge = new Edge(edgePlaceholder,weight);
                    node.addEdge(edge);
                }
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

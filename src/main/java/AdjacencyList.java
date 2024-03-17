
import javax.lang.model.type.NullType;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;


public class AdjacencyList{

    private Map<Integer, Node> graph;

    public AdjacencyList(){
        graph=new HashMap<>();
    }
    public void addNode(Node newNode){
        this.graph.put(newNode.getID(), newNode);
    }

    public Node findNode(int targetID){
        return this.graph.get(targetID);
    }
    public Map<Integer,Node> getAdjacencyList(){return this.graph;}

    //check if a node for the edge exists and add the node and edge
    private void addEdge(Node node, FileEntry currEntry){

        if (this.findNode(/*EdgeID from file*/ currEntry.EdgeID())!=null){
            Edge edge = new Edge(this.findNode(currEntry.EdgeID()),currEntry.Weight());
            node.addEdge(edge);
        }
        else{
            Node edgePlaceholder = new Node(currEntry.EdgeID(),-99,Type.FINAL);
            this.addNode(edgePlaceholder);
            Edge edge = new Edge(edgePlaceholder,currEntry.Weight());
            node.addEdge(edge);
        }
    }

    //run after map fully added, update weights for all edges connected to transition nodes
    public void UpdateWeights(){

        for(Map.Entry<Integer, Node> entry : graph.entrySet()){
            if(entry.getValue().getType()==Type.TRANSITION)
            {
                TransitionWeight(entry.getValue());
            }
        }
    }


    //calculates appropriate edge weight for transition nodes, to aid in time estimation
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
    public void createGraph(String graphFile) {
        Scanner scan;
        try {
            scan = new Scanner(new File(graphFile), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        scan.useDelimiter(",");
        int nID, floor, eID, weight;
        Type type;
        ArrayList<FileEntry> fileEntries = new ArrayList<>();

        while (scan.hasNext()) {
            nID = Integer.parseInt(scan.next().trim());
            floor = Integer.parseInt(scan.next().trim());
            type = Type.valueOf(scan.next().trim());
            eID = Integer.parseInt(scan.next().trim());
            weight = Integer.parseInt(scan.next().trim());;
            fileEntries.add(new FileEntry(nID, floor, type, eID, weight));
        }
        scan.close();


        //placeholders until file reading is set up

        for (int i = 0; i < fileEntries.size(); i++) {
            FileEntry currEntry=fileEntries.get(i);
            //for each line, create or find Node, create Edge, add it to adjList
            if (this.findNode(/*ID from FILE*/currEntry.NodeID()) == null) {
                Node node = new Node(currEntry.NodeID(), currEntry.Floor(), currEntry.type());
                addEdge(node, currEntry);
            }
            else {
                if (this.findNode(currEntry.NodeID()).getFloor() == -99) {
                    Node node = this.findNode(currEntry.NodeID());
                    node.setFloor(currEntry.Floor());
                    node.setType(currEntry.type());
                    //check if a node for the edge exists
                    addEdge(node, currEntry);
                }
                else {
                    Node node = this.findNode(currEntry.NodeID());
                    //check if a node for the edge exists
                    addEdge(node, currEntry);
                }
            } //For
        }
    }
}




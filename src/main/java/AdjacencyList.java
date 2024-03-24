
import javax.lang.model.type.NullType;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;


public class AdjacencyList{
    //properties
    private Map<Integer, Node> graph;
    //constructor
    public AdjacencyList(){
        graph=new HashMap<>();
    }
    //methods
    //add nodes to the graph
    public void addNode(Node newNode){
        this.graph.put(newNode.getID(), newNode);
    }

    //search for a node
    public Node findNode(int targetID){
        return this.graph.get(targetID);
    }
    public Map<Integer,Node> getAdjacencyList(){return this.graph;}

    //check if a node for the edge exists and add the node and edge
    private void addEdge(Node node, FileEntry currEntry){
        //edge node is in graph already, add edge and associate the node with it
        if (this.findNode(currEntry.EdgeID())!=null){
            Edge edge = new Edge(this.findNode(currEntry.EdgeID()),currEntry.Weight());
            node.addEdge(edge);
        }

        //edge node is not in the graph, add a placeholder with dummy values and associate the edge with it
        else{
            Node edgePlaceholder = new Node(currEntry.EdgeID(),-99,Type.FINAL, 0, 0);
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
            currEdge.setWeight(currWeight*(diff*9));
        }
    }
    //create graph from comma separated file
    public void createGraph(String graphFile) {
       String line="";
       String delim=",";
       ArrayList<FileEntry> fileEntries = new ArrayList<>();
       try{//create a file stream and read entries from it
           BufferedReader file = new BufferedReader((new InputStreamReader(new FileInputStream(graphFile), StandardCharsets.UTF_8)));
           while((line=file.readLine())!=null){
               String[] entry= line.split(delim);
               fileEntries.add(new FileEntry(
                       /* NodeID */ Integer.parseInt(entry[0]),
                       /* Floor  */ Integer.parseInt(entry[1]),
                       /* Type   */ Type.valueOf(entry[2]),
                       /* NodeX  */ Integer.parseInt(entry[3]),
                       /* NodeY  */ Integer.parseInt(entry[4]),
                       /* EdgeID */ Integer.parseInt(entry[5]),
                       /* Weight */ Integer.parseInt(entry[6])));

               //NodeID,Floor,Type,NodeX,NodeY,EdgeID,Weight
           }
       }
       catch (IOException e) {
           throw new RuntimeException(e);
       }
        for (int i = 0; i < fileEntries.size(); i++) {
            FileEntry currEntry=fileEntries.get(i);
            //for each line, create or find Node, create Edge, add it to adjList
            Node node;
            //node doesn't exist in graph, add it and add the edge
            if (this.findNode(currEntry.NodeID()) == null) {
                node = new Node(currEntry.NodeID(), currEntry.Floor(), currEntry.type(), currEntry.renderX(), currEntry.renderY());
                this.addNode(node);
                this.addEdge(node, currEntry);
            }
            //node exists in graph
            else {
                //if the node has a placeholder/dummy floor value, update it with the real ones
                if (this.findNode(currEntry.NodeID()).getFloor() == -99) {
                    node = this.findNode(currEntry.NodeID());
                    node.setFloor(currEntry.Floor());
                    node.setType(currEntry.type());
                    //check if a node for the edge exists
                    this.addNode(node);
                    this.addEdge(node, currEntry);
                }
                //if the node doesn't have a dummy value, just use the node from the graph
                else {
                    node = this.findNode(currEntry.NodeID());
                    //check if a node for the edge exists
                    this.addNode(node);
                    this.addEdge(node, currEntry);

                }
            } //For
        }
    }
}




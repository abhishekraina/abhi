// This class is implementing Graph data structures with Adjacency List approach for solving our problem statement.

class Graph {
    constructor() {
        this.nodes = [];
        this.adjacencyList = {};
    }

    /**
     * This method will add node into the graph.
     * @param {*} node 
     */
    addNode(node) {
        this.nodes.push(node);
        this.adjacencyList[node] = [];
    }

    /**
     * This method will add edge between node1 and node2 with corresponding weight.
     * @param {*} node1 
     * @param {*} node2 
     * @param {*} weight 
     */
    addEdge(node1, node2, weight) {
        this.adjacencyList[node1].push({ node: node2, weight: weight });
        this.adjacencyList[node2].push({ node: node1, weight: weight });
    }

    /**
     * This method will remove node from the graph.
     * @param {*} node 
     */
    removeNode(node) {
        this.nodes.splice(this.nodes.indexOf(node), 1);

        this.nodes.forEach(vertex => {
            this.adjacencyList[vertex] = this.adjacencyList[vertex].filter(edge => edge.node !== node);
        });

        delete this.adjacencyList[node];
    }

    /**
     * This method will remove edge from the graph in between node1 and node2.
     * @param {*} node1 
     * @param {*} node2 
     */
    removeEdge(node1, node2) {
        this.adjacencyList[node1] = this.adjacencyList[node1].filter(edge => edge.node !== node2);
        this.adjacencyList[node2] = this.adjacencyList[node2].filter(edge => edge.node !== node1);
    }

    /**
     * This method is returning the adjacency list (Graph).
     */
    printGraph() {
        return this.adjacencyList;
    }

    /**
     * This method will find the shortest path between startNode and endNode and return the path as string joined with '=>'.
     * @param {*} startNode 
     * @param {*} endNode 
     */
    findPathWithDijkstra(startNode, endNode) {
        let times = {};
        let backtrace = {};
        let pq = new PriorityQueue();

        times[startNode] = 0;

        this.nodes.forEach(node => {
            if (node !== startNode) {
                times[node] = Infinity
            }
        });

        pq.enqueue([startNode, 0]);

        while (!pq.isEmpty()) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep[0];
            this.adjacencyList[currentNode].forEach(neighbor => {
                let time = times[currentNode] + neighbor.weight;
                if (time < times[neighbor.node]) {
                    times[neighbor.node] = time;
                    backtrace[neighbor.node] = currentNode;
                    pq.enqueue([neighbor.node, time]);
                }
            });
        }
        let path = [endNode];
        let lastStep = endNode;
        while (lastStep !== startNode) {
            path.unshift(backtrace[lastStep])
            lastStep = backtrace[lastStep]
        }
        return path.join(" => ");
    }
}
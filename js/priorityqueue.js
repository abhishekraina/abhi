// we require priority queue for implementing shortest path algorithm. Hence , following class is created.

class PriorityQueue {
    constructor() {
        this.collection = []; //storing element
    }

    /**
     * This method is used to add element into the queue.
     * @param {*} element //would be an array e.g. ['Arbetos',0] where first element is station name and second name is number which is priority of element.
     */
    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 1; i <= this.collection.length; i++) {
                if (element[1] < this.collection[i - 1][1]) {
                    this.collection.splice(i - 1, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    };
    /**
     * This is method is used to remove element from queue.
     */
    dequeue() {
        let value = this.collection.shift();
        return value;
    };
    
    /**
     * This method will check whether the queue is empty or not. 
     */
    isEmpty() {
        return (this.collection.length === 0)
    };
}

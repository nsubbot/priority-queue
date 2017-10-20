const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		let newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
	}

	pop() {
		if (this.root === null)
			return;
		else {
			let prevRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(prevRoot);
			this.shiftNodeDown(this.root);
			return prevRoot.data;
		}
	}

	detachRoot() {
		this.heapSize--;
		let prevRoot = this.root;
		this.root = null;
		if (this.parentNodes[0] === prevRoot)
			this.parentNodes.shift();
		return prevRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastNode = this.parentNodes.pop();
		if (lastNode != undefined) {
			this.root = lastNode;
			if (lastNode.parent !== null) {
				let parentOfNode = lastNode.parent;
				lastNode.remove();
				if (parentOfNode.right === null && parentOfNode.left != null && parentOfNode != detached)
					this.parentNodes.unshift(parentOfNode);
			}
			if (detached.left != null) {
				lastNode.appendChild(detached.left);
			}
			if (detached.right != null) {
				lastNode.appendChild(detached.right);
				return;
			}
			this.parentNodes.unshift(lastNode);
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return this.root === null;
	}

	clear() {
		this.heapSize = 0;
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		this.heapSize++;
		if (this.root === null) {
			this.parentNodes.push(node);
			this.root = node;
			return;
		}
		if (this.parentNodes[0].left == null) {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if (node.parent != null && node.priority > node.parent.priority) {
			if (node.parent == this.root) 
				this.root = node;
			let parentIndex = this.parentNodes.indexOf(node.parent);
			let childIndex = this.parentNodes.indexOf(node);
			if (parentIndex == -1) 
				this.parentNodes[childIndex] = node.parent;
			else {
				this.parentNodes[parentIndex] = node;
				this.parentNodes[childIndex] = node.parent;
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (node == null || (node.left == null && node.right == null))
			return;
		if (node.right == null || node.left.priority > node.right.priority) {
			if (node.left.priority > node.priority) {
				let parentIndex = this.parentNodes.indexOf(node);
				let childIndex = this.parentNodes.indexOf(node.left);
				if (this.root == node)
					this.root = node.left;
				this.parentNodes[parentIndex] = node.left;
				this.parentNodes[childIndex] = node;
				node.left.swapWithParent();
				this.shiftNodeDown(node);
			}
		} else if (node.left == null || node.left.priority < node.right.priority) {
			if (node.right.priority > node.priority) {
				if (this.root == node)
					this.root = node.right;
				let parentIndex = this.parentNodes.indexOf(node);
				let childIndex = this.parentNodes.indexOf(node.right);
				this.parentNodes[parentIndex] = node.right;
				this.parentNodes[childIndex] = node;
				node.right.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;

class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left && this.right) 
			return;
		if(!this.left && !this.right) {
			this.left = node;
			this.left.parent = this;
		} else if (this.left) {
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		if(node !== this.right && node !== this.left)
			throw new Error("not a child bla bla");
		if(node === this.left) {
			this.left.parent = null;
			this.left = null;
		}
		if(node === this.right) {
			this.right.parent = null;
			this.right = null;
		}
	}

	remove() {
		if(!this.parent)
			return;
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (this.parent != null) {
			if (this.left !== null) 
				this.left.parent = this.parent;
			if (this.right !== null) 
				this.right.parent = this.parent; 
			if (this.parent.parent !== null)
				if (this.parent.parent.left === this.parent)
					this.parent.parent.left = this;
				else
					this.parent.parent.right = this;

			let temp;
			if (this === this.parent.left) {
				if (this.parent.right !== null)
					this.parent.right.parent = this;
				this.parent.left = this.left;
				this.left = this.parent;
				temp = this.right;
				this.right = this.parent.right;
				this.parent.right = temp;
			} else {
				if (this.parent.left !== null) 
					this.parent.left.parent = this;
				this.parent.right = this.right;
				this.right = this.parent;
				temp = this.left;
				this.left = this.parent.left;
				this.parent.left = temp;
			}
			temp = this.parent.parent;
			this.parent.parent = this;
			this.parent = temp;
		}
	}
}

module.exports = Node;

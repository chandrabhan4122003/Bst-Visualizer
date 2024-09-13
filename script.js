class Node {
  constructor(key) {
      this.key = key;
      this.left = null;
      this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
      this.root = null;
  }

  // Insert a new node
  insert(key) {
      this.root = this._insertNode(this.root, key);
  }

  _insertNode(root, key) {
      if (root === null) return new Node(key);

      if (key < root.key) {
          root.left = this._insertNode(root.left, key);
      } else if (key > root.key) {
          root.right = this._insertNode(root.right, key);
      }

      return root;
  }

  // Delete a node
  delete(key) {
      this.root = this._deleteNode(this.root, key);
  }

  _deleteNode(root, key) {
      if (root === null) return root;

      if (key < root.key) {
          root.left = this._deleteNode(root.left, key);
      } else if (key > root.key) {
          root.right = this._deleteNode(root.right, key);
      } else {
          // Node with one child or no child
          if (root.left === null) return root.right;
          if (root.right === null) return root.left;

          // Node with two children: get the inorder successor
          let succ = this._getSuccessor(root);
          root.key = succ.key;
          root.right = this._deleteNode(root.right, succ.key);
      }

      return root;
  }

  _getSuccessor(curr) {
      curr = curr.right;
      while (curr !== null && curr.left !== null) {
          curr = curr.left;
      }
      return curr;
  }

  // In-order traversal (left, root, right)
  inorder() {
      const result = [];
      this._inorderTraversal(this.root, result);
      return result;
  }

  _inorderTraversal(root, result) {
      if (root !== null) {
          this._inorderTraversal(root.left, result);
          result.push(root.key);
          this._inorderTraversal(root.right, result);
      }
  }

  // Pre-order traversal (root, left, right)
  preorder() {
      const result = [];
      this._preorderTraversal(this.root, result);
      return result;
  }

  _preorderTraversal(root, result) {
      if (root !== null) {
          result.push(root.key);
          this._preorderTraversal(root.left, result);
          this._preorderTraversal(root.right, result);
      }
  }

  // Post-order traversal (left, right, root)
  postorder() {
      const result = [];
      this._postorderTraversal(this.root, result);
      return result;
  }

  _postorderTraversal(root, result) {
      if (root !== null) {
          this._postorderTraversal(root.left, result);
          this._postorderTraversal(root.right, result);
          result.push(root.key);
      }
  }
}

// Create a new BST
const tree = new BinarySearchTree();

// Insert a node
function insertNode() {
  const value = document.getElementById('nodeValue').value;
  if (value) {
      tree.insert(parseInt(value));
      document.getElementById('nodeValue').value = '';
      displayTree();
  }
}

// Delete a node
function deleteNode() {
  const value = document.getElementById('nodeValue').value;
  if (value) {
      tree.delete(parseInt(value));
      document.getElementById('nodeValue').value = '';
      displayTree();
  }
}

// Display the tree structure (currently placeholder, expand with SVG/graphics later)
function displayTree() {
  const treeContainer = document.getElementById('treeContainer');
  treeContainer.innerHTML = 'Tree updated!';
}

// Display traversal results
function displayInOrder() {
  const result = tree.inorder().join(', ');
  document.getElementById('result').innerHTML = 'In-order: ' + result;
}

function displayPreOrder() {
  const result = tree.preorder().join(', ');
  document.getElementById('result').innerHTML = 'Pre-order: ' + result;
}

function displayPostOrder() {
  const result = tree.postorder().join(', ');
  document.getElementById('result').innerHTML = 'Post-order: ' + result;
}



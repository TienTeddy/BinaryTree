using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActionsTree
{
    public class Node
    {
        public int key, height;
        public Node left, right;

        public Node(int d)
        {
            key = d;
            height = 1;
        }
    }


    public class AVLTree
    {

        Node root;

        // A utility function to get 
        // the height of the tree  
        int height(Node N)
        {
            if (N == null)
                return 0;

            return N.height;
        }

        // A utility function to get 
        // maximum of two integers  
        int max(int a, int b)
        {
            return (a > b) ? a : b;
        }

        // A utility function to right  
        // rotate subtree rooted with y  
        // See the diagram given above.  
        Node rightRotate(Node y)
        {
            Node x = y.left;
            Node T2 = x.right;

            // Perform rotation  
            x.right = y;
            y.left = T2;

            // Update heights  
            y.height = max(height(y.left),
                        height(y.right)) + 1;
            x.height = max(height(x.left),
                        height(x.right)) + 1;

            // Return new root  
            return x;
        }

        // A utility function to left 
        // rotate subtree rooted with x  
        // See the diagram given above.  
        Node leftRotate(Node x)
        {
            Node y = x.right;
            Node T2 = y.left;

            // Perform rotation  
            y.left = x;
            x.right = T2;

            // Update heights  
            x.height = max(height(x.left),
                        height(x.right)) + 1;
            y.height = max(height(y.left),
                        height(y.right)) + 1;

            // Return new root  
            return y;
        }

        // Get Balance factor of node N  
        public int getBalance(Node N)
        {
            if (N == null)
                return 0;

            return height(N.left) - height(N.right);
        }

        Node insert(Node node, int key)
        {

            /* 1. Perform the normal BST insertion */
            if (node == null)
                return (new Node(key));

            if (key < node.key)
                node.left = insert(node.left, key);
            else if (key >= node.key)
                node.right = insert(node.right, key);
            else // Duplicate keys not allowed  
                return node;

            /* 2. Update height of this ancestor node */
            node.height = 1 + max(height(node.left),
                                height(node.right));

            /* 3. Get the balance factor of this ancestor  
                node to check whether this node became  
                unbalanced */
            int balance = getBalance(node);

            // If this node becomes unbalanced, then there  
            // are 4 cases Left Left Case  
            if (balance > 1 && key < node.left.key)
                return rightRotate(node);

            // Right Right Case  
            if (balance < -1 && key > node.right.key)
                return leftRotate(node);

            // Left Right Case  
            if (balance > 1 && key > node.left.key)
            {
                node.left = leftRotate(node.left);
                return rightRotate(node);
            }

            // Right Left Case  
            if (balance < -1 && key < node.right.key)
            {
                node.right = rightRotate(node.right);
                return leftRotate(node);
            }

            /* return the (unchanged) node pointer */
            return node;
        }

        // A utility function to print preorder traversal  
        // of the tree.  
        // The function also prints height of every node 
        int j = 0;
        public int[] preOrder(Node node, int n)
        {
            int[] results = new int[n];
            if (node != null)
            {

                results[j] = node.key;
                /*j += 1;
                preOrder(node.left);
                preOrder(node.right);*/


                Node aL = node.left; //left or node
                Node aR = node.left.right; // right or node left

                while (aL != null)
                {
                    j += 1;
                    results[j] = aL.key;
                    aL = aL.left;

                }
                while (aR != null)
                {
                    j += 1;
                    results[j] = aR.key;
                    aR = aR.left;
                }

                //Node Right
                Node bR = node.right; //left or node
                Node bL = node.right.right; // right or node left
                Node bRR = node.right; //left or node
                //Node bRR = node.right.right;
                while (bR != null)
                {
                    j += 1;
                    results[j] = bR.key;
                    bR = bR.left;

                }
                while (bL != null)
                {
                    j += 1;
                    results[j] = bL.key;
                    bL = bL.left;
                }
            }
            return results;
        }

        int[] arr = new int[1000]; int i = 0;
        private void NLR(Node a)
        {
            if (a != null)
            {
                arr[i] = a.key;
                i += 1;
                NLR(a.left);
                NLR(a.right);
            }
        }
        public int[] show(int[] array, int n)
        {
            int[] result = new int[n];
            AVLTree tree = new AVLTree();
            for (int ik = 0; ik < array.Length; ik++)
            {
                tree.root = tree.insert(tree.root, array[ik]);
                //result[i] = tree.root.key;
            }
            NLR(tree.root);
            for (int ii = 0; ii < n; ii++)
            {
                int number = arr[ii];
                result[ii] = number;
            }
            //result = tree.preOrder(tree.root,array.Length);
            return result;
        }
    }
}

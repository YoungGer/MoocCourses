/**
 * Created by Guangyao on 2015/7/7.
 * using linked-list
 */
import java.util.Iterator;

public class Deque<Item> implements Iterable<Item> {
    //private class and instance
    private class Node
    {
        Item item;
        Node next;
        Node before;
    }
    private Node first;
    private Node last;
    private int N;

    //public function
    public Deque()                           // construct an empty deque
    {
        first = null;
        last = null;
        N = 0;
    }
    public boolean isEmpty()                 // is the deque empty?
    {
        return (N==0);
    }
    public int size()                        // return the number of items on the deque
    {
        return N;
    }
    public void addFirst(Item item)          // add the item to the front
    {
        if(item==null) throw new java.lang.NullPointerException();

        Node old = first;
        first = new Node();
        first.item = item;
        first.next = old;
        first.before = null;
        if(isEmpty()) last=first;
        else {old.before = first;}
        N++;
    }
    public void addLast(Item item)           // add the item to the end
    {
        if(item==null) throw new java.lang.NullPointerException();

        Node old = last;
        last = new Node();
        last.item = item;
        last.next = null;
        last.before = old;
        if(isEmpty()) first=last;
        else
        {
            old.next = last;
        }
        N++;
    }
    public Item removeFirst()                // remove and return the item from the front
    {
        if(isEmpty()) throw new java.util.NoSuchElementException();
        Item r = first.item;
        first = first.next;
        N--;
        if(isEmpty()) last=null;
        else first.before = null;
        return r;
    }
    public Item removeLast()                 // remove and return the item from the end
    {
        if(isEmpty()) throw new java.util.NoSuchElementException();
        Item r = last.item;
        last = last.before;
        N--;
        if(isEmpty()) first=null;
        else { last.next = null;}
        return r;
    }

    public Iterator<Item> iterator()         // return an iterator over items in order from front to end
    {
        return new DequeIterator();
    }
    private class DequeIterator implements Iterator<Item>
    {
        private Node current = first;
        public boolean hasNext()
        {
            return current != null;
        }
        public void remove(){
            throw new UnsupportedOperationException();
        }
        public Item next()
        {
            if (current==null) throw new java.util.NoSuchElementException();
            Item item = current.item;
            current = current.next;
            //if (item==null) throw new java.util.NoSuchElementException();
            return item;
        }
    }

    //test function
//    public void show(Iterator<Item> a)
//    {
//        while (a.hasNext())
//        {
//            Item r = a.next();
//            StdOut.println(r);
//        }
//    }

    public static void main(String[] args)   // unit testing
    {
//        Deque<Integer> a = new Deque<Integer>();
////        a.addFirst(3);
////        a.addFirst(4);
////        a.addFirst(5);
////        a.addLast(3);
////        a.addLast(4);
//        a.addLast(null);
//        StdOut.println("remove "+a.removeFirst());
//        a.show(a.iterator());
//        StdOut.println("size "+a.N);
    }
}

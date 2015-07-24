/**
 * Created by Guangyao on 2015/7/7.
 */
import java.util.Iterator;

public class RandomizedQueue<Item> implements Iterable<Item> {
    //private class and instance
    private Item[] a = (Item[]) new Object[1];
    private int N = 0;
    private void resize(int max)
    {
        Item[] temp = (Item[]) new Object[max];
        for (int i = 0; i < N; i++) {
            temp[i] = a[i];
        }
        a = temp;
    }

    //public function
    public RandomizedQueue()                 // construct an empty randomized queue
    {

    }

    public boolean isEmpty()                 // is the queue empty?
    {
        return  N<=0;
    }
    public int size()                        // return the number of items on the queue
    {
        return N;
    }

    public void enqueue(Item item)           // add the item
    {
        if (item==null) throw new java.lang.NullPointerException();
        if (N==a.length) resize(2*a.length);
        a[N++] = item;
    }

    //shuffle sort
    public Item dequeue()                    // remove and return a random item
    {
//        if(isEmpty()) throw new java.util.NoSuchElementException();
//        //key shuffle sort
//        Item[] b =  (Item[]) new Object[N];
//        for (int i = 0; i < N; i++) {
//            b[i] = a[i];
//        }
//        StdRandom.shuffle(b);
//        for (int i = 0; i < N; i++) {
//            a[i] = b[i];
//        }
//        //key shuffle sort
//        Item item = a[--N];
//        a[N] =null;
//        if(N>0 && N== a.length/4) resize(a.length/2);
//        return item;

        //another!!!
        if(isEmpty()) throw new java.util.NoSuchElementException();
        int removeIndex = StdRandom.uniform(N);
        Item returnItem = a[removeIndex];
        a[removeIndex] = a[--N];
        a[N] =null;
        if(N>0 && N== a.length/4) resize(a.length/2);
        return returnItem;
    }

    //shuffle sort
    public Item sample()                     // return (but do not remove) a random item
    {
//        int i = N;
//        if(isEmpty()) throw new java.util.NoSuchElementException();
//        //key shuffle sort
//        Item[] b =  (Item[]) new Object[N];
//        for (int ii = 0; ii < N; ii++) {
//            b[ii] = a[ii];
//        }
//        StdRandom.shuffle(b);
//        for (int ii = 0; ii < N; ii++) {
//            a[ii] = b[ii];
//        }
//        //key shuffle sort
//        Item item = a[--i];
//        return item;


        if(isEmpty()) throw new java.util.NoSuchElementException();
        return a[StdRandom.uniform(N)];
    }

    public Iterator<Item> iterator()         // return an independent iterator over items in random order
    {
        return new RandomizedQueueIterator();
    }
    private class RandomizedQueueIterator implements Iterator<Item>
    {
        private int i = N;

        public boolean hasNext()
        {
            return i>0;
        }
        public void remove(){
            throw new UnsupportedOperationException();
        }
        public Item next()
        {
            int shuffle_i = StdRandom.uniform(i);
            if(i==0) throw new  java.util.NoSuchElementException();
            //return a[--i];
            Item r=a[shuffle_i];
            a[shuffle_i] = a[--i];
            return r;
        }
    }

//    private void show(Iterator<Item> a)
//    {
//        while (a.hasNext())
//        {
//            Item r = a.next();
//            StdOut.println(r);
//        }
//    }

    public static void main(String[] args)   // unit testing
    {
//        RandomizedQueue<Integer> a = new RandomizedQueue<Integer>();
//        for (int i = 0; i < 10; i++) {
//            a.enqueue(i);
//        }
//        a.show(a.iterator());
//        StdOut.println("size "+a.N);
////        StdOut.println("deque"+a.dequeue());
//        StdOut.println("sample"+a.sample());
//        StdOut.println("over1");
//        a.show(a.iterator());
//        StdOut.println("size "+a.N);
//        StdOut.println("over2");
////        StdOut.println("remove "+a.dequeue());
////        for (int i = 0; i < a.N; i++) {
////            StdOut.println(a.a[i]);
////        }
////        StdOut.println("size "+a.N);
    }
}
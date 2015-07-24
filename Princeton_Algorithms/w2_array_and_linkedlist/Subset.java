/**
 * Created by Guangyao on 2015/7/7.
 */
public class Subset {
    public static void main(String[] args)
    {
        int k = Integer.parseInt(args[0]);
        RandomizedQueue<String> a = new RandomizedQueue<String>();

        while (!StdIn.isEmpty())
        {
            String i = StdIn.readString();
            //StdOut.println(i);
            a.enqueue(i);
        }
//        StdOut.print("input over");

        for (int i = 0; i < k; i++) {
            StdOut.println(a.dequeue());
        }

    }
}
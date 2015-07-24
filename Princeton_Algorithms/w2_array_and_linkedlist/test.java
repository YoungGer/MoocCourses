/**
 * Created by Guangyao on 2015/7/7.
 */
public class test {
    public static void main(String[] args) {
        StdOut.print("standard output");
        StdOut.printf(args[0]);
        for (int i = 0; i < 15; i++) {
            StdOut.println(StdRandom.uniform(5));
        }
        int[] a = new int[5];
        for (int i = 0; i < 5; i++) {
            a[i]=i;
        }

        StdOut.println("first");
        for(int i:a)
            StdOut.println(i);

        StdRandom.shuffle(a);

        StdOut.println("second");
        for(int i:a)
            StdOut.println(i);

    }
}

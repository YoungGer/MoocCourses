import java.util.NavigableMap;

/**
 * Created by Guangyao on 2015/7/3.
 */
public class PercolationStats {

    private int[] xt;
    private int n ;
    private int t ;
    public PercolationStats(int N, int T)     // perform T independent experiments on an N-by-N grid
    {
        if(N<=0 || T<=0 ) {
            throw new java.lang.IllegalArgumentException("error" + N+T);
        }

        xt = new int[T];
        n = N;
        t = T;
        int xti = 0;

        while(T>0){
            int counts = 0;
            Percolation p = new Percolation(N);

            // each percolate case
            while(! p.percolates())
            {
                int i = StdRandom.uniform(N)+1;
                int j = StdRandom.uniform(N)+1;
                if (! p.isOpen(i,j))
                {
                    p.open(i,j);
                    counts = counts +1;
                }
            }

            xt[xti] = counts;
            xti = xti+1;
            T = T -1;
        }

    }

    public double mean()                      // sample mean of percolation threshold
    {
        double sumi = 0;
        for (int i = 0; i < t; i++) {
            sumi = sumi + (double)xt[i]/(n*n);
        }
        return (double)sumi/t;
    }
    public double stddev()                    // sample standard deviation of percolation threshold
    {
        double sumi = 0;
        for (int i = 0; i < t; i++) {
            sumi += Math.pow((double)xt[i]/(n*n)-mean(),2) ;
        }
        return Math.sqrt(sumi/(t-1));
    }
    public double confidenceLo()              // low  endpoint of 95% confidence interval
    {
        return mean()-1.96*stddev()/Math.sqrt(t);
    }
    public double confidenceHi()              // high endpoint of 95% confidence interval
    {
        return mean()+1.96*stddev()/Math.sqrt(t);
    }

    public static void main(String[] args)    // test client (described below)
    {
        //int n = Integer.parseInt(args[0]);
        //int t = Integer.parseInt(args[1]);

        int n = 200;
        int t = 100;

        Stopwatch timer = new Stopwatch();
        PercolationStats ps = new PercolationStats(n, t);
        double time = timer.elapsedTime();
        System.out.println("time                    = " + time);
        System.out.println("mean                    = " + ps.mean());
        System.out.println("stddev                  = " + ps.stddev());
        System.out.println("95% confidence interval = " + ps.confidenceLo() + ", " + ps.confidenceHi());
    }
}

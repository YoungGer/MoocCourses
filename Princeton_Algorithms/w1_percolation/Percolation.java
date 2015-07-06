/**
 * Created by Guangyao on 2015/7/3.
 */
public class Percolation {

    /**
     * private variable and function
     */
    //private int[][] state;
    private int[] s;
    private int len;
    private WeightedQuickUnionUF uf;
    private WeightedQuickUnionUF uf1;

    private void vali(int p) {
        if (p < 1 || p > len) {
            throw new IndexOutOfBoundsException("index " + p + " is not between 1 and " + len*len);
        }
    }

    private int id(int i,int j){
        return (i-1)*len+j-1;
    }

    /**
     * main function part
     */

    public Percolation(int N)               // create N-by-N grid, with all sites blocked
    {
        if (N<=0)
        {
            throw new IllegalArgumentException("index " + N + " is not greater than 1 ");
        }
        //state = new int[N][N];
        s = new int[N*N];
        len = N;
//        for (int i = 0; i < N; i++) {
//            for (int j = 0; j < N; j++) {
//                state[i][j] = 1;
//            }
//        }
        for (int i = 0; i < len*len; i++) {
            s[i] = 1;
        }
        uf = new WeightedQuickUnionUF(len*len+2);
        uf1 = new WeightedQuickUnionUF(len*len+1);
        // top and bottom element connection
    }

    public void open(int i, int j)          // open site (row i, column j) if it is not open already
    {
        vali(i);
        vali(j);
        int n = id(i,j);
        s[n] = 0;
        //id(i,j)=(i-1)*len+j, neighbor num is [id-1,id+1,id-len,id+len]
        //deal with n=1 and n=2
        if (len==1) {
            uf.union(n,len);uf1.union(n,len);
            uf.union(n,len+1);
        }
        else {
            //special cases
            if (i == 1) {
                {uf.union(n, len * len);uf1.union(n, len * len);}

                if (j == 1) {
                    if (s[n + 1] == 0) {uf.union(n, n + 1);uf1.union(n, n + 1);}
                    if (s[n + len] == 0) {uf.union(n, n + len);uf1.union(n, n + len);}
                } else if (j == len) {
                    if (s[n - 1] == 0) {uf.union(n, n - 1);uf1.union(n, n - 1);}
                    if (s[n + len] == 0) {uf.union(n, n + len);uf1.union(n, n + len);}
                } else {
                    if (s[n - 1] == 0)  {uf.union(n, n - 1);uf1.union(n, n - 1);}
                    if (s[n + 1] == 0) {uf.union(n, n + 1);uf1.union(n, n + 1);}
                    if (s[n + len] == 0)  {uf.union(n, n + len);uf1.union(n, n + len);}
                }
            }
            if (i == len) {

                {uf.union(n, len * len + 1);}

                if (j == 1) {
                    if (s[n + 1] == 0) {uf.union(n, n + 1);uf1.union(n, n + 1);}
                    if (s[n - len] == 0) {uf.union(n, n - len);uf1.union(n, n - len);}
                } else if (j == len) {
                    if (s[n - 1] == 0) {uf.union(n, n - 1);uf1.union(n, n - 1);}
                    if (s[n - len] == 0) {uf.union(n, n - len);uf1.union(n, n - len);}
                } else {
                    if (s[n - 1] == 0) {uf.union(n, n - 1);uf1.union(n, n - 1);}
                    if (s[n + 1] == 0) {uf.union(n, n + 1);uf1.union(n, n + 1);}
                    if (s[n - len] == 0) {uf.union(n, n - len);uf1.union(n, n - len);}
                }
            }
            if (i != 1 & i != len & j == 1) {
                if (s[n - len] == 0) {uf.union(n, n - len);uf1.union(n, n - len);}
                if (s[n + len] == 0) {uf.union(n, n + len);uf1.union(n, n + len);}
                if (s[n + 1] == 0) {uf.union(n, n + 1);uf1.union(n, n + 1);}
            }
            if (i != 1 & i != len & j == len) {
                if (s[n - len] == 0) {uf.union(n, n - len);uf1.union(n, n - len);}
                if (s[n + len] == 0) {uf.union(n, n + len);uf1.union(n, n + len);}
                if (s[n - 1] == 0) {uf.union(n, n - 1);uf1.union(n, n - 1);}
            }
            //general cases
            if (i != 1 & i != len & j != 1 & j != len) {
                if (s[n - 1] == 0) {uf.union(n, n - 1);uf1.union(n, n - 1);}
                if (s[n + 1] == 0) {uf.union(n, n + 1);uf1.union(n, n + 1);}
                if (s[n - len] == 0) {uf.union(n, n - len);uf1.union(n, n - len);}
                if (s[n + len] == 0) {uf.union(n, n + len);uf1.union(n, n + len);}
            }
        }
    }

    public boolean isOpen(int i, int j)     // is site (row i, column j) open?
    {
        vali(i);
        vali(j);
        return s[id(i,j)]==0;
    }

    public boolean isFull(int i, int j)     // is site (row i, column j) full?
    {
        vali(i);
        vali(j);
        return uf1.connected(id(i,j),len*len);
    }
    public boolean percolates()             // does the system percolate?
    {
        //virtual node [len,len+1]
        //virtual node connection
        return uf.connected(len*len,len*len+1);
    }

    public static void main(String[] args)   // test client (optional)
    {
//        Percolation p = new Percolation(4);
//        p.open(1,1);
//        p.open(2,2);
//        p.open(3,4);
//        p.open(3,2);
//        p.open(4,2);
//        p.open(1,2);
//        System.out.println(p.percolates());
    }
}

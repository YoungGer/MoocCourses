f1 = 'e = sqrt( 8/n*log(4/0.05*(2*n)^50))'
f2 = 'e = sqrt(2/n*log(2*n*(n)^50)) + sqrt(2/n*log(1/0.05)) +1/n'
f3 = ' e = sqrt(1/n*(2*e+log(6/0.05*(2*n)^50)))'
f4 = 'e = sqrt(1/2/n* ( 4*e*(1+e)+log(4/0.05*(n^2)^50)               ) )'
f5 = 'e = sqrt(16/n*log(2/sqrt(0.05)*n^50))'

y = 5

s1 = solve(f1,'e');
a1 = subs(s1,'[n]',[y])
s2 = solve(f2,'e');
a2 = subs(s2,'[n]',[y])
s3 = solve(f3,'e');
a3 = subs(s3,'[n]',[y])
s4 = solve(f4,'e');
a4 = subs(s4,'[n]',[y])
s5 = solve(f5,'e');
a5 = subs(s5,'[n]',[y])

0.63217
0.3313
0.2237
-inf inf
0.8604259

13.8281614849
7.0488
5.1014  -4.7014
-4.9265 5.5931
16.26411